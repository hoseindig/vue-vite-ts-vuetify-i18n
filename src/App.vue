<!-- src/App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>{{ $t("hello") }}</h1>
        <p>{{ $t("welcome") }}</p>
        <div class="test-box">تست جهت‌بندی - Test Direction</div>

        <!-- فرم نمونه -->
        <v-form class="mt-6">
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
          <v-btn type="submit" color="primary">{{
            $t("submit") || "ارسال"
          }}</v-btn>
        </v-form>

        <!-- دکمه‌های تغییر زبان -->
        <div class="lang-buttons mt-6">
          <v-btn
            @click="switchLang('fa')"
            color="primary"
            class="lang-btn"
            :variant="currentLang === 'fa' ? 'flat' : 'outlined'"
          >
            فارسی
          </v-btn>
          <v-btn
            @click="switchLang('en')"
            color="secondary"
            class="lang-btn"
            :variant="currentLang === 'en' ? 'flat' : 'outlined'"
          >
            English
          </v-btn>
        </div>

        <!-- نمایش وضعیت فعلی -->
        <v-alert class="mt-4" type="info">
          زبان فعلی: {{ currentLang }} | جهت: {{ currentDirection }}
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted } from "vue";

const { locale } = useI18n();

// مدیریت ساده جهت و زبان
const currentLang = ref(localStorage.getItem("locale") || "fa");
const currentDirection = ref(localStorage.getItem("dir") || "rtl");

// داده‌های فرم
const formData = ref({
  name: "",
  option: null,
});
const options = ["گزینه ۱", "گزینه ۲", "گزینه ۳"];

function applyDirection(direction: string) {
  // تنظیم DOM
  document.documentElement.setAttribute("dir", direction);
  document.body.style.direction = direction;

  // تنظیم کلاس‌های CSS
  document.body.className = document.body.className.replace(
    /\b(rtl|ltr)\b/g,
    ""
  );
  document.body.classList.add(direction);

  console.log("✅ جهت اعمال شد:", direction);
}

function switchLang(lang: string) {
  console.log("🔄 تغییر زبان به:", lang);

  currentLang.value = lang;
  locale.value = lang;
  localStorage.setItem("locale", lang);

  const newDirection = lang === "fa" ? "rtl" : "ltr";
  currentDirection.value = newDirection;
  localStorage.setItem("dir", newDirection);

  applyDirection(newDirection);
}

// اعمال تنظیمات اولیه
onMounted(() => {
  applyDirection(currentDirection.value);
  locale.value = currentLang.value;
});

// مراقبت تغییرات
watch(currentDirection, applyDirection, { immediate: true });
</script>

<style scoped>
.test-box {
  border: 2px solid #1976d2;
  padding: 16px;
  margin: 16px 0;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-inline-start: 40px;
  text-align: start;
}

.lang-buttons {
  display: flex;
  gap: 8px;
}

.lang-btn {
  margin-inline-end: 8px;
}
</style>

<style>
/* استایل‌های سراسری برای جهت‌بندی */
body.rtl {
  direction: rtl;
}

body.ltr {
  direction: ltr;
}

body.rtl .v-application {
  direction: rtl !important;
}

body.ltr .v-application {
  direction: ltr !important;
}

body.rtl .v-field__input {
  text-align: right;
}

body.ltr .v-field__input {
  text-align: left;
}

body.rtl .v-btn + .v-btn {
  margin-right: 8px;
  margin-left: 0;
}

body.ltr .v-btn + .v-btn {
  margin-left: 8px;
  margin-right: 0;
}
</style>
