# Sprawozdanie z projektu DevOps

## Strona tytułowa

**Projekt:** Środowisko DevOps z Docker i GitHub Actions  
**Imię i nazwisko:** Jakub Mączka
**Numer indeksu:** 52737

---

## Cel projektu

Celem projektu było stworzenie i skonfigurowanie środowiska DevOps integrującego
GitHub, Docker, Docker Compose oraz GitHub Actions, umożliwiającego automatyczne
budowanie, testowanie oraz wdrażanie aplikacji kontenerowej.

---

## Opis aplikacji

Projekt został zrealizowany w formie monorepo i składa się z następujących
komponentów:

- aplikacji backendowej (API),
- aplikacji frontendowej,
- bazy danych PostgreSQL.

Każdy z komponentów uruchamiany jest jako osobny kontener Dockera, a komunikacja
pomiędzy nimi realizowana jest w ramach jednej sieci Docker Compose.

---

## Konteneryzacja aplikacji

Dla aplikacji frontendowej oraz backendowej przygotowano osobne pliki Dockerfile.
Zastosowano **multi-stage build**, który pozwala na oddzielenie etapu instalacji
zależności i budowania aplikacji od finalnego obrazu uruchomieniowego.

Do uruchamiania całego środowiska zastosowano **Docker Compose**, który:

- uruchamia wiele kontenerów,
- zarządza zależnościami pomiędzy nimi,
- zapewnia trwałość danych bazy poprzez wolumeny.

---

## Continuous Integration (CI)

W repozytorium skonfigurowano pipeline CI oparty o GitHub Actions, który uruchamia
się automatycznie dla pull requestów. Pipeline ten:

- instaluje zależności w monorepo z wykorzystaniem pnpm,
- uruchamia testy aplikacji frontendowej i backendowej,
- weryfikuje poprawność kodu przed jego scaleniem do głównego brancha.

Celem pipeline’u CI jest zapobieganie wprowadzaniu błędnego kodu do głównej gałęzi
repozytorium.

---

## Continuous Delivery (CD)

Dla głównego brancha (`main`) skonfigurowano osobny pipeline odpowiedzialny za:

- budowę obrazów Dockera aplikacji frontendowej i backendowej,
- publikację obrazów do rejestru **GitHub Container Registry (GHCR)**.

Proces budowania i publikowania obrazów został zaimplementowany jako
**reusable workflow**, co umożliwia ponowne wykorzystanie tej samej logiki w
różnych pipeline’ach oraz ogranicza duplikację konfiguracji.

---

## Deployment aplikacji

Aplikacja została wdrożona na zewnętrzne środowisko chmurowe – serwer VPS. Na serwerze zainstalowano Dockera oraz Docker Compose, a następnie
uruchomiono aplikację z wykorzystaniem obrazów pobieranych z GitHub Container Registry.

Link do aplikacji: https://monczuss.dev/devops/

Skonfigurowanie plików .env w Backend i FrontEnd
Wdrożenie aplikacji realizowane jest za pomocą poleceń:

```bash
docker compose pull
docker compose up -d
```
