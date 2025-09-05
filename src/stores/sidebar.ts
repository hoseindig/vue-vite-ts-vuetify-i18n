// stores/sidebar.ts
import { defineStore } from 'pinia'
import { fetchSidebarItems, type SidebarItem } from '../services/sidebarService'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    items: [] as SidebarItem[],
    isCollapsed: false,
    loading: false,
  }),
  actions: {
    async loadItems() {
      this.loading = true
      this.items = await fetchSidebarItems()
      this.loading = false
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    }
  }
})
