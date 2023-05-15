<template>
  <div class="card cursor-pointer xs:py-6" :class="{ 'card-active': order.barber?.id == props.barber.id }" @click="select"
    ref="barber">
    <nuxt-img :src="getAvatar()" class="avatar mb-2" :class="{ icon: !props.barber.avatar }" />
    <p class="name">{{ props.barber.name }}</p>
  </div>
</template>

<script setup lang='ts'>
import { IBarber } from '~/types/staff'
interface IProps {
  barber: IBarber
}
const props = defineProps<IProps>()

const url = useUploadsUrl()
const barber = ref(null)
const order = useOrder()


function getAvatar () {
  if (props.barber.avatar) return url + props.barber.avatar
  if (props.barber.gender === 'm') return '/icons/man-face.svg'
  return '/icons/woman-face.svg'
}

function select () {
  useClearState()
  if (props.barber.id) {
    order.value.barber = props.barber
  }
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
  object-fit: cover;

  @media screen and (max-width: 520px) {
    width: 20vw;
    height: 20vw;
  }
}

.icon {
  object-fit: contain !important;
}
</style>