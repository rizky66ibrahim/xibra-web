export default defineEventHandler(async (event) => {
  if (!getToken(event)) {
    throw createError({ statusCode: 401, message: 'Unauthenticated.' })
  }

  try {
    await apiRequest(event, '/auth/telegram/unlink', { method: 'DELETE' })
    return { data: null }
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 502,
      message: err?.data?.message || 'Could not unlink Telegram.'
    })
  }
})
