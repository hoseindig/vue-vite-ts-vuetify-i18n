<!-- App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>{{ $t("hello") }}</h1>
        <p>{{ $t("welcome") }}</p>
        <div class="test-box">تست جهت‌بندی - Test Direction</div>

        <!-- فرم نمونه با استایل‌های inline -->
        <v-form class="mt-6">
          <v-text-field
            v-model="formData.name"
            :label="$t('name')"
            variant="outlined"
            class="mb-4"
            :style="textFieldStyle"
          ></v-text-field>

          <v-select
            v-model="formData.option"
            :items="options"
            :label="$t('select')"
            variant="outlined"
            class="mb-4"
            :style="textFieldStyle"
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

        <!-- تست بیشتر -->
        <v-card class="mt-4">
          <v-card-title>تست فیلدهای بیشتر</v-card-title>
          <v-card-text>
            <v-text-field
              label="نام کاربری - Username"
              variant="outlined"
              :style="textFieldStyle"
              class="mb-4"
            ></v-text-field>

            <v-textarea
              label="توضیحات - Description"
              variant="outlined"
              :style="textFieldStyle"
            ></v-textarea>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted, computed } from "vue";
import type { StyleValue } from "vue"; // وارد کردن نوع StyleValue
import DefaultLayout from "./layouts/DefaultLayout.vue";
const { locale } = useI18n();

// مدیریت ساده جهت و زبان
const currentLang = ref(localStorage.getItem("locale") || "fa");
const currentDirection = ref<"rtl" | "ltr">(
  (localStorage.getItem("dir") as "rtl" | "ltr") || "rtl"
);

// داده‌های فرم
const formData = ref({
  name: "",
  option: null as string | null,
});
const options = ["گزینه ۱", "گزینه ۲", "گزینه ۳"];

// استایل محاسبه‌شده برای فیلدهای متنی
const textFieldStyle = computed<StyleValue>(() => ({
  direction: currentDirection.value,
  textAlign: currentDirection.value === "rtl" ? "right" : "left",
}));

function applyDirection(direction: "rtl" | "ltr") {
  // تنظیم DOM
  document.documentElement.setAttribute("dir", direction);
  document.body.style.direction = direction;
  document.body.className = document.body.className.replace(
    /\b(rtl|ltr)\b/g,
    ""
  );
  document.body.classList.add(direction);

  // اعمال استایل‌های inline به تمام فیلدهای موجود
  setTimeout(() => {
    const textFields = document.querySelectorAll(
      ".v-field__input input, .v-field__input textarea"
    );
    textFields.forEach((field: any) => {
      field.style.direction = direction;
      field.style.textAlign = direction === "rtl" ? "right" : "left";
    });

    const fieldInputs = document.querySelectorAll(".v-field__input");
    fieldInputs.forEach((field: any) => {
      field.style.direction = direction;
      field.style.textAlign = direction === "rtl" ? "right" : "left";
    });
  }, 50);

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
watch(
  currentDirection,
  (newDir) => {
    applyDirection(newDir);
  },
  { immediate: true }
);
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
