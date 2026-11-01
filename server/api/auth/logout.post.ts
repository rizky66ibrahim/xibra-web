export default defineEventHandler(async (event) => {
  if (getToken(event)) {
    await apiRequest(event, '/auth/logout', { method: 'POST' }).catch(() => {})
  }

  deleteCookie(event, TOKEN_COOKIE, { path: '/' })
  return { data: null }
})
