import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAppointments,
  attendAppointment,
  deleteAppointment,
  logout,
} from '../lib/api.js'

const POLL_INTERVAL_MS = 30_000
const CDMX_OFFSET_H = 6 // CDMX = UTC-6 (sin horario de verano desde 2023)
const DAY_MS = 24 * 60 * 60 * 1000
const SLOT_MS = 30 * 60 * 1000 // duración de una cita

// --- Helpers de zona horaria (todo en America/Mexico_City) -----------------

// Instante (Date UTC) del lunes 00:00 CDMX de la semana que contiene `base`.
function cdmxMonday(base) {
  const shifted = new Date(base.getTime() - CDMX_OFFSET_H * 60 * 60 * 1000)
  const dow = shifted.getUTCDay() // 0=Dom .. 6=Sáb, en horario CDMX
  const diff = dow === 0 ? 6 : dow - 1 // días transcurridos desde el lunes
  return new Date(
    Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate() - diff,
      CDMX_OFFSET_H, // medianoche CDMX = 06:00 UTC
    ),
  )
}

// Clave 'YYYY-MM-DD' del día CDMX al que pertenece una fecha.
function cdmxDayKey(date) {
  const s = new Date(date.getTime() - CDMX_OFFSET_H * 60 * 60 * 1000)
  return `${s.getUTCFullYear()}-${String(s.getUTCMonth() + 1).padStart(2, '0')}-${String(
    s.getUTCDate(),
  ).padStart(2, '0')}`
}

const timeFmt = new Intl.DateTimeFormat('es-MX', {
  timeZone: 'America/Mexico_City',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})
const colFmt = new Intl.DateTimeFormat('es-MX', {
  timeZone: 'America/Mexico_City',
  weekday: 'long',
  day: 'numeric',
})
const rangeFmt = new Intl.DateTimeFormat('es-MX', {
  timeZone: 'America/Mexico_City',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatTime(iso) {
  try {
    return timeFmt.format(new Date(iso))
  } catch {
    return ''
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [weekStart, setWeekStart] = useState(() => cdmxMonday(new Date()))
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [busyId, setBusyId] = useState(null) // id de cita en proceso
  const [now, setNow] = useState(0) // referencia temporal para marcar citas vencidas

  // Seis días de la semana visible: lunes a sábado (domingo cerrado).
  const days = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const instant = new Date(weekStart.getTime() + i * DAY_MS)
        return { instant, key: cdmxDayKey(instant) }
      }),
    [weekStart],
  )

  const todayKey = cdmxDayKey(new Date())

  // Citas agrupadas por día CDMX (el backend ya las devuelve ordenadas por hora).
  const byDay = useMemo(() => {
    const map = {}
    for (const apt of appointments) {
      const key = cdmxDayKey(new Date(apt.appointment_date))
      ;(map[key] ||= []).push(apt)
    }
    return map
  }, [appointments])

  const fetchWeek = useCallback(async () => {
    const from = weekStart.toISOString()
    const to = new Date(weekStart.getTime() + 6 * DAY_MS).toISOString() // [lun, dom)
    try {
      const data = await getAppointments(from, to)
      setAppointments(data)
      setNow(Date.now())
      setFetchError('')
    } catch {
      setFetchError('No se pudo cargar la lista de citas. Reintentando…')
    } finally {
      setLoading(false)
    }
  }, [weekStart])

  useEffect(() => {
    fetchWeek()
    const interval = setInterval(fetchWeek, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [fetchWeek])

  // Cambio de semana desde un evento (no desde el effect): mostramos el spinner
  // y limpiamos la lista anterior antes de recargar.
  function changeWeek(compute) {
    setLoading(true)
    setAppointments([])
    setWeekStart(compute)
  }

  async function handleAttend(id) {
    setBusyId(id)
    try {
      await attendAppointment(id)
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: 'attended', attended_at: new Date().toISOString() } : a,
        ),
      )
    } catch {
      alert('No se pudo marcar la cita como atendida. Intenta de nuevo.')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar esta cita de forma permanente? Esta acción no se puede deshacer.')) {
      return
    }
    setBusyId(id)
    try {
      await deleteAppointment(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
    } catch {
      alert('No se pudo eliminar la cita. Intenta de nuevo.')
    } finally {
      setBusyId(null)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  const weekRange = `${rangeFmt.format(days[0].instant)} – ${rangeFmt.format(days[5].instant)}`
  const totalWeek = appointments.length

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Navegación de semana */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Agenda semanal</h2>
            <p className="text-sm text-gray-500 capitalize">
              {weekRange}
              <span className="text-gray-400 normal-case"> · {totalWeek} cita(s)</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeWeek((w) => new Date(w.getTime() - 7 * DAY_MS))}
              className="text-sm font-medium bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a]"
              aria-label="Semana anterior"
            >
              ‹ Anterior
            </button>
            <button
              type="button"
              onClick={() => changeWeek(() => cdmxMonday(new Date()))}
              className="text-sm font-semibold bg-[#1a6b3a] text-white px-3 py-2 rounded-lg hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a]"
              aria-label="Ir a la semana actual"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => changeWeek((w) => new Date(w.getTime() + 7 * DAY_MS))}
              className="text-sm font-medium bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a]"
              aria-label="Semana siguiente"
            >
              Siguiente ›
            </button>
            <button
              type="button"
              onClick={fetchWeek}
              className="text-sm text-[#1a6b3a] font-medium hover:underline px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
              aria-label="Recargar lista de citas"
            >
              Actualizar
            </button>
          </div>
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
            <svg aria-hidden="true" className="animate-spin h-6 w-6 text-[#1a6b3a]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Cargando citas…</span>
          </div>
        )}

        {/* Grilla semanal — escritorio (Lun–Sáb) */}
        {!loading && (
          <>
            <div className="hidden md:grid md:grid-cols-6 gap-3">
              {days.map((day) => {
                const isToday = day.key === todayKey
                const list = byDay[day.key] || []
                return (
                  <section
                    key={day.key}
                    className={`rounded-xl border ${
                      isToday ? 'border-[#1a6b3a] ring-1 ring-[#1a6b3a]/30' : 'border-gray-200'
                    } bg-white flex flex-col min-h-[120px]`}
                    aria-label={colFmt.format(day.instant)}
                  >
                    <header
                      className={`px-3 py-2 rounded-t-xl border-b text-center ${
                        isToday ? 'bg-[#1a6b3a] text-white border-[#1a6b3a]' : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <p className="text-xs font-semibold capitalize leading-tight">
                        {colFmt.format(day.instant)}
                      </p>
                      <p className={`text-[11px] ${isToday ? 'text-green-100' : 'text-gray-400'}`}>
                        {list.length} cita(s)
                      </p>
                    </header>
                    <div className="p-2 flex flex-col gap-2">
                      {list.length === 0 ? (
                        <p className="text-[11px] text-gray-300 text-center py-3">Sin citas</p>
                      ) : (
                        list.map((apt) => (
                          <AppointmentCard
                            key={apt.id}
                            apt={apt}
                            now={now}
                            busy={busyId === apt.id}
                            onAttend={handleAttend}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </div>
                  </section>
                )
              })}
            </div>

            {/* Móvil — secciones apiladas por día */}
            <div className="md:hidden flex flex-col gap-4">
              {days.map((day) => {
                const isToday = day.key === todayKey
                const list = byDay[day.key] || []
                return (
                  <section key={day.key} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    <header
                      className={`px-4 py-2 flex items-center justify-between ${
                        isToday ? 'bg-[#1a6b3a] text-white' : 'bg-gray-50'
                      }`}
                    >
                      <span className="text-sm font-semibold capitalize">{colFmt.format(day.instant)}</span>
                      <span className={`text-xs ${isToday ? 'text-green-100' : 'text-gray-400'}`}>
                        {list.length} cita(s)
                      </span>
                    </header>
                    <div className="p-3 flex flex-col gap-2">
                      {list.length === 0 ? (
                        <p className="text-xs text-gray-300 text-center py-2">Sin citas</p>
                      ) : (
                        list.map((apt) => (
                          <AppointmentCard
                            key={apt.id}
                            apt={apt}
                            now={now}
                            busy={busyId === apt.id}
                            onAttend={handleAttend}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </div>
                  </section>
                )
              })}
            </div>
          </>
        )}

        <p className="text-xs text-gray-400 mt-8 text-center">
          La agenda se actualiza automáticamente cada 30 segundos. Horario CDMX.
        </p>
      </main>
    </div>
  )
}

// --- Tarjeta de cita --------------------------------------------------------

function AppointmentCard({ apt, now, busy, onAttend, onDelete }) {
  const attended = apt.status === 'attended'
  const past = Date.parse(apt.appointment_date) + SLOT_MS < now
  // Tono: atendida (verde), pendiente vencida (ámbar), pendiente futura (normal).
  const tone = attended
    ? 'bg-green-50 border-green-200'
    : past
      ? 'bg-amber-50 border-amber-200'
      : 'bg-white border-gray-200'

  return (
    <article className={`rounded-lg border ${tone} p-2.5 text-xs flex flex-col gap-1`}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-gray-800">{formatTime(apt.appointment_date)}</span>
        {attended ? (
          <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">
            ✓ Atendida
          </span>
        ) : past ? (
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">
            No atendida
          </span>
        ) : null}
      </div>

      <p className="font-medium text-gray-800 leading-tight">{apt.owner_name}</p>
      <p className="text-gray-500 leading-tight">
        🐾 {apt.pet_name} · {apt.service}
      </p>
      <a href={`tel:${apt.phone}`} className="text-[#1a6b3a] hover:underline leading-tight">
        📞 {apt.phone}
      </a>

      <div className="flex items-center gap-1.5 mt-1">
        {!attended && (
          <button
            type="button"
            onClick={() => onAttend(apt.id)}
            disabled={busy}
            aria-label={`Marcar como atendida la cita de ${apt.owner_name}`}
            className="flex-1 bg-[#1a6b3a] text-white text-[11px] font-semibold px-2 py-1 rounded-md hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? '…' : '✓ Atender'}
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(apt.id)}
          disabled={busy}
          aria-label={`Eliminar la cita de ${apt.owner_name}`}
          className="text-[11px] font-medium text-red-600 px-2 py-1 rounded-md hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}
