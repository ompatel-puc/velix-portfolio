import type { NavItem, SocialLink } from '@/types/site'

export const SITE_CONFIG = {
  name: 'Velix',
  tagline: 'We build digital experiences that matter.',
  description:
    'Velix is a premium web development company crafting high-performance, visually striking digital products.',
  email: 'hello@thevelix.com',
  location: 'Remote · Worldwide',
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', href: 'https://github.com', icon: 'github' },
  { platform: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { platform: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
]
