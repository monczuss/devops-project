import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState('idle')

	const checkBackend = async () => {
		setStatus('loading')
		setMessage('')

		try {
			const response = await axios.get('/api/health')
			setMessage(response.data.message)
			setStatus('success')
		} catch (error) {
			setMessage(
				error.response?.data?.message ? `Backend error: ${error.response.data.message}` : 'Failed to connect to backend'
			)
			setStatus('error')
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
				<h1 className="text-2xl font-bold text-white mb-2">Fullstack Health Check</h1>
				<p className="text-gray-500 mb-6">Vite • React • Node.js • PostgreSQL</p>

				<button
					onClick={checkBackend}
					disabled={status === 'loading'}
					className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition">
					{status === 'loading' && (
						<span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
					)}
					{status === 'loading' ? 'Checking backend...' : 'Check connection'}
				</button>

				{message && (
					<div
						className={`mt-6 p-4 rounded-lg text-sm font-medium ${
							status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
						}`}>
						{message}
					</div>
				)}
			</div>
		</div>
	)
}

export default App
