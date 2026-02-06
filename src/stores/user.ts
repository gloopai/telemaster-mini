import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { telgramLogin } from '@/api/user'

const _initData = ref<string>(
  'user=%7B%22id%22%3A6961976354%2C%22first_name%22%3A%22%E5%9F%83%E6%96%87-Evan%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22imevan222%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fcmbh7a4B789OF_Og0XvPqqLg5tuC1xwsbKjFZCsnQkXk4miRAr6GnhuvRMrasrAk.svg%22%7D&chat_instance=-4399429049724888205&chat_type=private&auth_date=1770042144&signature=EfUYDXOGpdcU6VB-auaI85OC6Lu1Ew8f9G4m68Vo9FJFwdMn8h3DS8HjyZncjmYE13jgVnxM9nwkLJbxJWQ4Bg&hash=19f0c8110cf1eb00bceaaa1b98411fd593810f50b67639e390ed528003a331d8',
)

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(null)
  const isLoggedIn = ref<boolean>(false)
  const setMiniLogin = async (initData: string) => {
    const res = await telgramLogin(_initData.value)
    if (res && res.token) {
      token.value = res.token || null
      isLoggedIn.value = true
    }
  }

  return {
    setMiniLogin,
    isLoggedIn,
    token,
  }
})
