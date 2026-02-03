import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

// 协议处理钩子，可根据需要自定义
function handleProtocol<T>(response: AxiosResponse<T>): T {
  // 这里可以根据你的协议格式进行处理，比如：
  // if (response.data && response.data.code !== 0) {
  //   throw new Error(response.data.message || '未知错误');
  // }
  // return response.data.data;
  return response.data
}

export interface PostParams {
  path: string
  command: string
  params: Record<string, any>
  config?: AxiosRequestConfig
}

// 发送 post 请求，支持自定义 header
const PostAsync = async <T, R = any>(_opt: PostParams & { headers?: Record<string, string> }): Promise<R> => {
  const url = `${import.meta.env.VITE_API_URL}/${_opt.path}`
  const postData = {
    command: _opt.command,
    ..._opt.params,
  }
  // 合并 headers
  const config: AxiosRequestConfig = {
    ..._opt.config,
    headers: {
      ...(typeof _opt.config?.headers === 'object' ? _opt.config?.headers : {}),
      ...(_opt.headers || {}),
    },
  }
  try {
    const response = await axios.post<R>(url, postData, config)
    return handleProtocol(response)
  } catch (error: any) {
    // 这里可以统一处理错误，比如弹窗、日志等
    // if (error.response) { ... }
    return Promise.reject(error)
  }
}

export { PostAsync }
