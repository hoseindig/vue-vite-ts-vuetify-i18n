// stores/sidebar.ts
import { defineStore } from "pinia"
import { fetchSidebarSections, type SidebarSection } from "../services/sidebarService"

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    sections: [] as SidebarSection[],
    isCollapsed: false,
  }),
  actions: {
    async loadSections() {
      this.sections = await fetchSidebarSections()
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    },
  },
})
