export default defineEventHandler(async (event) => {
  if (!getToken(event)) {
    throw createError({ statusCode: 401, message: 'Unauthenticated.' })
  }

  try {
    // API mengembalikan { code, expires_at }. Kode hanya boleh dipakai sekali.
    const res = await apiRequest<{ data: { code: string; expires_at: string } }>(
      event,
      '/auth/telegram/pairing-code',
      { method: 'POST' }
    )
    return res.data
  } catch {
    throw createError({ statusCode: 502, message: 'Could not generate pairing code.' })
  }
})
