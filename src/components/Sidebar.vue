<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="sidebar.isCollapsed"
    permanent
    app
    class=""
    :location="settings.direction === 'rtl' ? 'right' : 'left'"
  >
    <!-- Top header with logo + version -->
    <div class="d-flex align-center justify-space-between mb-4 px-2">
      <!-- Language Switch -->
      <LanguageSwitch v-if="!sidebar.isCollapsed" />
      <small class="text-disabled text-caption">{{ appVersion }}</small>
    </div>

    <!-- Collapse Toggle -->
    <v-btn variant="text" icon @click="sidebar.toggleCollapse" class="mb-2">
      <v-icon>{{ collapseIcon }}</v-icon>
    </v-btn>

    <v-divider />

    <!-- Sections -->
    <div
      v-for="section in sidebar.sections"
      :key="section.id"
      class="mb-4 mt-3"
    >
      <!-- Title -->
      <div v-if="!sidebar.isCollapsed" class="mb-2 mx-2">
        <div class="text-caption font-weight-bold">
          {{ section.title[settings.locale] }}
        </div>
      </div>

      <!-- Items -->
      <v-list density="compact" nav class="pa-0 ma-0">
        <template v-for="item in section.items" :key="item.id">
          <v-list-item
            :to="item.route"
            :disabled="item.disabled"
            class="sidebar-item"
          >
            <v-tooltip :text="item.tooltip?.[settings.locale]" location="end">
              <template #activator="{ props }">
                <div class="d-flex align-center w-100" v-bind="props">
                  <!-- RTL -->
                  <template v-if="settings.direction === 'rtl'">
                    <v-icon :icon="fallbackIcon"></v-icon>
                    <v-list-item-title v-if="!sidebar.isCollapsed" class="ms-2">
                      {{ item.label[settings.locale] }}
                    </v-list-item-title>
                  </template>

                  <!-- LTR -->
                  <template v-else>
                    <v-icon :icon="fallbackIcon"></v-icon>
                    <v-list-item-title v-if="!sidebar.isCollapsed">
                      {{ item.label[settings.locale] }}
                    </v-list-item-title>
                  </template>
                </div>
              </template>
            </v-tooltip>
          </v-list-item>

          <!-- 👇 سطح دوم -->
          <v-list
            v-if="item.children && item.children.length"
            density="compact"
            nav
            :class="[sidebar.isCollapsed ? 'ps-0' : 'ms-4']"
          >
            <template v-for="child in item.children" :key="child.id">
              <v-list-item
                :to="child.route"
                :disabled="child.disabled"
                class="sidebar-item"
              >
                <v-tooltip
                  :text="child.tooltip?.[settings.locale]"
                  location="end"
                >
                  <template #activator="{ props }">
                    <div class="d-flex align-center w-100" v-bind="props">
                      <v-icon :icon="fallbackIcon"></v-icon>
                      <v-list-item-title
                        v-if="!sidebar.isCollapsed"
                        class="ms-2"
                      >
                        {{ child.label[settings.locale] }}
                      </v-list-item-title>
                    </div>
                  </template>
                </v-tooltip>
              </v-list-item>
            </template>
          </v-list>
          <!-- 👆 سطح دوم -->
        </template>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useSidebarStore } from "../stores/sidebar";
import { useSettingsStore } from "../stores/settings";
import LanguageSwitch from "./LanguageSwitch.vue";
// import {
//   mdiAccount,
//   mdiDelete,
//   mdiPencil,
//   mdiShareVariant,
// } from "mdi-file-outline";
const fallbackIcon = "mdi-file-outline";
const drawer = ref(true);
const sidebar = useSidebarStore();
const settings = useSettingsStore();

const appVersion = import.meta.env.VITE_APP_VERSION || "v0.0.0";

const collapseIcon = computed(() => {
  const isRtl = settings.direction === "rtl";
  if (sidebar.isCollapsed) {
    // Collapsed → show expand arrow
    return isRtl ? "mdi-chevron-double-left" : "mdi-chevron-double-right";
  } else {
    // Expanded → show collapse arrow
    return isRtl ? "mdi-chevron-double-right" : "mdi-chevron-double-left";
  }
});

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

.lang-buttons {
  display: flex;
  gap: 4px;
}
</style>
