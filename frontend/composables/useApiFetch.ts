import defu from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

const dev = import.meta.env.DEV
// @ts-ignore
export async function useApiFetch<T> (path: string, options?: UseFetchOptions<T>) {
  const url = dev ? `http://127.0.0.1:8000/api` : '/api'
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


