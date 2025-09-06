import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// نمونه داده mock (برای fallback / dev)
import menuData from "../mock/menu.json";

// Types
interface MenuItem {
  id: string;
  label: Record<string, string>;
  route: string | null;
  type: string;
  icon?: string;
  disabled?: boolean;
  tooltip?: Record<string, string>;
  children?: MenuItem[];
}

interface Section {
  id: string;
  title: Record<string, string>;
  description: string;
  items: MenuItem[];
}

// ---- Parsers ----
function parseSettings(settings: any[]) {
  const result: { icon?: string; disabled?: boolean; tooltip?: Record<string, string> } = {};

  settings.forEach((s) => {
    if (s.key === "icon") {
      result.icon = s.value;
    } else if (s.key === "disabled") {
      result.disabled = s.value === "true";
    } else if (s.key === "tooltip") {
      result.tooltip = Object.fromEntries(s.value.map((x: any) => [x.key, x.value]));
    }
  });

  return result;
}

function parseLabel(labels: any[], lang: string = "fa") {
  return Object.fromEntries(labels.map((x: any) => [x.key, x.value]));
}

function transformMenu(data: any, lang: string = "fa"): MenuItem[] {
  if (!data) return [];

  return data.children?.map((item: any, idx: number) => {
    const base: MenuItem = {
      id: item.object_id || `item-${idx}`,
      label: parseLabel(item.label, lang),
      route: item.href || null,
      type: item.type,
      children: [],
      ...parseSettings(item.settings || [])
    };

    if (item.children?.length) {
      base.children = transformMenu(item, lang);
    }

    return base;
  });
}

// ---- API Service ----
async function fetchSidebarMenu(): Promise<any | null> {
  try {
    const { data } = await axios.get("http://api.plm.ir/get-widget-sidebar-menu");
    return data;
  } catch (err) {
    console.error("API call failed, using mock menu:", err);
    return null;
  }
}

// ---- Store ----
export const useSidebarStore = defineStore("sidebar", () => {
  const isCollapsed = ref(false);
  const sections = ref<Section[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
  }

  async function loadSections(useMock = false) {
    loading.value = true;
    error.value = null;
    const lang = "fa";

    try {
      let rawData: any = null;

      if (!useMock) {
        rawData = await fetchSidebarMenu();
      }

      const source = rawData || menuData; // fallback
      sections.value = [
        {
          id: source.object_id,
          title: parseLabel(source.label, lang),
          description: "",
          items: transformMenu(source, lang)
        }
      ];
    } catch (e: any) {
      error.value = e.message || "خطا در بارگذاری منو";
    } finally {
      loading.value = false;
    }
  }

  return {
    isCollapsed,
    sections,
    loading,
    error,
    toggleCollapse,
    loadSections
  };
});
