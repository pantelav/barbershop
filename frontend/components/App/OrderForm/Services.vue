<template>
  <div class="services__container">
    <div class="category" v-for="item in services" :key="item.category">
      <p class="category__title">{{ item.category }}</p>
      <div class="category__service" :class="{ 'service-selected': selectedServices.includes(service.title) }"
        v-for="service in item.services" :key="service.title" @click="selectService(service.title)">
        <p class="service__title">{{ service.title }}</p>
        <p class="service__price">{{ service.price }} р</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const services = ref([
  {
    category: "Стрижка",
    services: [
      {
        title: "Стрижка под ноль",
        price: "500"
      },
      {
        title: "Стрижка под горшок",
        price: "1000"
      },
    ]
  },
  {
    category: "Бритье",
    services: [
      {
        title: "Бритье усов",
        price: "500"
      },
      {
        title: "Бритье бороды",
        price: "1000"
      },
    ]
  },
  {
    category: "Стайлинг",
    services: [
      {
        title: "Укладка",
        price: "500"
      },
      {
        title: "Мытье головы",
        price: "1000"
      },
    ]
  },
])
const selectedServices = useSelectService()

function selectService (data: string) {
  if (selectedServices.value.includes(data)) {
    const index = selectedServices.value.indexOf(data)
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push(data)
  }
} 
</script>

<style scoped lang="scss">
.category {
  margin-top: 24px;
}

.category__title {
  font-size: 24px;
  padding-bottom: 10px;
  color: $orange;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }

  @media screen and (max-width: 350px) {
    text-align: center;

  }
}

.category__service {
  padding-left: 30px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  transition: background-color .2s;

  @media screen and (max-width: 500px) {
    font-size: 16px;
    padding: 10px 10px 10px 30px;
  }

  @media screen and (max-width: 400px) {
    font-size: 16px;
    padding: 10px 10px 10px 10px;
  }

  @media screen and (max-width: 350px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.service-selected {
  background-color: $orange;
}

.service__title {
  padding-right: 10px;
}

.service__price {}
</style>