export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      return navigateTo('/admin/login')
    }
  }
})