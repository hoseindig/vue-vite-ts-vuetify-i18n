// stores/settings.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const locale = ref(localStorage.getItem("locale") || "fa");
  const dir = ref(localStorage.getItem("dir") || "rtl");

  function setLocale(lang: string) {
    console.log("🌍 تغییر زبان:", lang);
    locale.value = lang;
    localStorage.setItem("locale", lang);

    // تغییر dir بر اساس زبان
    dir.value = lang === "fa" ? "rtl" : "ltr";
    localStorage.setItem("dir", dir.value);
  }

  // ✅ هر بار که dir تغییر کنه، روی html اعمال میشه
  watch(
    dir,
    (newDir) => {
      console.log("📐 تغییر جهت صفحه:", newDir);
      document.documentElement.setAttribute("dir", newDir);
    },
    { immediate: true }
  );

  // ✅ زبان هم روی html آپدیت میشه
  watch(
    locale,
    (newLocale) => {
      console.log("🔤 تغییر lang در html:", newLocale);
      document.documentElement.setAttribute("lang", newLocale);
    },
    { immediate: true }
  );

  return { locale, dir, setLocale };
});
