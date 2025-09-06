<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="sidebar.isCollapsed"
    permanent
    app
    class="pa-2"
    :location="isRTL ? 'right' : 'left'"
  >
    <!-- Top header with logo + version -->
    <div class="d-flex align-center justify-space-between mb-4 px-2">
      <!-- <v-icon size="32">{{ appIcon }}</v-icon> -->
      <!-- دکمه‌های تغییر زبان -->
      <div class="lang-buttons mt-6">
        <v-btn
          @click="switchLang('fa')"
          color="primary"
          size="small"
          :variant="currentLang === 'fa' ? 'flat' : 'outlined'"
        >
          فارسی
        </v-btn>
        <v-btn
          @click="switchLang('en')"
          color="secondary"
          size="small"
          :variant="currentLang === 'en' ? 'flat' : 'outlined'"
        >
          English
        </v-btn>
      </div>
      <small class="text-disabled text-caption">{{ appVersion }}</small>
    </div>

    <!-- Collapse Toggle -->
    <v-btn variant="text" icon @click="sidebar.toggleCollapse" class="mb-2">
      <v-icon>
        {{
          sidebar.isCollapsed
            ? "mdi-chevron-double-right"
            : "mdi-chevron-double-left"
        }}
      </v-icon>
    </v-btn>

    <v-divider />

    <!-- Sections -->
    <div v-for="section in sidebar.sections" :key="section.id" class="mb-4">
      <!-- Title -->
      <div v-if="!sidebar.isCollapsed" class="mb-2">
        <div class="text-caption font-weight-bold">{{ section.title }}</div>
      </div>

      <!-- Items -->
      <v-list density="compact" nav>
        <template v-for="item in section.items" :key="item.id">
          <!-- With tooltip -->
          <v-tooltip v-if="item.tooltip" location="right">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :to="item.route"
                :disabled="item.disabled"
                class="sidebar-item"
              >
                <!-- RTL -->
                <template v-if="currentDirection === 'rtl'">
                  <v-list-item-title v-if="!sidebar.isCollapsed">
                    {{ item.label }}
                  </v-list-item-title>
                  <v-icon class="ms-2">{{ item.icon }}</v-icon>
                </template>

                <!-- LTR -->
                <template v-else>
                  <v-icon class="me-2">{{ item.icon }}</v-icon>
                  <v-list-item-title v-if="!sidebar.isCollapsed">
                    {{ item.label }}
                  </v-list-item-title>
                </template>
              </v-list-item>
            </template>
            <span>{{ item.tooltip }}</span>
          </v-tooltip>

          <!-- Without tooltip -->
          <v-list-item
            v-else
            :to="item.route"
            :disabled="item.disabled"
            class="sidebar-item"
          >
            <!-- RTL -->
            <template v-if="currentDirection === 'rtl'">
              <v-list-item-title v-if="!sidebar.isCollapsed">
                {{ item.label }}
              </v-list-item-title>
              <v-icon class="ms-2">{{ item.icon }}</v-icon>
            </template>

            <!-- LTR -->
            <template v-else>
              <v-icon class="me-2">{{ item.icon }}</v-icon>
              <v-list-item-title v-if="!sidebar.isCollapsed">
                {{ item.label }}
              </v-list-item-title>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useSidebarStore } from "../stores/sidebar";
import { useI18n } from "vue-i18n";

const drawer = ref(true);
const sidebar = useSidebarStore();
const { locale } = useI18n();

// Default fallback icon if item has no icon
const fallbackIcon = "mdi-file-outline";

// Small version text from .env
const appVersion = import.meta.env.VITE_APP_VERSION || "v0.0.0";

// Global app icon (could be configurable or static)
const appIcon = "mdi-application";

// Direction based on current language
// const currentDirection = computed<"rtl" | "ltr">(() =>
//   locale.value === "fa" ? "rtl" : "ltr"
// );

////////////////////////
// مدیریت ساده جهت و زبان
const currentLang = ref(localStorage.getItem("locale") || "fa");
const currentDirection = ref<"rtl" | "ltr">(
  (localStorage.getItem("dir") as "rtl" | "ltr") || "rtl"
);

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

// Check language direction
const isRTL = computed(() => sidebar.language === "fa");

onMounted(() => {
  sidebar.loadSections();
});
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text-caption {
  font-size: 0.8rem;
}
</style>
