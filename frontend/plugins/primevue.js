import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import MultiSelect from 'primevue/multiselect';
import Checkbox from 'primevue/checkbox';
import Skeleton from 'primevue/skeleton';
import InputMask from 'primevue/inputmask';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true, locale: {
      dayNames: ['Восскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      firstDayOfWeek: 1
    }
  });

  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Sidebar", Sidebar);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("RadioButton", RadioButton);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  nuxtApp.vueApp.component("MultiSelect", MultiSelect);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("Skeleton", Skeleton);
  nuxtApp.vueApp.component("InputMask", InputMask);
});