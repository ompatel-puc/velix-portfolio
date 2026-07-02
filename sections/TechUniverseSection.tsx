'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { type IconType } from 'react-icons'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiExpress, SiLaravel,
  SiPhp, SiWordpress, SiWoocommerce, SiMongodb,
  SiMysql, SiPostgresql, SiGit, SiGithub,
  SiDocker, SiFigma, SiGreensock, SiFramer,
} from 'react-icons/si'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface Tech {
  name: string
  icon: IconType
  color: string
  bg: string
}

/* ── Ring 1 — inner (6 items, 26 s CW) ─────────────────── */
const RING_1: Tech[] = [
  { name: 'React',      icon: SiReact,       color: '#61DAFB', bg: 'rgba(97,218,251,0.12)'  },
  { name: 'Next.js',    icon: SiNextdotjs,   color: '#FFFFFF', bg: 'rgba(255,255,255,0.08)' },
  { name: 'TypeScript', icon: SiTypescript,  color: '#3178C6', bg: 'rgba(49,120,198,0.12)'  },
  { name: 'JavaScript', icon: SiJavascript,  color: '#F7DF1E', bg: 'rgba(247,223,30,0.12)'  },
  { name: 'Tailwind',   icon: SiTailwindcss, color: '#06B6D4', bg: 'rgba(6,182,212,0.12)'   },
  { name: 'GSAP',       icon: SiGreensock,   color: '#88CE02', bg: 'rgba(136,206,2,0.12)'   },
]

/* ── Ring 2 — middle (8 items, 40 s CCW) ─────────────────── */
const RING_2: Tech[] = [
  { name: 'Node.js',    icon: SiNodedotjs,   color: '#339933', bg: 'rgba(51,153,51,0.12)'   },
  { name: 'Express',    icon: SiExpress,     color: '#A7B0C5', bg: 'rgba(167,176,197,0.10)' },
  { name: 'Laravel',    icon: SiLaravel,     color: '#FF2D20', bg: 'rgba(255,45,32,0.12)'   },
  { name: 'PHP',        icon: SiPhp,         color: '#777BB4', bg: 'rgba(119,123,180,0.12)' },
  { name: 'WordPress',  icon: SiWordpress,   color: '#21759B', bg: 'rgba(33,117,155,0.12)'  },
  { name: 'WooCommerce',icon: SiWoocommerce, color: '#96588A', bg: 'rgba(150,88,138,0.12)'  },
  { name: 'MongoDB',    icon: SiMongodb,     color: '#47A248', bg: 'rgba(71,162,72,0.12)'   },
  { name: 'MySQL',      icon: SiMysql,       color: '#4479A1', bg: 'rgba(68,121,161,0.12)'  },
]

/* ── Ring 3 — outer (6 items, 60 s CW) ──────────────────── */
const RING_3: Tech[] = [
  { name: 'PostgreSQL',    icon: SiPostgresql, color: '#4169E1', bg: 'rgba(65,105,225,0.12)'  },
  { name: 'Git',           icon: SiGit,        color: '#F05032', bg: 'rgba(240,80,50,0.12)'   },
  { name: 'GitHub',        icon: SiGithub,     color: '#A7B0C5', bg: 'rgba(167,176,197,0.08)' },
  { name: 'Docker',        icon: SiDocker,     color: '#2496ED', bg: 'rgba(36,150,237,0.12)'  },
  { name: 'Figma',         icon: SiFigma,      color: '#F24E1E', bg: 'rgba(242,78,30,0.12)'   },
  { name: 'Framer Motion', icon: SiFramer,     color: '#BB4B96', bg: 'rgba(187,75,150,0.12)'  },
]

const BADGE_SIZE = 52

/* ── TechBadge ──────────────────────────────────────────── */
function TechBadge({ item }: { item: Tech }) {
  const Icon = item.icon
  return (
    <div
      className="group relative flex flex-col items-center"
      style={{ width: BADGE_SIZE, height: BADGE_SIZE + 20 }}
    >
      <div
        className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-125"
        style={{
          width: BADGE_SIZE,
          height: BADGE_SIZE,
          background: item.bg,
          border: `1.5px solid ${item.color}50`,
          boxShadow: `0 0 10px ${item.color}20`,
        }}
      >
        <Icon size={22} color={item.color} />
      </div>
      <span
        className="absolute whitespace-nowrap rounded bg-[#0E1628] px-1.5 py-0.5 text-[9px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ top: BADGE_SIZE + 4, border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {item.name}
      </span>
    </div>
  )
}

/* ── Mobile grid ────────────────────────────────────────── */
function MobileTechGrid() {
  const all = [...RING_1, ...RING_2, ...RING_3]
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:hidden">
      {all.map((t) => {
        const Icon = t.icon
        return (
          <div
            key={t.name}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold font-heading"
            style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color }}
          >
            <Icon size={13} color={t.color} />
            <span className="text-white/60">{t.name}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── OrbitRing ──────────────────────────────────────────── */
interface OrbitRingProps {
  items: Tech[]
  radius: number
  duration: number
  reverse?: boolean
  ringOpacity?: number
}

function OrbitRing({ items, radius, duration, reverse = false, ringOpacity = 0.08 }: OrbitRingProps) {
  const orbitKf   = reverse ? 'orbit-ccw'   : 'orbit-cw'
  const counterKf = reverse ? 'counter-ccw' : 'counter-cw'
  const size = radius * 2

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size, height: size,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        border: `1px solid rgba(233,255,0,${ringOpacity})`,
        boxShadow: `0 0 40px rgba(233,255,0,${ringOpacity * 0.5}) inset`,
      }}
    >
      {items.map((item, i) => {
        const angle    = (i / items.length) * 360
        const angleNeg = -angle
        return (
          <div
            key={item.name}
            className="absolute"
            style={{
              top: 0, left: '50%',
              marginTop:  -(BADGE_SIZE / 2),
              marginLeft: -(BADGE_SIZE / 2),
              transformOrigin: `${BADGE_SIZE / 2}px ${radius + BADGE_SIZE / 2}px`,
              animation: `${orbitKf} ${duration}s linear infinite`,
              ['--orbit-angle']     : `${angle}deg`,
              ['--orbit-angle-neg'] : `${angleNeg}deg`,
              ['--orbit-r']         : '0px',
              willChange: 'transform',
            } as React.CSSProperties}
          >
            <div style={{ animation: `${counterKf} ${duration}s linear infinite`, willChange: 'transform' }}>
              <TechBadge item={item} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Center logo ────────────────────────────────────────── */
function CenterLogo() {
  return (
    <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
      {[1, 2, 3].map((n) => (
        <motion.div
          key={n}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-velix-accent/25"
          style={{ width: 64 + n * 14, height: 64 + n * 14 }}
          animate={{ scale: [0.9, 1.35, 0.9], opacity: [0, 0.35, 0] }}
          transition={{
            duration: 4, repeat: Infinity, delay: n * 1.3,
            ease: 'easeInOut',
          }}
        />
      ))}
      <motion.div
        className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full overflow-hidden"
        style={{
          background: '#0E1628',
          border: '1px solid rgba(233,255,0,0.2)',
        }}
        animate={{
          boxShadow: [
            '0 0 12px rgba(233,255,0,0.35), 0 0 22px rgba(233,255,0,0.15)',
            '0 0 26px rgba(233,255,0,0.7), 0 0 42px rgba(233,255,0,0.3)',
            '0 0 12px rgba(233,255,0,0.35), 0 0 22px rgba(233,255,0,0.15)',
          ],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/logo-mark.jpg"
          alt="Velix"
          width={80}
          height={80}
          className="h-16 w-16 rounded-full object-cover"
        />
      </motion.div>
    </div>
  )
}

/* ── Main section ───────────────────────────────────────── */
export function TechUniverseSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.tech-orbit-frame', { opacity: 0, rotateX: 22, transformOrigin: 'center 60%' })
      gsap.to('.tech-orbit-frame', {
        opacity: 1, rotateX: 0, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: '.tech-orbit-frame', start: 'top 85%', toggleActions: 'play none none none' },
      })
      gsap.set('.tech-ring', { opacity: 0 })
      gsap.to('.tech-ring', {
        opacity: 1, duration: 0.8, stagger: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: '.tech-orbit-frame', start: 'top 80%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tech" className="relative overflow-hidden bg-velix-bg py-28 lg:py-36">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.05) 0%, rgba(233,255,0,0.02) 30%, transparent 65%)',
          filter: 'blur(30px)',
        }}
      />

      <Container>
        <SectionHeading
          label="Tech Stack"
          title={<>The <span className="gradient-text">Technology Universe</span></>}
          subtitle="20 technologies orbiting a single purpose — building exceptional digital experiences."
          className="mb-6"
        />
      </Container>

      {/* Orbit visualisation — desktop only */}
      <div
        className="tech-orbit-frame relative mx-auto hidden lg:block"
        style={{ width: '100%', maxWidth: 820, height: 820, perspective: '1200px', opacity: 0 }}
      >
        <CenterLogo />

        <div className="tech-ring" style={{ opacity: 0 }}>
          <OrbitRing items={RING_1} radius={145} duration={26} ringOpacity={0.14} />
        </div>
        <div className="tech-ring" style={{ opacity: 0 }}>
          <OrbitRing items={RING_2} radius={258} duration={40} reverse ringOpacity={0.10} />
        </div>
        <div className="tech-ring" style={{ opacity: 0 }}>
          <OrbitRing items={RING_3} radius={370} duration={60} ringOpacity={0.07} />
        </div>

        {/* Corner decorative crosses */}
        {[
          { top: '12%', left: '5%' },
          { top: '12%', right: '5%' },
          { bottom: '12%', left: '5%' },
          { bottom: '12%', right: '5%' },
        ].map((pos, i) => (
          <div key={i} className="absolute opacity-20" style={pos as React.CSSProperties}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <line x1="8" y1="0" x2="8" y2="16" stroke="#E9FF00" strokeWidth="1" />
              <line x1="0" y1="8" x2="16" y2="8" stroke="#E9FF00" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </div>

      {/* Mobile grid */}
      <Container className="mt-8">
        <MobileTechGrid />
      </Container>
    </section>
  )
}
