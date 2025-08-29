<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>{{ $t("hello") }}</h1>
        <p>{{ $t("welcome") }}</p>

        <v-btn @click="switchLang('fa')">فارسی</v-btn>
        <v-btn @click="switchLang('en')">English</v-btn>
      </v-container>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "./stores/settings";

const { locale } = useI18n();
const settings = useSettingsStore();

function switchLang(lang: string) {
  settings.setLocale(lang);
  locale.value = lang; // sync با i18n
}
</script>
