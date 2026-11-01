import type { MenuItemType } from '~/types/layout'

export const menuItems: MenuItemType[] = [
  {
    key: 'overview-title',
    label: 'Overview',
    isTitle: true
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    url: '/dashboard'
  }
]
