export default defineEventHandler(async (event) => {
  if (!getToken(event)) {
    throw createError({ statusCode: 401, message: 'Unauthenticated.' })
  }

  try {
    const res = await apiRequest<{ data: unknown }>(event, '/auth/user')
    return { data: res.data }
  } catch {
    deleteCookie(event, TOKEN_COOKIE, { path: '/' })
    throw createError({ statusCode: 401, message: 'Unauthenticated.' })
  }
})
