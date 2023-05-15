<template>
  <form class="info__container">
    <span class="p-float-label">
      <InputText id="name" v-model="order.contacts.name" type="text" class="w-full p-inputtext-lg" />
      <label for="name">Ваше имя *</label>
    </span>
    <span class="p-float-label">
       <InputText id="phone" v-model="order.contacts.phone" type="number" class="w-full p-inputtext-lg" :minlength="9"/>
      <label for="phone">Номер телефона *</label>
    </span>
    <span class="p-float-label">
      <InputText id="email" v-model="order.contacts.email" type="email" class="w-full p-inputtext-lg" />
      <label for="email">Email</label>
    </span>
    <span class="p-float-label">
      <InputText id="comment" v-model="order.contacts.comment" type="text" class="w-full p-inputtext-lg" />
      <label for="comment">Комментарий к заказу</label>
    </span>
  </form>
</template>

<script setup lang='ts'>
const order = useOrder()
</script>

<style scoped lang="scss">
.info__container {
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    width: 70%;
    margin-bottom: 30px;

    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
}
</style>