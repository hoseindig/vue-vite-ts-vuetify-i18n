// services/sidebarService.ts
export interface SidebarItem {
  id: string
  title: string
  icon: string
  route: string
}

export async function fetchSidebarItems(): Promise<SidebarItem[]> {
  // mock api call - you can replace with real fetch
  return Promise.resolve([
    { id: '1', title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
    { id: '2', title: 'Users', icon: 'mdi-account', route: '/users' },
    { id: '3', title: 'Settings', icon: 'mdi-cog', route: '/settings' },
  ])
}
