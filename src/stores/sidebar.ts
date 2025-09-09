import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// Mock
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
  const result: { icon?: string; disabled?: boolean } = {};

  settings.forEach((s) => {
    if (s.key === "icon") {
      result.icon = s.value;
    } else if (s.key === "disabled") {
      result.disabled = s.value === "true";
    }
  });

  return result;
}

// تبدیل label/tooltip به object: { fa: "...", en: "..." }
function parseMultiLang(arr: any[]): Record<string, string> {
  const result: Record<string, string> = {};
  arr.forEach((obj: any) => {
    const [key, value] = Object.entries(obj)[0];
    result[key] = value as string;
  });
  return result;
}

function transformMenu(data: any, lang: string = "fa"): MenuItem[] {
  if (!data) return [];

  return data.children?.map((item: any, idx: number) => {
    const base: MenuItem = {
      id: item.object_id || `item-${idx}`,
      label: parseMultiLang(item.label || []),
      tooltip: item.tooltip ? parseMultiLang(item.tooltip) : undefined,
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
      if (false) {//!useMock
        rawData = await fetchSidebarMenu();
      }

      const source = rawData || menuData;

      sections.value = [
        {
          id: source.object_id,
          title: parseMultiLang(source.label || []),
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
