import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

// Telegram 脚本地址
const TELEGRAM_SCRIPT_SRC = 'https://telegram.org/js/telegram-web-app.js'

export const useTelegramStore = defineStore('telegram', () => {
  // 是否已加载脚本
  const isScriptLoaded = ref(false)
  // 脚本加载错误信息
  const scriptError = ref<string | null>(null)
  const initData = ref<string>('')

  /**
   * 注册 Telegram Web App 脚本
   * 只会注册一次，重复调用不会重复插入
   */
  async function registerTelegramScript(): Promise<void> {
    if (isScriptLoaded.value) return
    // 检查是否已存在该脚本
    if (document.querySelector(`script[src="${TELEGRAM_SCRIPT_SRC}"]`)) {
      isScriptLoaded.value = true
      return
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = TELEGRAM_SCRIPT_SRC
      script.async = true
      script.onload = () => {
        isScriptLoaded.value = true
        scriptError.value = null
        initData.value = (window as any).Telegram.WebApp.initData || ''
        const userStore = useUserStore()
        userStore.setMiniLogin(initData.value)
        resolve()
      }
      script.onerror = () => {
        scriptError.value = 'Telegram 脚本加载失败'
        reject(new Error('Telegram 脚本加载失败'))
      }
      document.head.appendChild(script)
    })
  }

  return {
    isScriptLoaded,
    scriptError,
    initData,
    registerTelegramScript,
  }
})
