function isTokenValid(token) {
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export function useAuth() {
  const token = localStorage.getItem('mykan_token')
  const isAuthenticated = isTokenValid(token)

  const signOut = () => {
    localStorage.removeItem('mykan_token')
  }

  return { isAuthenticated, signOut }
}
