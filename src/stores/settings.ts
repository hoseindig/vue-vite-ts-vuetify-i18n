// src/stores/settings.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  // مقادیر پیش‌فرض
  const defaultLocale = "fa";
  const defaultDirection = "rtl";

  // خواندن مقادیر از localStorage با fallback
  const locale = ref(localStorage.getItem("locale") || defaultLocale);
  const direction = ref(localStorage.getItem("dir") || defaultDirection);

  function setLocale(lang: string) {
    console.log("🌍 تغییر زبان:", lang);
    locale.value = lang;
    localStorage.setItem("locale", lang);

    // تنظیم جهت‌بندی بر اساس زبان
    const newDirection = lang === "fa" ? "rtl" : "ltr";
    direction.value = newDirection;
    localStorage.setItem("dir", newDirection);

    console.log("📐 جهت تنظیم شد به:", newDirection);

    // اعمال فوری تغییرات به DOM
    document.documentElement.setAttribute("dir", newDirection);
    document.documentElement.setAttribute("lang", lang);
    document.body.style.direction = newDirection;
  }

  function setDirection(dir: "rtl" | "ltr") {
    console.log("📐 تغییر مستقیم جهت:", dir);
    direction.value = dir;
    localStorage.setItem("dir", dir);

    // اعمال فوری به DOM
    document.documentElement.setAttribute("dir", dir);
    document.body.style.direction = dir;
  }

  // مراقبت تغییرات direction برای اعمال فوری
  watch(
    direction,
    (newDir) => {
      console.log("👁️ direction watcher:", newDir);
      document.documentElement.setAttribute("dir", newDir);
      document.body.style.direction = newDir;
    },
    { immediate: true }
  );

  return {
    locale,
    direction,
    setLocale,
    setDirection,
  };
});
