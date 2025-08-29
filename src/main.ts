import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import en from "../locales/en.json";
import fa from "../locales/fa.json";
import { useSettingsStore } from "./stores/settings";

// استایل‌های Vuetify و آیکون‌های mdi
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// تنظیم vue-i18n
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || "fa",
  fallbackLocale: "en",
  messages: { en, fa },
});

// تنظیم اولیه store
const pinia = createPinia();
const settings = useSettingsStore(pinia);

// تنظیم Vuetify با جهت‌بندی اولیه
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  defaults: {
    global: {
      rtl: settings.direction === "rtl", // تنظیم اولیه RTL
    },
  },
});

// ایجاد اپلیکیشن
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");

// همگام‌سازی تغییرات locale و direction
watch(
  () => settings.locale,
  (newLocale) => {
    i18n.global.locale.value = newLocale;
    document.documentElement.setAttribute("lang", newLocale);
  },
  { immediate: true }
);

watch(
  () => settings.direction,
  (newDir) => {
    // به‌روزرسانی RTL در Vuetify
    vuetify.display.rtl = newDir === "rtl";
    document.documentElement.setAttribute("dir", newDir);
  },
  { immediate: true }
);
