<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="sidebar.isCollapsed"
    permanent
    app
    class="pa-2"
  >
    <!-- Collapse Toggle -->
    <v-btn variant="text" icon @click="sidebar.toggleCollapse" class="mb-2">
      <v-icon>{{
        sidebar.isCollapsed
          ? "mdi-chevron-double-right"
          : "mdi-chevron-double-left"
      }}</v-icon>
    </v-btn>

    <v-divider />

    <!-- Sections -->
    <div v-for="section in sidebar.sections" :key="section.id" class="mb-4">
      <!-- Title & Description -->
      <div v-if="!sidebar.isCollapsed" class="mb-2">
        <div class="text-caption font-weight-bold">{{ section.title }}</div>
        <div
          v-if="section.description"
          class="text-body-2 text-medium-emphasis"
        >
          {{ section.description }}
        </div>
      </div>

      <!-- Items -->
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in section.items"
          :key="item.id"
          :to="item.route"
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title v-if="!sidebar.isCollapsed">
            {{ item.label }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSidebarStore } from "../stores/sidebar";

const drawer = ref(true);
const sidebar = useSidebarStore();

onMounted(() => {
  sidebar.loadSections();
});
</script>

<style scoped>
.text-caption {
  font-size: 0.8rem;
}
</style>
