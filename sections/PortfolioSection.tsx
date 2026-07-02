'use client'

import { useState } from 'react'
import type React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Lock, Globe, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

/* ── Types ───────────────────────────────────────────────── */
type Category = 'custom' | 'shopify' | 'wordpress'

interface Project {
  name: string
  url: string
  displayUrl: string
  tech: string[]
  description: string
}

/* ── Project data ─────────────────────────────────────────── */
const SHOPIFY_PROJECTS: Project[] = [
  {
    name: 'Hanson of Sonoma',
    url: 'https://hansonofsonoma.com/',
    displayUrl: 'hansonofsonoma.com',
    tech: ['Shopify', 'Liquid', 'GSAP'],
    description:
      'Award-winning craft spirits brand. Custom Shopify build with animated storytelling sections, age verification, and an integrated online store.',
  },
  {
    name: 'Solstice Water Sports',
    url: 'https://solsticewatersports.com/',
    displayUrl: 'solsticewatersports.com',
    tech: ['Shopify', 'Liquid', 'Stripe'],
    description:
      'Water sports rental and booking platform with real-time availability, Stripe payments, and a mobile-first shopping experience.',
  },
]

const WORDPRESS_PROJECTS: Project[] = [
  {
    name: 'My Kitchen Corner',
    url: 'https://mykitchencorner.in/',
    displayUrl: 'mykitchencorner.in',
    tech: ['WordPress', 'Elementor', 'WooCommerce'],
    description:
      'Food & lifestyle blog with integrated recipe cards, cooking course store, and a custom meal-planning tool.',
  },
  {
    name: 'Anix Industries',
    url: 'http://anixindustries.com/',
    displayUrl: 'anixindustries.com',
    tech: ['WordPress', 'WooCommerce', 'PHP'],
    description:
      'Industrial products catalogue with detailed specification sheets, bulk inquiry forms, and a custom filterable product search.',
  },
  {
    name: 'Lekcomp',
    url: 'https://lekcomp.com/',
    displayUrl: 'lekcomp.com',
    tech: ['WordPress', 'Elementor', 'Custom Theme'],
    description:
      'IT solutions company showcasing services across web, mobile, and cloud — built with a custom Elementor theme for fast iteration.',
  },
  {
    name: 'Plantify Agri',
    url: 'https://plantifyagri.com/',
    displayUrl: 'plantifyagri.com',
    tech: ['WordPress', 'WooCommerce', 'Custom Theme'],
    description:
      'Agricultural technology platform helping modern farmers source quality inputs, with a clean e-commerce store and blog.',
  },
  {
    name: 'Perfect Associate',
    url: 'https://perfectassociate.in/',
    displayUrl: 'perfectassociate.in',
    tech: ['WordPress', 'ACF', 'Custom Theme'],
    description:
      'Business consulting firm with lead generation pages, service showcases, and a CRM-connected contact system built on ACF.',
  },
  {
    name: 'Radheshyam Consultancy',
    url: 'https://radheshyamconsultancy.com/',
    displayUrl: 'radheshyamconsultancy.com',
    tech: ['WordPress', 'Elementor', 'WPForms'],
    description:
      'Professional consultancy with an inquiry management system, appointment booking widget, and multi-step service request forms.',
  },
]

const CUSTOM_PROJECTS: Project[] = [
  {
    name: 'Viu Earth Water',
    url: 'https://viuearthwater.com/',
    displayUrl: 'viuearthwater.com',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    description:
      'Luxury artisan water brand with an immersive, conversion-optimised experience. Features parallax product reveals and a seamless checkout flow.',
  },
  {
    name: 'Pulse of Potential',
    url: 'https://pulseofpotential.com/',
    displayUrl: 'pulseofpotential.com',
    tech: ['Next.js', 'Framer Motion', 'Sanity CMS'],
    description:
      'Life coaching platform with dynamic content management, lead capture funnels, and animated scroll sections that drive high engagement.',
  },
  {
    name: 'Aavilo',
    url: 'https://aavilo.com/',
    displayUrl: 'aavilo.com',
    tech: ['React', 'TypeScript', 'Node.js'],
    description:
      'Premium fashion marketplace with curated collections, fast-loading product pages, and a seamless mobile shopping experience.',
  },
  {
    name: 'Airbond',
    url: 'https://airbond.in/',
    displayUrl: 'airbond.in',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    description:
      'Aviation services platform connecting verified clients with certified aviation professionals and charter services across India.',
  },
]

const CATEGORY_PROJECTS: Record<Category, Project[]> = {
  shopify:   SHOPIFY_PROJECTS,
  wordpress: WORDPRESS_PROJECTS,
  custom:    CUSTOM_PROJECTS,
}

/* ── Filter config ────────────────────────────────────────── */
const FILTERS: { id: Category; label: string }[] = [
  { id: 'custom',    label: 'Custom Development' },
  { id: 'shopify',   label: 'Shopify Projects'   },
  { id: 'wordpress', label: 'WordPress Projects'  },
]

/* ── Helpers ─────────────────────────────────────────────── */
function screenshotUrl(url: string): string {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200`
}

function gridClass(count: number): string {
  if (count <= 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1120px] mx-auto'
  if (count <= 4) return 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] mx-auto'
  return 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
}

/* ── Tech pill ───────────────────────────────────────────── */
function TechPill({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold font-heading tracking-wide"
      style={{
        background: 'rgba(233,255,0,0.06)',
        border: '1px solid rgba(233,255,0,0.15)',
        color: '#C4D900',
      }}
    >
      {label}
    </span>
  )
}

/* ── WordPress badge ─────────────────────────────────────── */
function WpBadge() {
  return (
    <span
      className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold font-heading tracking-widest uppercase"
      style={{
        background: 'rgba(33,117,155,0.15)',
        border: '1px solid rgba(33,117,155,0.30)',
        color: '#38b6e8',
      }}
    >
      WP
    </span>
  )
}

/* ── Filter button ───────────────────────────────────────── */
interface RippleState { x: number; y: number; id: number }

function FilterButton({
  label,
  count,
  active,
  loading,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  loading: boolean
  onClick: () => void
}) {
  const [ripple, setRipple] = useState<RippleState | null>(null)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!active) {
      const rect = e.currentTarget.getBoundingClientRect()
      setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() })
    }
    onClick()
  }

  const borderColor = active
    ? '#E9FF00'
    : loading
    ? 'rgba(233,255,0,0.35)'
    : 'rgba(255,255,255,0.12)'
  const bg = active ? '#E9FF00' : loading ? 'rgba(233,255,0,0.04)' : 'transparent'
  const color = active ? '#050816' : loading ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)'

  return (
    <motion.button
      onClick={handleClick}
      className="relative overflow-hidden whitespace-nowrap rounded-full px-6 font-heading font-semibold text-sm tracking-wide"
      style={{
        height: 46,
        border: `1px solid ${borderColor}`,
        background: bg,
        color,
        transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
      }}
      animate={{
        scale: active ? 1.03 : 1,
        boxShadow: active
          ? '0 0 24px rgba(233,255,0,0.35), 0 0 8px rgba(233,255,0,0.2)'
          : '0 0 0px rgba(233,255,0,0)',
      }}
      whileTap={{ scale: active ? 1.0 : 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={(e) => {
        if (!active && !loading) {
          e.currentTarget.style.borderColor = '#E9FF00'
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.background = 'rgba(233,255,0,0.06)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active && !loading) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
          e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      {/* Ripple */}
      {ripple && (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            background: active ? 'rgba(5,8,22,0.22)' : 'rgba(233,255,0,0.18)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.65 }}
          animate={{ width: 240, height: 240, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          onAnimationComplete={() => setRipple(null)}
        />
      )}

      {label} ({count})

      {/* Loading line — lime bar that fills left-to-right */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 w-full"
            style={{ background: '#E9FF00', transformOrigin: 'left center' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ── Project card ────────────────────────────────────────── */
interface CardProps {
  project: Project
  isWordPress?: boolean
  index: number
}

function ProjectCard({ project, isWordPress = false, index }: CardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hovered,   setHovered]   = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <motion.div
        className="group relative overflow-hidden rounded-2xl"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(14,22,40,0.60)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
        }}
        onMouseEnter={(e) => {
          setHovered(true)
          e.currentTarget.style.boxShadow =
            '0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(233,255,0,0.06)'
          e.currentTarget.style.borderColor = 'rgba(233,255,0,0.18)'
        }}
        onMouseLeave={(e) => {
          setHovered(false)
          e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.35)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        }}
      >
        {/* ── Browser chrome ── */}
        <div
          className="flex items-center gap-2 border-b px-3.5 py-2"
          style={{ background: '#0a0f1e', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {/* Traffic lights */}
          <div className="flex gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#FF5F57' }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#28CA40' }} />
          </div>

          {/* URL bar */}
          <div
            className="flex flex-1 items-center gap-1.5 rounded px-2 py-1 mx-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Lock className="h-2.5 w-2.5 shrink-0 text-green-400" />
            <span className="truncate font-mono text-[10px] text-velix-muted">
              {project.displayUrl}
            </span>
          </div>

          {/* LIVE badge */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-0.5 shrink-0"
            style={{
              background: 'rgba(40,202,64,0.10)',
              border: '1px solid rgba(40,202,64,0.22)',
            }}
          >
            <motion.div
              className="rounded-full shrink-0"
              style={{ width: 5, height: 5, background: '#28CA40' }}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              className="font-heading text-[9px] font-semibold tracking-wide"
              style={{ color: '#28CA40' }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* ── Screenshot area ── */}
        <div
          className="relative overflow-hidden"
          style={{ height: 220 }}
          data-cursor="view"
        >
          {/* Floating tech badge */}
          <motion.div
            className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1"
            style={{
              background: 'rgba(5,8,22,0.72)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-heading text-[10px] font-semibold text-white">
              {project.tech[0]}
            </span>
          </motion.div>

          {/* Skeleton shimmer */}
          {!imgLoaded && !imgFailed && (
            <div className="absolute inset-0 bg-[#0a0f1e]">
              <div
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.6s linear infinite',
                }}
              />
            </div>
          )}

          {/* Screenshot — hover scrolls vertically over 6s */}
          {!imgFailed ? (
            <motion.img
              src={screenshotUrl(project.url)}
              alt={`${project.name} website preview`}
              loading="lazy"
              decoding="async"
              className="absolute left-0 top-0 w-full object-cover object-top"
              style={{ height: '145%' }}
              animate={{
                y: hovered ? '-31%' : '0%',
                scale: hovered ? 1.04 : 1,
                opacity: imgLoaded ? 1 : 0,
              }}
              transition={
                hovered
                  ? {
                      y:       { duration: 6,   ease: 'linear'   },
                      scale:   { duration: 0.4, ease: 'easeOut'  },
                      opacity: { duration: 0.4                   },
                    }
                  : {
                      y:       { duration: 0.55, ease: 'easeOut' },
                      scale:   { duration: 0.35, ease: 'easeOut' },
                      opacity: { duration: 0.4                   },
                    }
              }
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgFailed(true)
                setImgLoaded(true)
              }}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0a0f1e]">
              <Globe className="h-10 w-10 text-white/10" />
              <span className="text-xs text-velix-muted/40">{project.displayUrl}</span>
            </div>
          )}

          {/* Hover gradient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(to top, rgba(5,8,22,0.6) 0%, rgba(5,8,22,0.1) 50%, transparent 100%)',
            }}
          />

          {/* View live overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold font-heading text-velix-bg"
              style={{ background: '#E9FF00', boxShadow: '0 0 24px rgba(233,255,0,0.5)' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Live Site
            </a>
          </div>
        </div>

        {/* ── Card content ── */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="font-heading text-[15px] font-semibold text-white">{project.name}</h3>
            {isWordPress && <WpBadge />}
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </div>

          <p className="mb-4 text-[13px] leading-relaxed text-velix-muted">
            {project.description}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-1.5 text-[12px] font-semibold font-heading transition-colors duration-200"
            style={{ color: '#A7B0C5' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E9FF00' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A7B0C5' }}
          >
            Visit Live Website
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>

        <div
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'rgba(233,255,0,0.07)' }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ── Section heading ─────────────────────────────────────── */
function SectionLabel({
  label,
  title,
  subtitle,
}: {
  label: string
  title: React.ReactNode
  subtitle?: string
}) {
  return (
    <motion.div
      className="mb-12 flex flex-col gap-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.span variants={fadeInUp} className="section-label self-start">
        {label}
      </motion.span>
      <motion.h2 variants={fadeInUp} className="text-section text-white">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeInUp} className="text-body-lg text-velix-muted max-w-lg">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export function PortfolioSection() {
  const [activeCategory,  setActiveCategory]  = useState<Category>('custom')
  const [loadingCategory, setLoadingCategory] = useState<Category | null>(null)

  function handleFilter(cat: Category) {
    if (cat === activeCategory || loadingCategory !== null) return
    setLoadingCategory(cat)
    setTimeout(() => {
      setActiveCategory(cat)
      setLoadingCategory(null)
    }, 420)
  }

  const projects = CATEGORY_PROJECTS[activeCategory]

  return (
    <section id="work" className="relative overflow-hidden bg-velix-bg py-28 lg:py-36">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-125 w-125 translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <Container>
        {/* Section heading */}
        <SectionLabel
          label="Our Work"
          title={
            <>
              Selected <span className="gradient-text">Work</span>
            </>
          }
          subtitle="Real projects. Real businesses. Real results."
        />

        {/* ── Filter bar — staggered viewport entry ── */}
        <motion.div
          className="mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div
            className="overflow-x-auto sm:overflow-visible"
            style={{ scrollbarWidth: 'none' } as React.CSSProperties}
          >
            <div className="flex gap-3 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
              {FILTERS.map((f) => (
                <motion.div key={f.id} variants={fadeInUp}>
                  <FilterButton
                    label={f.label}
                    count={CATEGORY_PROJECTS[f.id].length}
                    active={activeCategory === f.id && loadingCategory === null}
                    loading={loadingCategory === f.id}
                    onClick={() => handleFilter(f.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Adaptive project grid ── */}
        <motion.div layout transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, delay: 0.05 },
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
                transition: { duration: 0.22, ease: 'easeIn' },
              }}
            >
              <div className={gridClass(projects.length)}>
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project.url}
                    project={project}
                    isWordPress={activeCategory === 'wordpress'}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  )
}
