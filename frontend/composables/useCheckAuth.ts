import { endpoints } from '~/constants/endpoints'
import { UseFetchOptions } from 'nuxt/app'

export const useCheckAuth = async (status: number, options: UseFetchOptions<ResponseType>) => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken || status !== 401) return navigateTo('/admin/login')
  if (status === 401) {
    const data = await $fetch<{adminToken: string}>(options.baseURL + endpoints.admin.tokens, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      credentials: 'include'
    })
    localStorage.setItem('access_token', data.adminToken)
    // const {data: newToken, error: finalError} = await useApiFetch<{adminToken: string}>(endpoints.admin.tokens)
    // if (finalError.value || !newToken?.value?.adminToken) return false
    // localStorage.setItem('access_token', newToken.value.adminToken)
  }
  return true
}