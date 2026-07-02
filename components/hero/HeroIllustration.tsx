'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'

/* ── VS Code Dark+ token palette ────────────────────────── */
const C = {
  kw:   '#C586C0',
  fn:   '#DCDCAA',
  jsx:  '#4EC9B0',
  type: '#4EC9B0',
  prop: '#9CDCFE',
  str:  '#CE9178',
  cmt:  '#6A9955',
  num:  '#B5CEA8',
  acc:  '#E9FF00',
  dim:  'rgba(255,255,255,0.55)',
}

type Token     = { t: string; c?: string }
type LineEntry = { tokens: Token[]; indent?: number } | 'blank'

function Line({
  tokens,
  indent = 0,
  cursor = false,
}: {
  tokens: Token[]
  indent?: number
  cursor?: boolean
}) {
  return (
    <div style={{ paddingLeft: indent * 12 }}>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: tok.c ?? C.dim }}>
          {tok.t}
        </span>
      ))}
      {cursor && (
        <motion.span
          style={{
            width: 1.5,
            height: '0.82em',
            background: '#E9FF00',
            display: 'inline-block',
            verticalAlign: 'text-bottom',
            marginLeft: 1,
          }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.1, times: [0, 0.499, 0.5, 1], repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  )
}

function Blank() {
  return <div style={{ height: '1.72em' }} />
}

/* ── Hanson of Sonoma — realistic client code ───────────── */
const CODE_LINES: LineEntry[] = [
  { tokens: [{ t: '// app/(client)/hanson-landing/page.tsx', c: C.cmt }] },
  'blank',
  { tokens: [{ t: 'import ', c: C.kw }, { t: 'type ', c: C.kw }, { t: '{ ' }, { t: 'Metadata', c: C.type }, { t: ' } ' }, { t: 'from ', c: C.kw }, { t: "'next'", c: C.str }] },
  { tokens: [{ t: 'import ', c: C.kw }, { t: '{ ' }, { t: 'HeroSection', c: C.fn }, { t: ' } ' }, { t: 'from ', c: C.kw }, { t: "'@/components/HeroSection'", c: C.str }] },
  { tokens: [{ t: 'import ', c: C.kw }, { t: '{ ' }, { t: 'motion', c: C.fn }, { t: ' } ' }, { t: 'from ', c: C.kw }, { t: "'framer-motion'", c: C.str }] },
  'blank',
  { tokens: [{ t: 'export ', c: C.kw }, { t: 'const ', c: C.kw }, { t: 'metadata', c: C.prop }, { t: ': ' }, { t: 'Metadata', c: C.type }, { t: ' = {' }] },
  { tokens: [{ t: 'title', c: C.prop }, { t: ':       ' }, { t: "'Hanson of Sonoma'", c: C.str }, { t: ',' }], indent: 1 },
  { tokens: [{ t: 'description', c: C.prop }, { t: ': ' }, { t: "'Award-winning spirits.'", c: C.str }, { t: ',' }], indent: 1 },
  { tokens: [{ t: '}' }] },
  'blank',
  { tokens: [{ t: 'interface ', c: C.kw }, { t: 'HeroProps', c: C.type }, { t: ' {' }] },
  { tokens: [{ t: 'title', c: C.prop }, { t: ':   ' }, { t: 'string', c: C.type }], indent: 1 },
  { tokens: [{ t: 'company', c: C.prop }, { t: ': ' }, { t: 'string', c: C.type }], indent: 1 },
  { tokens: [{ t: 'theme', c: C.prop }, { t: ':   ' }, { t: "'dark'", c: C.str }, { t: ' | ' }, { t: "'light'", c: C.str }], indent: 1 },
  { tokens: [{ t: '}' }] },
  'blank',
  { tokens: [{ t: 'export ', c: C.kw }, { t: 'default ', c: C.kw }, { t: 'function ', c: C.kw }, { t: 'HansonLanding', c: C.fn }, { t: '() {' }] },
  { tokens: [{ t: 'return', c: C.kw }, { t: ' (' }], indent: 1 },
  { tokens: [{ t: '<', c: C.dim }, { t: 'main', c: C.jsx }, { t: ' className', c: C.prop }, { t: '=' }, { t: '"min-h-screen bg-stone-950"', c: C.str }, { t: '>' }], indent: 2 },
  { tokens: [{ t: '<', c: C.dim }, { t: 'HeroSection', c: C.fn }], indent: 3 },
  { tokens: [{ t: 'title', c: C.prop }, { t: '=' }, { t: '"Premium Craft Spirits"', c: C.str }], indent: 4 },
  { tokens: [{ t: 'company', c: C.prop }, { t: '=' }, { t: '"Hanson of Sonoma"', c: C.str }], indent: 4 },
  { tokens: [{ t: 'theme', c: C.prop }, { t: '=' }, { t: '"dark"', c: C.str }], indent: 4 },
  { tokens: [{ t: '/>' }], indent: 3 },
  { tokens: [{ t: '<', c: C.dim }, { t: 'motion.section', c: C.fn }], indent: 3 },
  { tokens: [{ t: 'initial', c: C.prop }, { t: '={{ opacity: ' }, { t: '0', c: C.num }, { t: ', y: ' }, { t: '32', c: C.num }, { t: ' }}' }], indent: 4 },
  { tokens: [{ t: 'whileInView', c: C.prop }, { t: '={{ opacity: ' }, { t: '1', c: C.num }, { t: ', y: ' }, { t: '0', c: C.num }, { t: ' }}' }], indent: 4 },
  { tokens: [{ t: 'transition', c: C.prop }, { t: '={{ duration: ' }, { t: '0.8', c: C.num }, { t: ' }}' }], indent: 4 },
  { tokens: [{ t: 'className', c: C.prop }, { t: '=' }, { t: '"py-24 px-6"', c: C.str }], indent: 4 },
  { tokens: [{ t: '>' }], indent: 3 },
  { tokens: [{ t: '{/* Products section */}', c: C.cmt }], indent: 4 },
  { tokens: [{ t: '</', c: C.dim }, { t: 'motion.section', c: C.fn }, { t: '>' }], indent: 3 },
  { tokens: [{ t: '</', c: C.dim }, { t: 'main', c: C.jsx }, { t: '>' }], indent: 2 },
  { tokens: [{ t: ')' }], indent: 1 },
  { tokens: [{ t: '}' }] },
]

/* ── Terminal sequence ───────────────────────────────────── */
interface TermLine {
  text: string
  lineType: 'cmd' | 'info' | 'ok'
}

const TERM_SEQ: TermLine[] = [
  { text: '$ npm install',                   lineType: 'cmd'  },
  { text: '  ✓ Packages installed',           lineType: 'ok'   },
  { text: '$ npm run build',                 lineType: 'cmd'  },
  { text: '  Compiling...',                  lineType: 'info' },
  { text: '  Optimizing images...',          lineType: 'info' },
  { text: '  Generating static pages...',    lineType: 'info' },
  { text: '  ✓ Build complete  [4.2s]',      lineType: 'ok'   },
  { text: '  Deploying...',                  lineType: 'info' },
  { text: '  ✓ Live · velix.studio',         lineType: 'ok'   },
]

/* ── Cycle timing (ms from cycle start) ─────────────────── */
const TYPING_END  = 2500   // code scroll finishes
const SAVE_AT     = 2800   // auto-save fires (● dot disappears)
//                3200     // terminal first line (= TERM_DELAYS[0])
const TERM_DELAYS = [3200, 3900, 4600, 5300, 6000, 6700, 7400, 8200, 9600]
const TERM_CYCLE  = 11800  // pause then restart

const TERM_COLOR: Record<TermLine['lineType'], string> = {
  cmd:  '#E9FF00',
  info: 'rgba(167,176,197,0.75)',
  ok:   '#28CA40',
}

/* ── Terminal panel — now controlled ─────────────────────── */
function TerminalPanel({ lines, cycleId }: { lines: TermLine[]; cycleId: number }) {
  const VISIBLE   = 5
  const startIdx  = Math.max(0, lines.length - VISIBLE)
  const visibleLines = lines.slice(startIdx)

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Tab row */}
      <div
        className="flex items-center select-none"
        style={{ background: '#0a0f1e', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 26 }}
      >
        <div
          className="flex items-center gap-2 px-4"
          style={{
            height: '100%',
            borderBottom: '1px solid #E9FF00',
            fontFamily: 'monospace',
            fontSize: 10,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          TERMINAL
        </div>
        {['PROBLEMS', 'OUTPUT'].map(tab => (
          <div
            key={tab}
            className="px-4"
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {tab}
          </div>
        ))}
        <div className="ml-auto pr-3" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
          ×
        </div>
      </div>

      {/* Lines */}
      <div
        style={{
          height: 90,
          padding: '8px 14px',
          fontFamily: 'monospace',
          fontSize: 11,
          lineHeight: 1.65,
          background: '#060a1a',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence initial={false}>
          {visibleLines.map((line, i) => (
            <motion.div
              key={`${cycleId}-${startIdx + i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ color: TERM_COLOR[line.lineType], whiteSpace: 'nowrap' }}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Skeleton loading view ───────────────────────────────── */
function SkeletonView() {
  return (
    <div className="flex flex-col gap-2 p-3 h-full" style={{ overflow: 'hidden' }}>
      {/* Navbar skeleton */}
      <div className="flex items-center gap-2" style={{ height: 14, flexShrink: 0 }}>
        <div className="rounded-sm animate-pulse" style={{ height: 8, width: 32, background: 'rgba(255,255,255,0.09)' }} />
        <div className="ml-auto flex gap-2">
          {[22, 18, 20].map((w, i) => (
            <div key={i} className="rounded-sm animate-pulse" style={{ height: 6, width: w, background: 'rgba(255,255,255,0.06)' }} />
          ))}
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="rounded-sm animate-pulse" style={{ height: 10, width: '78%', background: 'rgba(255,255,255,0.09)' }} />
        <div className="rounded-sm animate-pulse" style={{ height: 8,  width: '62%', background: 'rgba(255,255,255,0.07)' }} />
        <div className="rounded-sm animate-pulse" style={{ height: 8,  width: '48%', background: 'rgba(255,255,255,0.06)' }} />
        <div className="flex gap-2 mt-1.5">
          <div className="rounded-full animate-pulse" style={{ height: 14, width: 46, background: 'rgba(255,255,255,0.09)' }} />
          <div className="rounded-full animate-pulse" style={{ height: 14, width: 38, background: 'rgba(255,255,255,0.05)' }} />
        </div>
      </div>

      {/* Image area skeleton */}
      <div className="rounded-sm animate-pulse mt-1" style={{ flex: 1, background: 'rgba(255,255,255,0.04)' }} />

      {/* Cards skeleton */}
      <div className="flex gap-1.5" style={{ flexShrink: 0 }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 rounded-sm animate-pulse" style={{ height: 26, background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>
    </div>
  )
}

/* ── Miniature website (Hanson of Sonoma) ────────────────── */
function PreviewWebsite({ phase }: { phase: number }) {
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ color: '#fff' }}>

      {/* Navbar */}
      <motion.div
        className="flex items-center gap-1.5 px-3"
        style={{
          height: 22,
          background: 'rgba(5,8,22,0.97)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      >
        <span style={{ color: '#E9FF00', fontWeight: 900, fontSize: 9, fontFamily: 'monospace' }}>H</span>
        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 6.5, letterSpacing: '0.03em' }}>
          Hanson of Sonoma
        </span>
        <div className="ml-auto flex gap-3">
          {['About', 'Shop', 'Contact'].map(item => (
            <span key={item} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 6 }}>{item}</span>
          ))}
        </div>
      </motion.div>

      {/* Hero area */}
      <div
        className="relative flex-1 overflow-hidden px-3 pt-2.5"
        style={{ background: 'linear-gradient(145deg, #06080f 0%, #0c1228 55%, #10172a 100%)' }}
      >
        {/* Compile shimmer */}
        <AnimatePresence>
          {phase >= 3 && phase < 7 && (
            <motion.div
              key="shimmer"
              className="pointer-events-none absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-y-0"
                style={{
                  width: '55%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(233,255,0,0.035) 50%, transparent 100%)',
                }}
                animate={{ x: ['-100%', '280%'] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category label */}
        <motion.div
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            color: 'rgba(195,168,100,0.6)',
            fontSize: 5.5,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Craft Spirits · Sonoma Valley
        </motion.div>

        {/* Heading */}
        <motion.div
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 5 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          style={{ marginTop: 4 }}
        >
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.13, letterSpacing: '-0.03em' }}>
            Premium
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.13, letterSpacing: '-0.03em' }}>
            Craft Spirits
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 4 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          style={{ marginTop: 5, color: 'rgba(255,255,255,0.42)', fontSize: 6.5, lineHeight: 1.6 }}
        >
          Award-winning spirits from<br />Sonoma Valley, CA.
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex gap-2"
          animate={{ opacity: phase >= 6 ? 1 : 0, y: phase >= 6 ? 0 : 3 }}
          transition={{ duration: 0.35 }}
          style={{ marginTop: 7 }}
        >
          <div
            style={{
              background: '#E9FF00',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 6,
              color: '#050816',
              fontWeight: 700,
            }}
          >
            Order Now
          </div>
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 20,
              padding: '3px 8px',
              fontSize: 6,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Learn More
          </div>
        </motion.div>

        {/* Product bottle (CSS-only) */}
        <motion.div
          className="absolute"
          style={{ top: 10, right: 10, width: 48, height: 74 }}
          animate={{ opacity: phase >= 7 ? 1 : 0, y: phase >= 7 ? 0 : 8 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(160deg, rgba(195,170,105,0.14) 0%, rgba(115,80,40,0.12) 100%)',
              borderRadius: 5,
              border: '1px solid rgba(195,170,105,0.12)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Neck */}
            <div
              style={{
                position: 'absolute',
                top: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 9,
                height: 9,
                background: 'rgba(195,170,105,0.38)',
                borderRadius: '2px 2px 0 0',
              }}
            />
            {/* Body */}
            <div
              style={{
                position: 'absolute',
                top: '24%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 22,
                height: 48,
                background: 'linear-gradient(180deg, rgba(175,148,88,0.5) 0%, rgba(115,82,46,0.4) 100%)',
                borderRadius: '3px 3px 4px 4px',
              }}
            >
              {/* Label */}
              <div
                style={{
                  position: 'absolute',
                  top: '26%',
                  left: '10%',
                  right: '10%',
                  height: '36%',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 1,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product cards row */}
      <motion.div
        className="flex gap-1 px-2.5 py-1.5"
        style={{ background: 'rgba(4,7,16,0.92)', flexShrink: 0 }}
        animate={{ opacity: phase >= 8 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {['Vodka', 'Gin', 'Mezcal'].map((name, i) => (
          <motion.div
            key={name}
            className="flex-1 flex flex-col items-center justify-center rounded"
            style={{
              height: 28,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              gap: 2,
            }}
            animate={{ opacity: phase >= 8 ? 1 : 0, y: phase >= 8 ? 0 : 5 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <div style={{ width: 3, height: 11, background: 'rgba(195,170,105,0.28)', borderRadius: 1 }} />
            <span style={{ fontSize: 4.5, color: 'rgba(255,255,255,0.3)' }}>{name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Live preview panel (right side of browser) ─────────── */
function LivePreview({ phase, cycleId }: { phase: number; cycleId: number }) {
  const showPreview = phase >= 3
  const isLive      = phase >= 9

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ background: '#060a18' }}>
      {/* Preview header bar */}
      <div
        className="flex items-center gap-2 px-3 shrink-0 select-none"
        style={{
          height: 26,
          background: '#0a0f1e',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          fontFamily: 'monospace',
          fontSize: 10,
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="relative" style={{ width: 7, height: 7 }}>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: '#28CA40' }}
              animate={{ scale: [1, 2.2, 2.2], opacity: [0.65, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 rounded-full" style={{ background: '#28CA40' }} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Preview</span>
        </div>
        <span className="ml-auto" style={{ color: 'rgba(255,255,255,0.18)', fontSize: 9 }}>
          hanson-landing
        </span>
      </div>

      {/* Content area — skeleton + preview crossfade */}
      <div className="relative flex-1 overflow-hidden">
        {/* Skeleton layer */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: showPreview ? 0 : 1 }}
          transition={{ duration: 0.55 }}
          style={{ pointerEvents: 'none' }}
        >
          <SkeletonView />
        </motion.div>

        {/* Live preview layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: showPreview ? 1 : 0,
            scale: isLive ? [1, 1.012, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.6, ease: 'easeOut' },
            scale:   { duration: 0.65, ease: 'easeOut' },
          }}
        >
          <PreviewWebsite phase={phase} />
        </motion.div>
      </div>

      {/* ● Live Updated badge */}
      <AnimatePresence>
        {isLive && (
          <motion.div
            key={`live-badge-${cycleId}`}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: 'rgba(40,202,64,0.11)',
              border: '1px solid rgba(40,202,64,0.28)',
              backdropFilter: 'blur(6px)',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="rounded-full"
              style={{ width: 5, height: 5, background: '#28CA40', flexShrink: 0 }}
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 8,
                color: '#28CA40',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}
            >
              Live Updated
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── VS Code editor — tabs + code only ───────────────────── */
function CodeEditor({ typing, saved, cycleId }: { typing: boolean; saved: boolean; cycleId: number }) {
  const controls    = useAnimation()
  const prevCycleId = useRef(cycleId)

  // New cycle: snap scroll back to top instantly
  useEffect(() => {
    if (cycleId !== prevCycleId.current) {
      controls.set({ y: 0 })
      prevCycleId.current = cycleId
    }
  }, [cycleId, controls])

  // Typing phase: scroll code down to simulate editing at the bottom
  useEffect(() => {
    if (typing) {
      controls.start({ y: -350, transition: { duration: 2.6, ease: [0.25, 0.1, 0.25, 1] } })
    }
  }, [typing, controls])

  return (
    <div className="flex flex-col h-full" style={{ background: '#06091a' }}>
      {/* Tab bar */}
      <div
        className="flex items-center select-none shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0a0f1e', height: 26 }}
      >
        <div
          className="flex items-center gap-1.5 px-4"
          style={{
            height: '100%',
            borderBottom: '1px solid #E9FF00',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: 10,
          }}
        >
          {!saved && <span style={{ color: '#E9FF00', fontSize: 7 }}>●</span>}
          page.tsx
        </div>
        {['layout.tsx', 'globals.css'].map(tab => (
          <div
            key={tab}
            className="px-4"
            style={{
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'monospace',
              fontSize: 10,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Code body — scrollable, driven by cycle */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          className="flex"
          style={{ paddingTop: 14, paddingBottom: 14 }}
          animate={controls}
        >
          {/* Line numbers */}
          <div
            className="select-none"
            style={{
              width: 34,
              paddingRight: 8,
              fontFamily: 'monospace',
              fontSize: 9.5,
              lineHeight: 1.72,
              background: '#070c1b',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.18)',
              flexShrink: 0,
              textAlign: 'right',
            }}
          >
            {CODE_LINES.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Syntax-highlighted code */}
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 9.5,
              lineHeight: 1.72,
              padding: '0 16px',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {CODE_LINES.map((line, i) => {
              if (line === 'blank') return <Blank key={i} />
              const isLast = i === CODE_LINES.length - 1
              return <Line key={i} tokens={line.tokens} indent={line.indent} cursor={isLast} />
            })}
          </div>
        </motion.div>

        {/* Bottom fade mask */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ height: 28, background: 'linear-gradient(0deg, #06091a, transparent)' }}
        />
      </div>
    </div>
  )
}

/* ── Full browser window ─────────────────────────────────── */
function BrowserWindow() {
  /* Cycle state — shared across editor, terminal, and preview */
  const [termLines, setTermLines] = useState<TermLine[]>([])
  const [cycleId, setCycleId]     = useState(0)
  const [typing,  setTyping]      = useState(false)
  const [saved,   setSaved]       = useState(false)
  const mountedRef = useRef(true)
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    mountedRef.current = true

    function push(t: ReturnType<typeof setTimeout>) {
      timersRef.current.push(t)
    }

    function clearTimers() {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }

    function runCycle() {
      if (!mountedRef.current) return
      clearTimers()
      // Reset all shared state for the new cycle
      setTermLines([])
      setCycleId(id => id + 1)
      setTyping(true)
      setSaved(false)

      // Phase 1: typing ends
      push(setTimeout(() => { if (mountedRef.current) setTyping(false) }, TYPING_END))
      // Phase 2: auto-save
      push(setTimeout(() => { if (mountedRef.current) setSaved(true) }, SAVE_AT))
      // Phase 3+: terminal build lines
      TERM_DELAYS.forEach((delay, i) => {
        push(setTimeout(() => {
          if (mountedRef.current) setTermLines(prev => [...prev, TERM_SEQ[i]])
        }, delay))
      })
      // End of cycle
      push(setTimeout(() => {
        if (mountedRef.current) push(setTimeout(runCycle, 300))
      }, TERM_CYCLE))
    }

    const init = setTimeout(runCycle, 1800)
    timersRef.current.push(init)

    return () => {
      mountedRef.current = false
      clearTimers()
    }
  }, [])

  const phase = termLines.length

  return (
    <div
      className="w-full overflow-hidden rounded-xl"
      style={{
        background: 'rgba(6,10,24,0.95)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow:
          '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(233,255,0,0.05)',
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-2.5 px-4 shrink-0"
        style={{
          height: 40,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(4,7,18,0.97)',
        }}
      >
        <div className="flex gap-1.5 shrink-0">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: '#28CA40' }} />
        </div>

        <div
          className="flex flex-1 items-center gap-2 rounded-md px-2.5"
          style={{
            height: 22,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="rounded-full shrink-0" style={{ width: 6, height: 6, background: '#28CA40', opacity: 0.7 }} />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: 'rgba(167,176,197,0.45)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            velix.studio / hanson-landing
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="relative shrink-0" style={{ width: 8, height: 8 }}>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: '#28CA40' }}
              animate={{ scale: [1, 2.2, 2.2], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 rounded-full" style={{ background: '#28CA40' }} />
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#28CA40', fontWeight: 600, letterSpacing: '0.05em' }}>
            Live
          </span>
        </div>

        <div className="flex gap-1.5 shrink-0 opacity-25">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-sm" style={{ width: 11, height: 11, background: 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>
      </div>

      {/* Editor + Preview split (60 / 40) */}
      <div className="flex" style={{ height: 262, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Left — VS Code editor */}
        <div style={{ width: '60%', borderRight: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          <CodeEditor typing={typing} saved={saved} cycleId={cycleId} />
        </div>

        {/* Right — Live preview */}
        <div style={{ width: '40%', overflow: 'hidden' }}>
          <LivePreview phase={phase} cycleId={cycleId} />
        </div>
      </div>

      {/* Terminal — full width */}
      <TerminalPanel lines={termLines} cycleId={cycleId} />

      {/* VS Code status bar */}
      <div
        className="flex items-center gap-4 px-3"
        style={{
          background: '#0d1525',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          height: 18,
          fontFamily: 'monospace',
          fontSize: 9,
        }}
      >
        <span style={{ color: '#E9FF00' }}>TypeScript</span>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>UTF-8</span>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>Ln 36, Col 2</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: '#28CA40' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>No errors</span>
        </div>
      </div>
    </div>
  )
}

/* ── Main hero illustration ──────────────────────────────── */
export function HeroIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)

  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-3, 3]), { stiffness: 50, damping: 28 })
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [2, -2]),  { stiffness: 50, damping: 28 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      rawX.set((e.clientX - rect.left  - rect.width  / 2) / rect.width)
      rawY.set((e.clientY - rect.top   - rect.height / 2) / rect.height)
    }
    const onLeave = () => { rawX.set(0); rawY.set(0) }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [rawX, rawY])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hi-browser',
        { opacity: 0, scale: 0.9, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 1.05, ease: 'power3.out', clearProps: 'all' },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto"
      style={{ perspective: '1400px' }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          style={{
            width: 600,
            height: 340,
            background: 'radial-gradient(ellipse, rgba(233,255,0,0.07) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-0.6, 0.6, -0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="hi-browser" style={{ opacity: 0 }}>
            <BrowserWindow />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
