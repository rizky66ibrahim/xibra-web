<template>
  <div class="container-fluid space-y-6">
    <h4 class="text-xl font-semibold">Dashboard</h4>

    <!-- Telegram -->
    <section class="card p-6">
      <h5 class="mb-1 font-semibold">Telegram</h5>

      <p v-if="statusPending" class="text-default-500">Loading...</p>
      <p v-else-if="statusError" class="text-danger">Could not load Telegram status.</p>
      <p v-else class="text-default-600">
        <template v-if="status?.is_linked">
          Linked as <span class="font-medium">{{ status.telegram_account?.telegram_username ?? 'unknown' }}</span>.
        </template>
        <template v-else>Not linked yet.</template>
      </p>

      <div class="mt-4 flex flex-wrap gap-3">
        <button class="btn bg-primary text-white" :disabled="busy" @click="generateCode">
          Generate pairing code
        </button>
        <button
          v-if="status?.is_linked"
          class="btn border border-default-200 text-default-800"
          :disabled="busy"
          @click="unlink"
        >
          Unlink
        </button>
      </div>

      <div v-if="pairing.code" class="mt-6 rounded-md border border-default-200 p-4">
        <p class="text-sm text-default-500">Send this code to the Xibra bot on Telegram:</p>
        <p class="mt-2 font-mono text-lg font-semibold tracking-wide">{{ pairing.code }}</p>
        <p class="mt-2 text-sm text-default-500">
          Expires at {{ formatTime(pairing.expires_at) }}. The code can only be used once.
        </p>
      </div>

      <p v-if="actionError" class="mt-4 text-sm text-danger" role="alert">{{ actionError }}</p>
    </section>

    <!-- Tasks -->
    <section class="card p-6">
      <h5 class="mb-4 font-semibold">Pending tasks</h5>

      <p v-if="tasksPending" class="text-default-500">Loading...</p>
      <p v-else-if="tasksError" class="text-danger">Could not load tasks.</p>
      <p v-else-if="!tasks?.length" class="text-default-500">No pending tasks.</p>

      <ul v-else class="divide-y divide-default-200">
        <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between py-3">
          <span class="font-medium">{{ task.title }}</span>
          <span class="text-sm text-default-500">{{ task.due_date ?? '-' }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'vertical',
  middleware: 'auth'
})

useHead({ title: 'Dashboard | Xibra' })

interface PairingCode {
  code: string
  expires_at: string
}

interface TelegramStatus {
  is_linked: boolean
  telegram_account?: { telegram_username?: string | null } | null
  pending_code?: { expires_at: string } | null
}

interface TaskItem {
  id: number
  title: string
  due_date: string | null
}

const {
  data: status,
  pending: statusPending,
  error: statusError,
  refresh: refreshStatus
} = await useFetch<TelegramStatus>('/api/telegram/status')

const {
  data: tasks,
  pending: tasksPending,
  error: tasksError
} = await useFetch<TaskItem[]>('/api/dashboard/tasks', { default: () => [] })

const pairing = reactive<{ code: string; expires_at: string }>({ code: '', expires_at: '' })
const busy = ref(false)
const actionError = ref('')

async function generateCode() {
  busy.value = true
  actionError.value = ''
  try {
    const res = await $fetch<PairingCode>('/api/telegram/pairing-code', { method: 'POST' })
    pairing.code = res.code
    pairing.expires_at = res.expires_at
    await refreshStatus()
  } catch {
    actionError.value = 'Could not generate a pairing code. Please try again.'
  } finally {
    busy.value = false
  }
}

async function unlink() {
  busy.value = true
  actionError.value = ''
  try {
    await $fetch('/api/telegram/unlink', { method: 'DELETE' })
    pairing.code = ''
    pairing.expires_at = ''
    await refreshStatus()
  } catch {
    actionError.value = 'Could not unlink Telegram. Please try again.'
  } finally {
    busy.value = false
  }
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}
</script>
