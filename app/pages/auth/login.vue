<template>
  <div>
    <div class="mt-8 text-center">
      <h4 class="mb-2.5 text-xl font-semibold text-primary">Welcome Back</h4>
      <p class="text-base text-default-500">Sign in to continue to Xibra.</p>
    </div>

    <form class="text-left w-full mt-10" @submit.prevent="submit">
      <div class="mb-4">
        <label for="identifier" class="block font-medium text-default-900 text-sm mb-2">Username, email, or phone</label>
        <input id="identifier" v-model="identifier" type="text" class="form-input" autocomplete="username" required />
      </div>

      <div class="mb-4">
        <label for="password" class="block font-medium text-default-900 text-sm mb-2">Password</label>
        <input id="password" v-model="password" type="password" class="form-input" autocomplete="current-password" required />
      </div>

      <p v-if="error" class="mb-4 text-sm text-danger" role="alert">{{ error }}</p>

      <div class="mt-10 text-center">
        <button type="submit" class="btn bg-primary text-white w-full" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useHead({ title: 'Sign In | Xibra' })

const auth = useAuthStore()
const router = useRouter()

const identifier = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(identifier.value, password.value)
    await router.push('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || 'Sign in failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
