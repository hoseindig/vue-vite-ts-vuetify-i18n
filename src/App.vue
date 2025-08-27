<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>{{ $t("hello") }}</h1>
        <p>{{ $t("welcome") }}</p>

        <!-- دکمه تغییر زبان -->
        <v-btn @click="switchLang('fa')">فارسی</v-btn>
        <v-btn @click="switchLang('en')">English</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function switchLang(lang: string) {
  locale.value = lang;
}
</script>
