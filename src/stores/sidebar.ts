import { defineStore } from "pinia";
import { ref } from "vue";

// نمونه سرویس (تو واقعی باید از axios یا fetch استفاده کنی)
import menuData from "../mock/menu.json"; // همون JSON که دادی

function parseSettings(settings: any[]) {
  const result: { icon?: string; disabled?: boolean; tooltip?: string } = {};

  settings.forEach((s) => {
    if (s.key === "icon") {
      result.icon = s.value;
    } else if (s.key === "disabled") {
      result.disabled = s.value === "true";
    } else if (s.key === "tooltip") {
      const fa = s.value.find((x: any) => x.key === "fa")?.value;
      const en = s.value.find((x: any) => x.key === "en")?.value;
      result.tooltip = fa || en;
    }
  });

  return result;
}

function parseLabel(labels: any[], lang: string = "fa") {
  return labels.find((x) => x.key === lang)?.value || labels[0]?.value;
}

function transformMenu(data: any, lang: string = "fa") {
  if (!data) return [];

  return data.children?.map((item: any, idx: number) => {
    const base = {
      id: item.object_id || `item-${idx}`,
      label: parseLabel(item.label, lang),
      route: item.href || null,
      type: item.type,
      children: [] as any[],
      ...parseSettings(item.settings || [])
    };

    if (item.children?.length) {
      base.children = transformMenu(item, lang);
    }

    return base;
  });
}

export const useSidebarStore = defineStore("sidebar", () => {
  const isCollapsed = ref(false);
  const sections = ref<any[]>([]);

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
  }

  async function loadSections() {
    // اینجا در عمل باید از API بگیری
    const lang = "fa";
    sections.value = [
      {
        id: menuData.object_id,
        title: parseLabel(menuData.label, lang),
        description: "",
        items: transformMenu(menuData, lang)
      }
    ];
  }

  return {
    isCollapsed,
    sections,
    toggleCollapse,
    loadSections
  };
});
