import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAppointments, confirmAppointment, logout } from '../lib/api.js'

const POLL_INTERVAL_MS = 30_000

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/Mexico_City',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [confirming, setConfirming] = useState(null) // id en proceso

  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getAppointments()
      setAppointments(data)
      setFetchError('')
    } catch (err) {
      setFetchError('No se pudo cargar la lista de citas. Reintentando…')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
    const interval = setInterval(fetchAppointments, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [fetchAppointments])

  async function handleConfirm(id) {
    setConfirming(id)
    try {
      await confirmAppointment(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
    } catch {
      // Mensaje silencioso; el usuario puede reintentar
      alert('No se pudo confirmar la cita. Intenta de nuevo.')
    } finally {
      setConfirming(null)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-[#1a6b3a] text-white px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold leading-tight">Panel de Administración</h1>
          <p className="text-green-200 text-sm">MyKan Veterinaria</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Cerrar sesión del panel de administración"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-gray-800">Citas pendientes</h2>
          <button
            type="button"
            onClick={fetchAppointments}
            className="text-sm text-[#1a6b3a] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
            aria-label="Recargar lista de citas"
          >
            Actualizar
          </button>
        </div>

        {/* Error */}
        {fetchError && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6"
          >
            {fetchError}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            className="flex items-center justify-center py-20 gap-3 text-gray-500"
            aria-live="polite"
            aria-label="Cargando citas…"
          >
            <svg
              aria-hidden="true"
              className="animate-spin h-6 w-6 text-[#1a6b3a]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Cargando citas…</span>
          </div>
        )}

        {/* Sin citas */}
        {!loading && !fetchError && appointments.length === 0 && (
          <div
            className="text-center py-20 text-gray-400"
            aria-live="polite"
          >
            <p className="text-5xl mb-4" aria-hidden="true">📋</p>
            <p className="text-lg font-medium">No hay citas pendientes</p>
            <p className="text-sm mt-1">Las nuevas citas del bot aparecerán aquí automáticamente.</p>
          </div>
        )}

        {/* Tabla de citas — desktop */}
        {!loading && appointments.length > 0 && (
          <>
            {/* Vista escritorio */}
            <div className="hidden sm:block overflow-x-auto rounded-xl shadow-md">
              <table
                className="w-full bg-white text-sm"
                aria-label="Lista de citas pendientes"
              >
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Dueño', 'Mascota', 'Teléfono', 'Servicio', 'Fecha y Hora', 'Acción'].map(
                      (col) => (
                        <th
                          key={col}
                          scope="col"
                          className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3"
                        >
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-800 font-medium">{apt.owner_name}</td>
                      <td className="px-5 py-4 text-gray-600">{apt.pet_name}</td>
                      <td className="px-5 py-4 text-gray-600">
                        <a
                          href={`tel:${apt.phone}`}
                          className="hover:text-[#1a6b3a] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
                        >
                          {apt.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{apt.service}</td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {formatDate(apt.appointment_date)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleConfirm(apt.id)}
                          disabled={confirming === apt.id}
                          aria-label={`Confirmar cita de ${apt.owner_name}`}
                          className="inline-flex items-center gap-1.5 bg-[#1a6b3a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {confirming === apt.id ? (
                            <>
                              <svg
                                aria-hidden="true"
                                className="animate-spin h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              Confirmando…
                            </>
                          ) : (
                            <>✓ Confirmar</>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista móvil — tarjetas */}
            <ul className="sm:hidden flex flex-col gap-4" role="list">
              {appointments.map((apt) => (
                <li
                  key={apt.id}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-800">{apt.owner_name}</p>
                      <p className="text-sm text-gray-500">Mascota: {apt.pet_name}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                      Pendiente
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Servicio:</span> {apt.service}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Fecha:</span>{' '}
                    {formatDate(apt.appointment_date)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Tel:</span>{' '}
                    <a
                      href={`tel:${apt.phone}`}
                      className="text-[#1a6b3a] hover:underline"
                    >
                      {apt.phone}
                    </a>
                  </p>
                  <button
                    type="button"
                    onClick={() => handleConfirm(apt.id)}
                    disabled={confirming === apt.id}
                    aria-label={`Confirmar cita de ${apt.owner_name}`}
                    className="mt-2 w-full bg-[#1a6b3a] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-1 disabled:opacity-50"
                  >
                    {confirming === apt.id ? 'Confirmando…' : '✓ Confirmar cita'}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="text-xs text-gray-400 mt-8 text-center">
          La lista se actualiza automáticamente cada 30 segundos.
        </p>
      </main>
    </div>
  )
}
