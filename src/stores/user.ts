import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { telgramLogin } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(null)
  const isLoggedIn = computed(() => !!token.value)
  const setMiniLogin = async (initData: string) => {
    const res = await telgramLogin(initData)
    if (res && res.token) {
      token.value = res.token || null
    }
  }

  return {
    setMiniLogin,
    isLoggedIn,
  }
})
