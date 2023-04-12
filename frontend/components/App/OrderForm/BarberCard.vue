<template>
  <div class="card cursor-pointer xs:py-6" :class="{ 'card-active': selectedBarber == barber }" @click="select" ref="barber">
    <nuxt-img :src="getAvatar()" fit="contain" class="avatar mb-2" />
    <p class="name">{{ props.name }}</p>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  imgSrc: String,
  name: String,
  gender: {
    type: String,
    default: 'm'
  }
})

const barber = ref(null)
const selectedBarber = useSelectBarber()

function getAvatar () {
  if (props.imgSrc) return props.imgSrc
  if (props.gender === 'm') return '/icons/man-face.svg'
  if (props.gender === 'w') return '/icons/woman-face.svg'
}

function select () {
  selectedBarber.value = barber.value
}

</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 2px solid $primary;
  transition: border-color .2s;

  &:hover {
    border-color: $orange;
  }
}

.card-active {
  border-color: $orange;
  background-color: $orange;

  .avatar {
    background-color: $primary;
  }
}

.avatar {
  width: 118px;
  height: 118px;
  border: 1px solid #636363;
  border-radius: 50%;
  overflow: hidden;

  @media screen and (max-width: 520px) {
    width: 20vw;
    height: 20vw;
  }
}
</style>