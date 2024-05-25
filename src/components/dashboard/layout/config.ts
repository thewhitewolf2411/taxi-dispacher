import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'orders', title: 'Orders', href: paths.dashboard.orders, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'drivers', title: 'Drivers', href: paths.dashboard.drivers, icon: 'plugs-connected' },
] satisfies NavItemConfig[];
