<template>
  <section class="flex-col justify-start pt-4">
    <h3 class="mb-5 text-center" v-if="false">Вы еще не добавили категорий</h3>

    <Button label="Создать категорию" class="mt-4" @click="switchDialogComponent('ncat')" />
    <i class="pi pi-spin pi-spinner mt-10" style="font-size: 2rem" v-if="isLoading"></i>
    <div class="services__container p-3" v-else-if="categories[0]?.id">
      <div class="category__container mt-10" v-for="category in categories" :key="category.id">
        <div class="category flex items-center gap-5">
          <p class="text-orange-300 text-2xl">{{ category.title }}</p>
          <Button icon="pi pi-plus" size="small" rounded @click="switchDialogComponent('nser', category.id)" />
          <Button icon="pi pi-pencil" size="small" rounded @click="switchDialogComponent('cat', unref(category))" />
        </div>

        <div class="service__container">
          <div class="service">
            <ul class="list-disc">
              <li class="p-3 hover:cursor-pointer hover:bg-gray-700" v-for="service in category.services"
                @click="switchDialogComponent('ser', service)">
                <span>{{ service.title }}</span> <span class="pl-5">{{ service.price }} ₽</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10" v-else>
      Вы еще не создали категорий
    </div>

    <Dialog v-model:visible="dialogVisible" modal :draggable="false" :header="dialogHeader">
      <component :is="dialogComponent" :data="dialogData" @close="fetchCategories" />
    </Dialog>
    <Toast />
  </section>
</template>

<script setup lang='ts'>
import { LazyAdminServicesDialogCategory, LazyAdminServicesDialogNewCategory, LazyAdminServicesDialogNewService, LazyAdminServicesDialogService } from '#components'
import { endpoints } from '~/constants/endpoints';
definePageMeta({
  layout: 'admin'
})

const isLoading = ref(true)
const dialogVisible = ref(false)
const dialogComponent = shallowRef()
const dialogHeader = ref("")
const dialogData = ref()
const categories = ref()

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

onMounted(async () => {
  await fetchCategories()
})

async function fetchCategories () {
  try {
    dialogVisible.value = false
    isLoading.value = true
    const { data } = await useApiFetch(endpoints.admin.all)
    categories.value = toRaw(data.value)
  } catch (error) {
    useNotify('error', 'Не удалось получить данные')
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped lang='scss'>
li {
  margin-top: 20px;
}
</style>