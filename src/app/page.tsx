import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ProblemCards } from '@/components/ProblemCards';
import { ServiceCards } from '@/components/ServiceCards';
import { Statement } from '@/components/Statement';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Testimonials } from '@/components/Testimonials';
import { ServiceAreas } from '@/components/ServiceAreas';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { JsonLd } from '@/components/JsonLd';

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd />
      <Hero />
      <TrustBar />
      <ProblemCards />
      <ServiceCards />
      <Statement />
      <WhyChooseUs />
      <ProjectsSection />
      <AboutSection />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
