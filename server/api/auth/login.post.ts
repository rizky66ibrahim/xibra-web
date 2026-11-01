const TOKEN_MAX_AGE = 60 * 60 * 24 * 365 // sejalan dengan masa berlaku token 1 tahun di API

export default defineEventHandler(async (event) => {
  const body = await readBody<{ identifier?: string; password?: string }>(event)

  try {
    const res = await apiRequest<{ data: { user: unknown; token: string } }>(event, '/auth/login', {
      method: 'POST',
      body
    })

    setCookie(event, TOKEN_COOKIE, res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: TOKEN_MAX_AGE
    })

    // Token tidak pernah dikirim ke browser, hanya data user
    return { data: { user: res.data.user } }
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.status || 401,
      message: err?.data?.message || 'Sign in failed.'
    })
  }
})
