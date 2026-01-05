import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		port: 3000,
		host: true,
		proxy: {
			// Forward /api requests to backend in dev
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: process.env.NODE_ENV !== 'production',
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './src/setupTests.js',
	},
})
