export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.checked) {
    await auth.fetchMe()
  }

  if (!auth.user) {
    return navigateTo('/auth/login')
  }
})
