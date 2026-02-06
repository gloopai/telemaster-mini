export interface PostParams {
  path: string
  command: string
  params: Record<string, any>
}

// 发送 post 请求
const PostAsync = async <T, R = any>(_opt: PostParams): Promise<R> => {
  const url = `${import.meta.env.VITE_API_URL}/${_opt.path}`
  const postData = {
    command: _opt.command,
    data: { ..._opt.params },
  }
  const _headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  }
  try {
    const response = await await fetch(url, {
      method: 'POST',
      headers: _headers,
      body: JSON.stringify(postData),
    })
    if (!response.ok) {
      return undefined as unknown as R
    }

    const { code, message, data } = await response.json()
    if (code === 50000) {
      return undefined as unknown as R
    }

    return data
  } catch (error: any) {
    return Promise.reject(error)
  }
}

export { PostAsync }
