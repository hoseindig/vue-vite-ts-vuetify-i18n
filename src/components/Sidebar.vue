<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="sidebar.isCollapsed"
    permanent
    app
    class="sidebar"
    :location="settings.direction === 'rtl' ? 'right' : 'left'"
    :class="{ 'sidebar--rtl': settings.direction === 'rtl' }"
  >
    <!-- Loading State -->
    <!-- <v-skeleton-loader
      v-if="sidebar.loading"
      type="list-item-avatar-two-line@10"
      class="mx-2 my-4"
      :style="{ opacity: 0.8 }"
    /> -->
    <div
      class="d-flex align-center justify-center"
      style="height: 100%"
      v-if="sidebar.loading"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      ></v-progress-circular>
    </div>

    <!-- Content when not loading -->
    <template v-else>
      <!-- Top header with logo + version -->
      <div class="d-flex align-center justify-space-between mb-4 px-3">
        <LanguageSwitch v-if="!sidebar.isCollapsed" />
        <small class="text-disabled text-caption">{{ appVersion }}</small>
      </div>

      <!-- Collapse Toggle -->
      <v-btn
        variant="text"
        icon
        @click="sidebar.toggleCollapse"
        class="mb-1 mx-auto"
        :aria-label="
          sidebar.isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'
        "
      >
        <v-icon :class="{ 'rotate-icon': settings.direction === 'rtl' }">
          {{ collapseIcon }}
        </v-icon>
      </v-btn>

      <!-- <v-divider class="my-2" /> -->

      <!-- Sections -->
      <div
        v-for="section in sidebar.sections"
        :key="section.id"
        class="section-wrapper"
      >
        <!-- Section Title -->
        <div v-if="!sidebar.isCollapsed" class="section-title mx-3 mb-2">
          <span class="text-caption font-weight-bold">
            {{ section.title[settings.locale] }}
          </span>
        </div>

        <!-- Menu Items -->
        <v-list density="compact" nav class="pa-0 ma-0">
          <template v-for="item in section.items" :key="item.id">
            <!-- Parent Item -->
            <v-list-item
              v-if="item.route"
              :to="item.route"
              :disabled="item.disabled"
              class="sidebar-item"
              active-class="sidebar-item--active"
            >
              <template #prepend>
                <v-icon size="18">
                  {{ item.icon }}
                </v-icon>
              </template>

              <v-list-item-title v-if="!sidebar.isCollapsed">
                <h4>{{ item.label[settings.locale] }}</h4>
              </v-list-item-title>
            </v-list-item>

            <!-- Child Items -->
            <v-list-item
              v-for="child in item.children"
              :key="child.id"
              :to="child.route"
              :disabled="child.disabled"
              class="sidebar-item"
              active-class="sidebar-item--active"
            >
              <template #prepend>
                <v-icon size="18">
                  {{ child.icon }}
                </v-icon>
              </template>

              <v-list-item-title v-if="!sidebar.isCollapsed">
                {{ child.label[settings.locale] }}
              </v-list-item-title>
            </v-list-item>

            <v-divider v-if="item.children?.length" class="my-2" />
          </template>
        </v-list>
      </div>
    </template>

    <!-- Error State -->
    <v-alert
      v-if="sidebar.error"
      type="error"
      :text="sidebar.error"
      class="mx-3 my-2"
      density="compact"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useSidebarStore } from "../stores/sidebar";
import { useSettingsStore } from "../stores/settings";
import LanguageSwitch from "./LanguageSwitch.vue";

// Reactive state for drawer visibility
const drawer = ref(true);

// Store instances
const sidebar = useSidebarStore();
const settings = useSettingsStore();

// Application version from environment
const appVersion = import.meta.env.VITE_APP_VERSION || "v0.0.0";

const collapseIcon = computed(() => {
  const isRtl = settings.direction === "rtl";

  if (isRtl) {
    return sidebar.isCollapsed
      ? "mdi-chevron-double-left"
      : "mdi-chevron-double-right";
  } else {
    return sidebar.isCollapsed
      ? "mdi-chevron-double-right"
      : "mdi-chevron-double-left";
  }
});

// Load sidebar sections on component mount
onMounted(() => {
  sidebar.loadSections(false);
});
</script>

<style scoped>
/* Sidebar container */
.sidebar {
  transition: width 0.3s ease;
}

/* RTL-specific adjustments */
.sidebar--rtl {
  direction: rtl;
}

/* Section title styling */
.section-title {
  padding: 8px 0;
  color: var(--v-theme-text-primary);
}

/* Sidebar item styling */
.sidebar-item {
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

/* Active sidebar item */
.sidebar-item--active {
  background-color: var(--v-theme-primary-lighten-1);
  color: var(--v-theme-primary);
}

/* Icon rotation for RTL */
.rotate-icon {
  transform: rotate(180deg);
}

/* Language buttons container */
.lang-buttons {
  display: flex;
  gap: 4px;
}

/* Hover effect for items */
.sidebar-item:hover {
  background-color: var(--v-theme-surface-variant);
}
</style>
