<template>
  <!-- TODO Логин -->
  <div class="page__login">
    <form @submit.prevent="login" class="login__card w-[300px] flex flex-col gap-5 px-4">
      <NuxtImg src="/img/logo-long.png" />
      <InputText class="w-full p-inputtext-lg" placeholder="Логин" v-model="form.login" />
      <InputText class="w-full p-inputtext-lg" placeholder="Пароль" v-model="form.password" type="password" />
      <AppSpinner v-if="isLoading" />
      <button class="enroll w-full" type="submit" :disabled="!form.login || !form.password || isLoading"
        v-else>Войти</button>
    </form>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';
const isLoading = ref(false)
const form = reactive({
  login: '',
  password: ''
})

async function login () {
  try {
    isLoading.value = true
    const { data, error } = await useApiFetch<{ adminToken: string }>(endpoints.admin.login, {
      method: 'post',
      body: form
    })
    if (error.value) {
      return
      // return useNotify('error', 'Неправильный логин или пароль')
    }
    const cookie = document.cookie
    console.log(cookie);
    
    localStorage.setItem('acess_token', data.value?.adminToken as string)
    navigateTo('/admin/orders')
  } catch (error) {
    // useNotify('error', 'Ошибка сервера')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang='scss'>
.page__login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>