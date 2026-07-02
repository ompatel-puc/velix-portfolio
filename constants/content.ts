import type { Service, Project, Testimonial } from '@/types/site'

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Performant, scalable web apps built with modern frameworks.',
    icon: 'code',
  },
  {
    id: 'ui-design',
    title: 'UI/UX Design',
    description: 'Pixel-perfect interfaces that delight users at every touchpoint.',
    icon: 'palette',
  },
  {
    id: 'motion',
    title: 'Motion & Animation',
    description: 'Fluid animations and 3D experiences that elevate your brand.',
    icon: 'sparkles',
  },
  {
    id: 'consulting',
    title: 'Technical Consulting',
    description: 'Strategic guidance on architecture, performance, and scalability.',
    icon: 'lightbulb',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Project Alpha',
    description: 'A full-stack SaaS platform with real-time capabilities.',
    tags: ['Next.js', 'TypeScript', 'Postgres'],
    imageUrl: '/images/project-1.jpg',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Project Beta',
    description: 'E-commerce experience with immersive 3D product views.',
    tags: ['React', 'Three.js', 'Stripe'],
    imageUrl: '/images/project-2.jpg',
    featured: true,
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Alex Carter',
    role: 'CEO',
    company: 'Acme Corp',
    content:
      'Velix transformed our digital presence. The attention to detail and execution speed were unmatched.',
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Kim',
    role: 'Product Lead',
    company: 'Horizon Labs',
    content: 'Working with Velix felt like having a senior in-house team. Exceptional quality.',
  },
]
