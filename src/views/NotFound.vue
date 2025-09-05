<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center text-center"
  >
    <v-icon size="80" color="error">mdi-alert-circle-outline</v-icon>
    <h1 class="text-h3 font-weight-bold mt-4">404</h1>
    <p class="text-subtitle-1">صفحه‌ای که دنبالشی پیدا نشد!</p>
    <v-btn color="primary" class="mt-6" @click="$router.push('/')">
      بازگشت به خانه
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
// این صفحه فقط استاتیکه، نیاز به logic خاصی نداره
</script>

<style scoped>
h1 {
  font-size: 4rem;
}
</style>
