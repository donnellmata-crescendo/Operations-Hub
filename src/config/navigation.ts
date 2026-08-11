import type { NavItem, QuickLink } from '@/types';

/**
 * Left-hand navigation. Mirrors the benchmark's IA (Home + grouped sections)
 * but for Operations. Section anchors resolve to on-page sections today and
 * become child Confluence pages as the hub grows.
 */
export const navigation: NavItem[] = [
  { label: 'Home', href: '#top', icon: 'home', active: true },
  { label: 'Operations Pulse', href: '#pulse', icon: 'activity' },
  {
    label: 'Systems & Operations',
    href: '#systems',
    icon: 'grid',
    children: [
      { label: 'Workforce & Coverage', href: '#workforce', icon: 'users' },
      { label: 'Account Operations', href: '#accounts', icon: 'briefcase' },
      { label: 'Operating Cadence', href: '#cadence', icon: 'calendar' },
      { label: 'Systems', href: '#platforms', icon: 'server' },
      { label: 'SOP & Process Library', href: '#sops', icon: 'book' },
    ],
  },
  {
    label: 'Ops AI, Insights & Tooling',
    href: '#ai',
    icon: 'sparkles',
    children: [
      { label: 'AI Tools', href: '#ai-tools', icon: 'bot' },
      { label: 'Dashboards & Metrics', href: '#dashboards', icon: 'bar-chart' },
      { label: 'Documentation', href: '#docs', icon: 'file-text' },
    ],
  },
  { label: 'Help / Ownership', href: '#help', icon: 'life-buoy' },
];

/** Quick-link chips under the hero — the "get me somewhere fast" row. */
export const quickLinks: QuickLink[] = [
  { label: 'Systems', href: '#platforms', icon: 'server' },
  { label: 'SOPs', href: '#sops', icon: 'book' },
  { label: 'AI Tools', href: '#ai-tools', icon: 'bot' },
  { label: 'Dashboards', href: '#dashboards', icon: 'bar-chart' },
  { label: 'Metrics', href: '#dashboards', icon: 'trending-up' },
];
