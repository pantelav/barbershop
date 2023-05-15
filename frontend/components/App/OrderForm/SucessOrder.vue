<template>
  <div class="success__container mt-10">
    <p class="title">Ждем Вас по адресу: <span class="subtitle">ул.Оптиков, д.45, к.1</span> </p>
    <p class="title">Дата: <span class="subtitle">{{ formatedDate }} {{ order.time }}</span> </p>
    <p class="title">Мастер: <span class="subtitle">{{ order.barber?.name }}</span></p>
  </div>
</template>

<script setup lang='ts'>
const order = useOrder()
const formatedDate = computed(() => {
  const date = new Date(order.value.date as Date)
  const d = date.getDate()
  const m = date.getMonth()
  const y = date.getFullYear()
  return `${d < 10 ? '0' + d : d}.${m + 1 < 10 ? '0' + (m + 1) : m + 1}.${y}`
})

</script>

<style scoped lang='scss'>
.success__container {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  // align-items: center;
}

.title {
  font-size: 24px;
  font-weight: normal;
  color: rgb(172, 172, 172);
}
.subtitle {
  color: #fff;
}

@media screen and (max-width: 640px) {
  .title, .subtitle {
    font-size: 1.5rem;
  }
}
</style>