<template>
  <section class="flex-col justify-start pt-4">
    <h3 class="mb-5 text-center" v-if="false">Вы еще не добавили категорий</h3>

    <Button label="Создать категорию" class="mt-4" @click="switchDialogComponent('ncat')" />
    <div class="services__container p-3">
      <div class="category__container mt-10" v-for="category in services" :key="category.category">
        <div class="category flex items-center gap-5">
          <p class="text-orange-300 text-2xl">{{ category.category }}</p>
          <Button icon="pi pi-plus" size="small" rounded @click="switchDialogComponent('nser')" />
          <Button icon="pi pi-pencil" size="small" rounded @click="switchDialogComponent('cat', category.category)" />
        </div>

        <div class="service__container">
          <div class="service">
            <ul class="list-disc">
              <li class="p-3 hover:cursor-pointer hover:bg-gray-700" v-for="service in category.services"
                @click="switchDialogComponent('ser', { title: service.title, price: service.price })">
                {{ service.title }} {{ service.price }} руб</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="dialogVisible" modal :draggable="false" :header="dialogHeader">
      <component :is="dialogComponent" :data="dialogData" />
    </Dialog>
  </section>
</template>

<script setup lang='ts'>
import { LazyAdminServicesDialogCategory, LazyAdminServicesDialogNewCategory, LazyAdminServicesDialogNewService, LazyAdminServicesDialogService } from '#components'
definePageMeta({
  layout: 'admin'
})

const dialogVisible = ref(false)
const dialogComponent = shallowRef()
const dialogHeader = ref("")
const dialogData = ref()

const services = ref([
  {
    category: "Стрижка",
    services: [
      {
        title: 'Стрижка под насадку',
        price: 500
      },
      {
        title: 'Стрижка под ноль',
        price: 1000
      },
    ]
  },
  {
    category: "Бритье",
    services: [
      {
        title: 'Бритье лезвием',
        price: 500
      },
      {
        title: 'Бритье полотенцем',
        price: 1000
      },
    ]
  },
])
type dilogType = 'cat' | 'ser' | 'ncat' | 'nser'
function switchDialogComponent (type: dilogType, data: any = null) {
  if (data) dialogData.value = data
  dialogVisible.value = true
  switch (type) {
    case 'ncat':
      dialogComponent.value = LazyAdminServicesDialogNewCategory
      dialogHeader.value = "Создать категорию"
      break
    case 'nser':
      dialogComponent.value = LazyAdminServicesDialogNewService
      dialogHeader.value = "Добавить услугу"
      break
    case 'cat':
      dialogComponent.value = LazyAdminServicesDialogCategory
      dialogHeader.value = "Редактировать категорию"
      break
    case 'ser':
      dialogComponent.value = LazyAdminServicesDialogService
      dialogHeader.value = "Редактировать услугу"
      break
  }
}
</script>

<style scoped lang='scss'>
li {
  margin-top: 20px;
}
</style>