<template>
  <div class="form" :class="{ 'form-shadow': !props.modal }">
    <h3 class="form__title pb-4 text-center">{{ formTitle[order.steps - 1] }}</h3>
    <template v-if="order.steps <= 4">
      <div class="form__steps">
        <div class="step">1</div>
        <div class="step" :class="{ 'step-orange': order.steps > 1 }">2</div>
        <div class="step" :class="{ 'step-orange': order.steps > 2 }">3</div>
        <div class="step" :class="{ 'step-orange': order.steps > 3 }">4</div>
        <div class="line"></div>
      </div>
      <div class="form__data w-full">
        <Transition name="fade" mode="out-in">
          <component :is="components[order.steps - 1]" />
        </Transition>
      </div>
      <div class="form__actions w-full flex xs:mt-0 mt-4"
        :class="{ 'justify-between': order.steps > 1, 'justify-end': order.steps < 2 }">
        <Button label="Назад" severity="info" text @click="prevStep" v-if="order.steps > 1" />
        <Button :label="btnText[order.steps - 1]" @click="nextStep" :disabled="checkNext" :loading="sendingForm" />
      </div>
    </template>
    <LazyAppOrderFormSucessOrder v-else />
  </div>
</template>

<script setup lang='ts'>
import {
  AppOrderFormBarberContainer,
  LazyAppOrderFormServices,
  LazyAppOrderFormDate,
  LazyAppOrderFormInfo,
  LazyAppOrderFormSucessOrder
} from '#components'
import { endpoints } from '~/constants/endpoints'

const props = defineProps({
  modal: {
    type: Boolean,
    default: false
  }
})
const sendingForm = ref(false)
const components = shallowRef([AppOrderFormBarberContainer, LazyAppOrderFormServices, LazyAppOrderFormDate, LazyAppOrderFormInfo, LazyAppOrderFormSucessOrder])
const order = useOrder()
const formTitle = ['Выберите барбера', 'Выберите услуги', 'Выберите время', 'Введите контактные данные', 'Вы записаны 👍']
const btnText = ['Выбрать услуги', 'Выбрать время', 'Ввести данные', 'Записаться']

async function nextStep () {
  if (order.value.steps === 4) {
    if (!order.value.contacts.name || !order.value.contacts.phone || !order.value.date || !order.value.time) {
      return useNotify('error', 'Все обязательные поля должны быть заполнены')
    }
    sendingForm.value = true
    const date = order.value.date as Date
    const [h, m] = order.value.time?.split(':')
    date.setHours(parseInt(h))
    date.setMinutes(parseInt(m))
    const body = {
      name: order.value.contacts.name,
      phone: order.value.contacts.phone,
      barber: order.value.barber?.id,
      services: order.value.services,
      date: date.toString(),
      comment: order.value.contacts.comment,
      email: order.value.contacts.email,
    }
    const { data, error } = await useApiFetch(endpoints.client.order, {
      method: 'post',
      body
    })
    sendingForm.value = false
    if (error.value) {
      if (error.value.message === 'Не корректный формат номера телефона') {
        return useNotify('error', error.value.message)
      }
      return useNotify('error', 'Ошибка загрузки данных')
    }
    return order.value.steps++
  }
  order.value.steps++
}
function prevStep () {
  if (order.value.steps <= 1) return
  order.value.steps--
}

const checkNext = computed(() => {
  if (order.value.steps === 1 && !order.value.barber) return true
  if (order.value.steps === 2 && !order.value.services.length) return true
  if (order.value.steps === 3 && !order.value.time) return true
  if (order.value.steps === 4 && (!order.value.contacts.name || order.value.contacts.phone.length < 10)) return true
  return false
})
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: $primary;
  max-height: 600px;

  @media screen and (max-width: 520px) {
    box-shadow: none !important;
  }
}

.form-shadow {
  box-shadow: 0px 4px 5px 5px rgba(212, 170, 97, 0.25);
}

.form__steps {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .step {
    height: 65px;
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid $orange;
    border-radius: 50px;
    background-color: $primary;
    font-size: 20px;
    z-index: 1;
    transition: all .2s;

    @media screen and (max-width: 520px) {
      width: 12vw;
      height: 12vw;
    }

    &:first-child {
      background-color: $orange;
    }
  }

  .step-orange {
    background-color: $orange;
  }

  .line {
    position: absolute;
    height: 2px;
    width: 99%;
    background-color: $orange;
    top: 50%;
  }
}

.form__data {
  height: 480px;
  overflow-x: hidden;
  overflow-y: scroll;

  @media screen and (max-width: 640px) {
    height: auto;
  }
}

.btn {
  background-color: $orange;
  padding: 10px 20px;
  width: 40%;
  font-weight: 600;

  @media screen and (max-width: 520px) {
    width: 45%;
    padding: 5px 10px;
    font-size: 14px;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}
</style>