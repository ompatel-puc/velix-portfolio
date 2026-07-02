'use client'

import { motion } from 'framer-motion'

interface Snippet {
  code: string
  x: string; y: string
  dur: number; delay: number
  rotate: number
}

const SNIPPETS: Snippet[] = [
  { code: 'const ui = <Velix />',             x: '6%',  y: '12%', dur: 9,  delay: 0,   rotate: -2  },
  { code: 'npm install @velix/core',           x: '72%', y: '18%', dur: 11, delay: 1.5, rotate: 1   },
  { code: 'export default function Page()',    x: '3%',  y: '62%', dur: 8,  delay: 0.7, rotate: -1  },
  { code: 'theme: "premium" // 🔥',           x: '78%', y: '72%', dur: 10, delay: 2.2, rotate: 2   },
  { code: '@keyframes float { … }',            x: '42%', y: '88%', dur: 9,  delay: 0.4, rotate: 0   },
  { code: 'performance: 100',                  x: '58%', y: '7%',  dur: 12, delay: 1.1, rotate: -1  },
  { code: 'gsap.timeline({ ease: "expo" })',   x: '22%', y: '80%', dur: 10, delay: 1.8, rotate: 1   },
  { code: '// Crafted with ❤ by Velix',        x: '50%', y: '45%', dur: 14, delay: 3,   rotate: -2  },
]

export function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" style={{ zIndex: 1 }}>
      {SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[9px] text-white/[0.07] whitespace-nowrap"
          style={{ left: s.x, top: s.y, rotate: s.rotate }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          {s.code}
        </motion.div>
      ))}
    </div>
  )
}
