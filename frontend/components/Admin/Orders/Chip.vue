<template>
  <div class="chip__container flex">
    <div class="chip font-semibold" :class="bg">
      {{ statusText }}
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  status: String
})
const statusText = ref('')
const bg = ref('green')

onMounted(() => {
  if (props.status === 'active') {
    statusText.value = 'Активен'
    bg.value = 'green'
  }
  if (props.status === 'resolved') {
    statusText.value = 'Завершен'
    bg.value = 'yellow'
  }
  if (props.status === 'rejected') {
    statusText.value = 'Отменен'
    bg.value = 'red'
  }
})

</script>

<style scoped lang='scss'>
.chip {
  padding: 3px 8px;
  border-radius: 100px;
}

.green {
  background-color: green;
}

.red {
  background-color: rgb(212, 35, 35);
}

.yellow {
  background-color: rgb(222, 148, 9);
}
</style>