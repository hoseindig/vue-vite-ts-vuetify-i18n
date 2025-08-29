<!-- src/App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>{{ $t("hello") }}</h1>
        <p>{{ $t("welcome") }}</p>
        <div class="test-box">تست جهت‌بندی</div>

        <!-- فرم نمونه -->
        <v-form>
          <v-text-field
            v-model="formData.name"
            :label="$t('name')"
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <v-select
            v-model="formData.option"
            :items="options"
            :label="$t('select')"
            variant="outlined"
            class="mb-4"
          ></v-select>
          <v-btn type="submit" color="primary">ارسال</v-btn>
        </v-form>

        <!-- دکمه‌های تغییر زبان -->
        <v-btn @click="switchLang('fa')" color="primary" class="lang-btn"
          >فارسی</v-btn
        >
        <v-btn @click="switchLang('en')" color="secondary" class="lang-btn"
          >English</v-btn
        >
      </v-container>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "./stores/settings";
import { ref } from "vue";

const { locale } = useI18n();
const settings = useSettingsStore();

// داده‌های فرم
const formData = ref({
  name: "",
  option: null,
});
const options = ["گزینه ۱", "گزینه ۲", "گزینه ۳"];

function switchLang(lang: string) {
  settings.setLocale(lang);
  locale.value = lang; // همگام‌سازی با vue-i18n
}
</script>

<style scoped>
.test-box {
  border: 1px solid black;
  padding: 10px;
  margin-inline-start: 20px; /* ویژگی منطقی */
  text-align: start; /* ویژگی منطقی */
}

.lang-btn {
  margin-inline-end: 8px; /* ویژگی منطقی */
}
</style>
