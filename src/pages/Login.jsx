import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api.js'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (error) setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username.trim() || !form.password) {
      setError('Por favor ingresa usuario y contraseña.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(form.username.trim(), form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <div className="text-center mb-8">
          <span className="text-5xl" aria-hidden="true">🐾</span>
          <h1 className="text-2xl font-bold text-[#1a6b3a] mt-2">MyKan</h1>
          <p className="text-gray-500 text-sm mt-1">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-md px-8 py-8 flex flex-col gap-5"
          aria-label="Formulario de inicio de sesión"
        >
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Iniciar sesión
          </h2>

          {/* Error global */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              aria-required="true"
              disabled={loading}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b3a] transition disabled:opacity-60"
              placeholder="Nombre de usuario"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              aria-required="true"
              disabled={loading}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b3a] transition disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1a6b3a] text-white font-semibold py-3 rounded-lg hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
