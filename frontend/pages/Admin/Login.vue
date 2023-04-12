<template>
  <!-- TODO Логин -->
  <div class="page__login">
    <form @submit.prevent class="login__card w-[300px] flex flex-col gap-5 px-4">
      <NuxtImg src="/img/logo-long.png" />
      <InputText class="w-full p-inputtext-lg" placeholder="Логин" v-model="form.login" />
      <InputText class="w-full p-inputtext-lg" placeholder="Пароль" v-model="form.password" type="password" />
      <button class="enroll w-full">Вход</button>
    </form>
  </div>
</template>

<script setup lang='ts'>
const form = reactive({
  login: '',
  password: ''
})
</script>

<style scoped lang='scss'>
.page__login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__card {}
</style>