<template>
  <div class="services__container">
    <div class="category" v-for="category in categories" :key="category.id">
      <p class="category__title">{{ category.title }}</p>
      <div class="category__service" :class="{ 'service-selected': isServiceInState(service) }"
        v-for="service in category.services" :key="service.id" @click="selectService(service)">
        <p class="service__title">{{ service.title }}</p>
        <p class="service__price">{{ service.price }} р</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints'
import { ICategoryWithServices, IService } from '~/types/service'

const categories = ref<ICategoryWithServices[] | null>()
const order = useOrder()
onMounted(async () => {
  try {
    const { data } = await useApiFetch<ICategoryWithServices[] | null>(endpoints.client.services)
    categories.value = data.value
  } catch (error) {

  }
})

function selectService (service: IService) {
  const idx = order.value.services.findIndex(item => item.id === service.id )
  if (idx > -1) {
    order.value.services.splice(idx, 1)
  } else {
    order.value.services.push(service)
  }
}

function isServiceInState(service: IService) {
  const idx = order.value.services.findIndex(item => item.id === service.id)
  return idx > -1 ? true : false
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