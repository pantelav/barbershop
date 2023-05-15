import defu from 'defu'
import type { UseFetchOptions } from 'nuxt/app'
import { endpoints } from '~/constants/endpoints'

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
      Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`
    },
    credentials: 'include',
    onResponse (ctx) {
      const bearer = ctx.response._data?.bearer || null
      const data = ctx.response._data?.data || null
      if (bearer) localStorage.setItem('access_token', bearer)
      if (data) ctx.response._data = data
    },
    onResponseError(ctx) {
      if (ctx.response.status === 403) navigateTo('/admin/login')
    },
  }
  const params = defu(defaults, options)
  return useFetch(path, params)
}


