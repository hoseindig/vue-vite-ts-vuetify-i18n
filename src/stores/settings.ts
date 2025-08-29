// src/stores/settings.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const locale = ref(localStorage.getItem("locale") || "fa");
  const direction = ref(localStorage.getItem("dir") || "rtl");

  function setLocale(lang: string) {
    console.log("🌍 تغییر زبان:", lang);
    locale.value = lang;
    localStorage.setItem("locale", lang);

    // تغییر جهت‌بندی بر اساس زبان
    direction.value = lang === "fa" ? "rtl" : "ltr";
    localStorage.setItem("dir", direction.value);
  }

  return { locale, direction, setLocale };
});
