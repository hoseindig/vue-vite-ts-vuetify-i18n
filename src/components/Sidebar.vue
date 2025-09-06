<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="sidebar.isCollapsed"
    permanent
    app
    class="pa-2"
    :location="settings.direction === 'rtl' ? 'right' : 'left'"
  >
    <!-- Top header with logo + version -->
    <div class="d-flex align-center justify-space-between mb-4 px-2">
      <!-- Language Switch -->
      <div class="lang-buttons">
        <v-btn
          @click="settings.setLocale('fa')"
          color="primary"
          size="x-small"
          :variant="settings.locale === 'fa' ? 'flat' : 'outlined'"
        >
          فارسی
        </v-btn>
        <v-btn
          @click="settings.setLocale('en')"
          color="secondary"
          size="x-small"
          :variant="settings.locale === 'en' ? 'flat' : 'outlined'"
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
          <v-list-item
            :to="item.route"
            :disabled="item.disabled"
            class="sidebar-item"
          >
            <!-- RTL -->
            <template v-if="settings.direction === 'rtl'">
              <v-list-item-title v-if="!sidebar.isCollapsed">{{
                item.label
              }}</v-list-item-title>
              <v-icon class="ms-2">{{ item.icon || fallbackIcon }}</v-icon>
            </template>

            <!-- LTR -->
            <template v-else>
              <v-icon class="me-2">{{ item.icon || fallbackIcon }}</v-icon>
              <v-list-item-title v-if="!sidebar.isCollapsed">{{
                item.label
              }}</v-list-item-title>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSidebarStore } from "../stores/sidebar";
import { useSettingsStore } from "../stores/settings";

const drawer = ref(true);
const sidebar = useSidebarStore();
const settings = useSettingsStore();

const fallbackIcon = "mdi-file-outline";
const appVersion = import.meta.env.VITE_APP_VERSION || "v0.0.0";

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
.lang-buttons {
  display: flex;
  gap: 4px;
}
</style>
