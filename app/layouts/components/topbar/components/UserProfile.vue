<template>
  <div class="topbar-item hs-dropdown relative inline-flex">
    <button class="cursor-pointer bg-pink-100 rounded-full" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
      <img :src="avatar1" alt="user-image" class="hs-dropdown-toggle rounded-full size-9.5" />
    </button>
    <div class="hs-dropdown-menu min-w-48" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-with-icons">
      <div class="p-2">
        <h6 class="mb-2 text-default-500">Welcome</h6>
        <div class="flex gap-3">
          <div>
            <h6 class="mb-1 text-sm font-semibold text-default-800">{{ auth.user?.name ?? '-' }}</h6>
            <p class="text-default-500">{{ auth.user?.email ?? '' }}</p>
          </div>
        </div>
      </div>
      <div class="border-t border-t-default-200 -mx-2 my-2"></div>
      <div class="flex flex-col gap-y-1">
        <a class="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded" href="/dashboard">
          <Icon icon="lucide:layout-dashboard" class="size-4"></Icon>
          Dashboard
        </a>
        <div class="border-t border-default-200 -mx-2 my-1"></div>
        <a class="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded" href="#" @click.prevent="handleLogout">
          <Icon icon="lucide:log-out" class="size-4"></Icon>
          Sign Out
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import avatar1 from '~/assets/images/user/avatar-1.png'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  await router.push('/auth/login')
}
</script>
