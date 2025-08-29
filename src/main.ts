// main.ts
import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import en from "../locales/en.json";
import fa from "../locales/fa.json";
import { useSettingsStore } from "./stores/settings";

// vuetify
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || "fa",
  fallbackLocale: "en",
  messages: { en, fa },
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

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");

// ✅ بعد از mount شدن
const settings = useSettingsStore();

// اولین بار html رو ست کن
document.documentElement.setAttribute("lang", settings.locale);
document.documentElement.setAttribute("dir", settings.direction);

// هر وقت تغییر کرد sync بشه
watch(
  () => settings.locale,
  (val) => {
    i18n.global.locale.value = val;
    document.documentElement.setAttribute("lang", val);
  }
);

watch(
  () => settings.direction,
  (val) => {
    document.documentElement.setAttribute("dir", val);
  }
);
