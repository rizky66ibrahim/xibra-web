export default defineEventHandler(async (event) => {
  if (!getToken(event)) {
    throw createError({ statusCode: 401, message: 'Unauthenticated.' })
  }

  try {
    // Paginator Laravel: data.data berisi daftar task
    const res = await apiRequest<{ data: { data: unknown[] } }>(event, '/tasks?status=pending')
    return res.data.data
  } catch {
    throw createError({ statusCode: 502, message: 'Could not load tasks.' })
  }
})
