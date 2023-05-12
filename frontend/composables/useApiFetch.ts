import defu from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

const dev = import.meta.env.DEV
const ip = dev ? '127.0.0.1' : '80.78.245.244'
const port = dev ? '8000' : '80'
// @ts-ignore
export async function useApiFetch<T> (path: string, options?: UseFetchOptions<T>) {
  const url = `http://${ip}:${port}/api`
  await nextTick()
  const defaults: UseFetchOptions<T> = {
    baseURL: url,
    headers: {
      Authorization: localStorage.getItem('access_token') || ''
    },
    onResponseError (_ctx) {
    },
    credentials: 'include',
    onResponse (ctx) {
    },
  }
  const params = defu(defaults, options)
  return useFetch(path, params)
}


