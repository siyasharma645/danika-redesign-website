import Image from 'next/image';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { SITE, orig } from '@/data/site';
import { getImage } from '@/lib/images';
import { ButtonLink, buttonClasses } from '@/components/ui/Button';
import { HelpTrigger } from '@/components/help/HelpProvider';

const doors = [
  {
    title: 'Plumbing', href: orig('/plumbing-services/'), cta: 'All plumbing services',
    items: [
      { label: 'Emergency plumbing', href: orig('/24-hour-emergency-plumber-everett-wa/') },
      { label: 'Drain cleaning', href: orig('/drain-cleaning-everett-wa/') },
      { label: 'Water heaters', href: orig('/water-heaters-everett-wa/') },
    ],
  },
  {
    title: 'Electrical', href: orig('/electrician-everett-wa/'), cta: 'All electrical services',
    items: [
      { label: 'Panel upgrades', href: orig('/electrical-panel-upgrade-services/') },
      { label: 'EV charger installation', href: orig('/ev-charger-installation-services/') },
      { label: 'Electrical repair', href: orig('/electrical-repair-services/') },
    ],
  },
];

export function Hero() {
  const img = getImage('waterHeater');
  return (
    <section aria-labelledby="hero-title" className="relative isolate bg-ink text-white">
      {/* Photo: stacked above the text on phones, full-bleed behind it from lg up. Subject sits right; text sits on the scrim at left. */}
      <div className="relative h-56 sm:h-72 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" sizes="100vw" className="object-cover lg:object-[75%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/85 lg:to-ink/35" aria-hidden />
      </div>

      <div className="container-x pb-12 pt-6 lg:pb-24 lg:pt-28">
        <h1 id="hero-title" className="h1 rise max-w-4xl !text-white">
          <span className="block">Powering Your Home.</span>
          <span className="block">Keeping Things Flowing.</span>
          <span className="mt-5 block max-w-xl font-sans text-lg font-semibold leading-snug tracking-normal text-accent-400 [font-stretch:100%] sm:text-xl">
            Your Everett, WA plumber and electrician
          </span>
        </h1>
        <p className="rise mt-5 max-w-xl text-lg leading-relaxed text-white/85" style={{ animationDelay: '.08s' }}>
          Your trusted local experts for dependable plumbing and electrical services in Everett, WA. Serving Snohomish County and North King County since {SITE.founded}.
        </p>
        <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '.14s' }}>
          <ButtonLink href={SITE.phoneHref} size="lg" className="sm:min-w-[16rem]"><Phone className="h-5 w-5" aria-hidden /> Call Now · {SITE.phone}</ButtonLink>
          <HelpTrigger type="quote" className={buttonClasses('outline-light', 'lg')}>Request a Quote</HelpTrigger>
        </div>
        <p className="rise mt-5 flex items-center gap-2 text-sm text-white/85" style={{ animationDelay: '.2s' }}>
          <span className="flex gap-0.5" aria-hidden>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />)}</span>
          <span><strong className="text-white">{SITE.rating.value}</strong> on Google, {SITE.rating.label}</span>
        </p>
      </div>

      {/* Two doors: equal weight, equal size */}
      <div className="bg-brand-700">
        <div className="container-x grid md:grid-cols-2 md:divide-x md:divide-white/20">
          {doors.map((d, i) => (
            <div key={d.title} className={`py-7 sm:py-9 md:py-10 ${i === 0 ? 'border-b border-white/20 md:border-b-0 md:pr-10' : 'md:pl-10'}`}>
              <h2 className="h3 !text-white">{d.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-0.5">
                {d.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="inline-flex min-h-[44px] items-center text-[0.95rem] font-semibold text-white underline decoration-accent-500 decoration-2 underline-offset-4 hover:text-accent-400">{it.label}</a>
                  </li>
                ))}
              </ul>
              <a href={d.href} className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-accent-400 hover:text-accent-300">
                {d.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
