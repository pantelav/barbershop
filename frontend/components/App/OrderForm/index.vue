<template>
  <div class="form" :class="{ 'form-shadow': !props.modal }">
    <h3 class="form__title pb-4 text-center">{{ formTitle[steps - 1] }}</h3>
    <div class="form__steps">
      <div class="step">1</div>
      <div class="step" :class="{ 'step-orange': steps > 1 }">2</div>
      <div class="step" :class="{ 'step-orange': steps > 2 }">3</div>
      <div class="step" :class="{ 'step-orange': steps > 3 }">4</div>
      <div class="line"></div>
    </div>
    <div class="form__data w-full">
      <Transition name="fade" mode="out-in">
        <component :is="components[steps - 1]" />
      </Transition>
    </div>
    <div class="form__actions w-full flex xs:mt-8 mt-4"
      :class="{ 'justify-between': steps > 1, 'justify-end': steps < 2 }">
      <button class="btn btn-prev bg-blue-600" @click="prevStep" v-if="steps > 1">Назад</button>
      <button class="btn btn-next" @click="nextStep">{{ btnText[steps - 1] }}</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import BarberContainer from './BarberContainer.vue';
import Services from './Services.vue';
import Date from './Date.vue';
import Info from './Info.vue';

const props = defineProps({
  modal: {
    type: Boolean,
    default: false
  }
})
const components = shallowRef([BarberContainer, Services, Date, Info])
const steps = useSteps()
const formTitle = ['Выберите барбера', 'Выберите услуги', 'Выберите время', 'Введите контактные данные']
const btnText = ['Выбрать услуги', 'Выбрать время', 'Ввести данные', 'Записаться']
function nextStep () {
  if (steps.value >= 4) return
  steps.value++
}
function prevStep () {
  if (steps.value <= 1) return
  steps.value--
}
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

.btn-prev {
  background-color: rgb(37, 99, 235);
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