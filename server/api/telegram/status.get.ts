export default defineEventHandler(async (event) => {
  if (!getToken(event)) {
    throw createError({ statusCode: 401, message: 'Unauthenticated.' })
  }

  try {
    const res = await apiRequest<{ data: unknown }>(event, '/auth/telegram/status')
    return res.data
  } catch {
    throw createError({ statusCode: 502, message: 'Could not load Telegram status.' })
  }
})
