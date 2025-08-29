// main.ts
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// i18n
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fa from "../locales/fa.json";

// ✅ i18n config
const i18n = createI18n({
  locale: "fa", // زبان پیشفرض
  fallbackLocale: "en",
  messages: {
    en,
    fa,
  },
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

createApp(App)
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .use(i18n)
  .mount("#app");
