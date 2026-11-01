import type { H3Event } from 'h3'

// Nama cookie token. httpOnly, jadi tidak bisa dibaca JavaScript di browser.
export const TOKEN_COOKIE = 'xibra_token'

export function getToken(event: H3Event): string | undefined {
  return getCookie(event, TOKEN_COOKIE)
}

// Panggil Xibra API di /api/v1 dengan token dari cookie (hanya di server)
export async function apiRequest<T>(
  event: H3Event,
  path: string,
  options: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: unknown } = {}
): Promise<T> {
  const config = useRuntimeConfig(event)
  const token = getToken(event)

  return await $fetch<T>(`${config.xibraApiBase}/api/v1${path}`, {
    method: options.method || 'GET',
    body: options.body,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })
}
