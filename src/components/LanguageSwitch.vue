<template>
  <div class="lang-buttons">
    <v-btn
      @click="setLocale('fa')"
      color="primary"
      size="x-small"
      :variant="locale === 'fa' ? 'flat' : 'outlined'"
    >
      فارسی
    </v-btn>
    <v-btn
      @click="setLocale('en')"
      color="secondary"
      size="x-small"
      :variant="locale === 'en' ? 'flat' : 'outlined'"
    >
      English
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";

// get locale and methods from store
const settings = useSettingsStore();
const { locale } = storeToRefs(settings);

const setLocale = (lang: "fa" | "en") => {
  settings.setLocale(lang);
};
</script>

<style scoped>
.lang-buttons {
  display: flex;
  gap: 4px;
}
</style>
