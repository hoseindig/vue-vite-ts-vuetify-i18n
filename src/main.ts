import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import en from "../locales/en.json";
import fa from "../locales/fa.json";

// استایل‌های Vuetify و آیکون‌های mdi
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import "./styles/rtl.css"; // اضافه کردن فایل RTL
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// خواندن تنظیمات اولیه از localStorage
const savedLocale = localStorage.getItem("locale") || "fa";
const savedDirection = localStorage.getItem("dir") || "rtl";

// تنظیم فوری DOM
document.documentElement.setAttribute("dir", savedDirection);
document.documentElement.setAttribute("lang", savedLocale);
document.body.style.direction = savedDirection;
document.body.classList.add(savedDirection); // اضافه کردن کلاس برای CSS

// تنظیم vue-i18n
const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: { en, fa },
});

// تنظیم Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: "light",
  },
});

//
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");
