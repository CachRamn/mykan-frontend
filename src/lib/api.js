const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const TOKEN_KEY = 'mykan_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Credenciales inválidas')
  }

  const data = await res.json()
  localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export async function getAppointments(from, to) {
  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  const query = params.toString()
  const url = `${BASE_URL}/api/appointments${query ? `?${query}` : ''}`

  const res = await fetch(url, {
    headers: authHeaders(),
  })

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem(TOKEN_KEY)
    }
    throw new Error(`Error ${res.status}: no se pudieron cargar las citas`)
  }

  return res.json()
}

// Marca una cita como atendida (se conserva en el historial).
export async function attendAppointment(id) {
  const res = await fetch(`${BASE_URL}/api/appointments/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo marcar la cita como atendida`)
  }

  return res.json()
}

// Elimina definitivamente una cita (para registros erróneos o spam).
export async function deleteAppointment(id) {
  const res = await fetch(`${BASE_URL}/api/appointments/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo eliminar la cita`)
  }

  return res.json()
}

export async function logout() {
  const token = getToken()
  if (token) {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: authHeaders(),
      })
    } catch {
      // Si la petición falla, igual limpiamos el token local
    }
  }
  localStorage.removeItem(TOKEN_KEY)
}
