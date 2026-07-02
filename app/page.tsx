import dynamic from 'next/dynamic'
import { HeroSection }     from '@/sections/HeroSection'
import { AboutSection }    from '@/sections/AboutSection'
import { ServicesSection } from '@/sections/ServicesSection'
import { ContactSection }  from '@/sections/ContactSection'
import { Footer }          from '@/components/layout/Footer'
import { SectionDivider }  from '@/components/common/SectionDivider'
import { GoToTop }         from '@/components/common/GoToTop'

/* Heavy sections — split off the initial bundle */
const WhyChooseSection = dynamic(
  () => import('@/sections/WhyChooseSection').then((m) => ({ default: m.WhyChooseSection })),
)
const PortfolioSection = dynamic(
  () => import('@/sections/PortfolioSection').then((m) => ({ default: m.PortfolioSection })),
)
const TechUniverseSection = dynamic(
  () => import('@/sections/TechUniverseSection').then((m) => ({
    default: m.TechUniverseSection,
  })),
)
const ProcessSection = dynamic(
  () => import('@/sections/ProcessSection').then((m) => ({ default: m.ProcessSection })),
)
const TestimonialsSection = dynamic(
  () => import('@/sections/TestimonialsSection').then((m) => ({
    default: m.TestimonialsSection,
  })),
)
const ClosingCTASection = dynamic(
  () => import('@/sections/ClosingCTASection').then((m) => ({
    default: m.ClosingCTASection,
  })),
)

export default function Home() {
  return (
    <>
      {/* Above the fold */}
      <HeroSection />
      <AboutSection />

      <SectionDivider />

      <PortfolioSection />

      <SectionDivider />

      <ServicesSection />
      <WhyChooseSection />

      <SectionDivider />

      <TechUniverseSection />
      <ProcessSection />

      <SectionDivider />

      <TestimonialsSection />
      <ContactSection />

      {/* Emotional closing section */}
      <ClosingCTASection />

      <Footer />

      {/* Floating go-to-top button */}
      <GoToTop />
    </>
  )
}
