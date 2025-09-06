// services/sidebarService.ts
export interface SidebarSection {
  id: string
  title: string
  description?: string
  items: {
    id: string
    label: string
    icon?: string
    route?: string
    action?: () => void
  }[]
}

export async function fetchSidebarSections(): Promise<SidebarSection[]> {
  return Promise.resolve([
    {
      id: "change-execution",
      title: "Change Execution",
      description: "Use Change Management solution to create changes, manage changes with governance and implement your changes.",
      items: [],
    },
    {
      id: "access-work",
      title: "Access Your Work",
      items: [
        { id: "recents", label: "Recents", icon: "mdi-history", route: "/recents" },
        { id: "open", label: "Open", icon: "mdi-folder-open", route: "/open" },
        { id: "requests", label: "My Change Requests", icon: "mdi-file-document", route: "/requests" },
        { id: "orders", label: "My Change Orders", icon: "mdi-file-tree", route: "/orders" },
        { id: "actions", label: "My Change Actions", icon: "mdi-checkbox-marked-circle", route: "/actions" },
      ],
    },
    {
      id: "new-activity",
      title: "Start a New Activity",
      items: [
        { id: "new-request", label: "New Change Request", icon: "mdi-plus-box", route: "/new-request" },
        { id: "new-action", label: "New Change Action", icon: "mdi-plus-circle", route: "/new-action" },
      ],
    },
  ])
}
