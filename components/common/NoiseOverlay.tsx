/* Fixed SVG grain texture overlay — adds film-like depth across entire page */
export function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 9000, opacity: 0.024, mixBlendMode: 'overlay' }}
    >
      <filter id="velix-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#velix-noise)" />
    </svg>
  )
}
