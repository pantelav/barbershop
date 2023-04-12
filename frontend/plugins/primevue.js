import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true, locale: {
      dayNames: ['Восскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    }
  });
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Sidebar", Sidebar);
  nuxtApp.vueApp.component("Button", Button);
});