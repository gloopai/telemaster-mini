import { PostAsync } from './request'

export interface LoginResult {
  token?: string
}

// 发送 post 请求进行 Telegram 登录
export const telgramLogin = async (initData?: string): Promise<LoginResult> => {
  return await PostAsync<LoginResult>({
    path: 'user',
    command: 'user.login.telegram',
    params: {
      init_data: initData,
    },
  })
}
