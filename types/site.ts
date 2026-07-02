export interface NavItem {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatarUrl?: string
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl?: string
  social?: SocialLink[]
}
