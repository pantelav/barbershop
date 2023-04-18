<template>
  <div class="staff__dialog flex flex-col gap-4 w-[300px]">
    <InputText placeholder="Фамилия" v-model="userData.lastName" />
    <InputText placeholder="Имя" v-model="userData.firstName" />
    <InputText placeholder="Отчество" v-model="userData.thirdName" />

    <span>Пол</span>
    <div class="flex flex-wrap gap-10">
      <div class="flex items-center">
        <RadioButton v-model="userData.gender" input-id="m" name="m" value="m" />
        <label for="m" class="ml-2">М</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="userData.gender" input-id="f" name="f" value="f" />
        <label for="f" class="ml-2">Ж</label>
      </div>
    </div>

    <Dropdown v-model="userData.category" :options="categories" placeholder="Выберите категорию" />

    <span>Фото</span>
    <FileUpload mode="basic" accept="image/*" :max-file-size="10000000" chooseLabel="Выбрать файл" />

    <div class="dialog__actions flex justify-between items-center mt-6">
      <Button label="Удалить" severity="danger" text />
      <Button label="Сохранить" />
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps(['user'])
const categories = ref(['Барбер', 'Модератор'])
const userData = reactive({
  lastName: '',
  firstName: '',
  thirdName: '',
  gender: 'm',
  category: 'Барбер',
  active: true,
  avatar: ''
})
onMounted(() => {
  if (props.user) {
    Object.assign(userData, props.user)
  }
})
</script>

<style scoped lang='scss'></style>