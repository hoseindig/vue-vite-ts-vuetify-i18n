<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="sidebar.isCollapsed"
    permanent
    app
    class="elevation-2"
  >
    <!-- Toggle button -->
    <v-list-item>
      <v-btn
        variant="text"
        icon="mdi-chevron-double-left"
        @click="sidebar.toggleCollapse"
      />
    </v-list-item>

    <v-divider />

    <!-- Items -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in sidebar.items"
        :key="item.id"
        :to="item.route"
        prepend-icon="mdi"
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title v-if="!sidebar.isCollapsed">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSidebarStore } from "../stores/sidebar";

const drawer = ref(true);
const sidebar = useSidebarStore();

onMounted(() => {
  sidebar.loadItems();
});
</script>
