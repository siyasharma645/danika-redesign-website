import { ArrowRight, Phone } from 'lucide-react';
import { electricalServices, morePlumbing, plumbingServices } from '@/data/services';
import { SITE, orig } from '@/data/site';
import { ButtonLink } from '@/components/ui/Button';
import { StockImage } from '@/components/StockImage';

type Link = { title: string; href: string };

/** One service showcase. Both bands share this layout so plumbing and electrical stay visually balanced. */
function Band({ title, intro, services, more, moreLabel, dark, media, cta, ctaHref, children }: {
  title: string; intro: string; services: Link[]; more: Link[]; moreLabel: string; dark?: boolean;
  media: React.ReactNode; cta: string; ctaHref: string; children?: React.ReactNode;
}) {
  return (
    <div className={`${dark ? 'bg-ink text-white lg:grid-cols-[1fr_1.15fr]' : 'bg-white lg:grid-cols-[1.15fr_1fr]'} lg:grid`}>
      <div className={`relative h-64 sm:h-80 lg:h-auto lg:min-h-[34rem] ${dark ? 'lg:order-2' : ''}`}>{media}</div>
      <div className={`px-4 py-12 sm:px-6 lg:py-16 ${dark ? 'edge-l lg:pr-14' : 'edge-r lg:pl-14'}`}>
        <h3 className={`h2 ${dark ? '!text-white' : ''}`}>{title}</h3>
        <p className={`mt-3 max-w-md ${dark ? 'text-white/75' : 'text-ink-soft'}`}>{intro}</p>
        <ul className={`mt-7 divide-y border-t-2 ${dark ? 'divide-white/15 border-white/40' : 'divide-line border-ink'}`}>
          {services.map((s) => (
            <li key={s.title}>
              <a href={s.href} className="group flex min-h-[60px] items-center justify-between gap-4 py-3.5">
                <span className="h4 decoration-accent-500 decoration-2 underline-offset-4 group-hover:underline">{s.title}</span>
                <ArrowRight className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${dark ? 'text-accent-400' : 'text-brand-700'}`} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctaHref} variant={dark ? 'primary' : 'brand'}>{cta} <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
          <ButtonLink href={SITE.phoneHref} variant={dark ? 'outline-light' : 'secondary'}><Phone className="h-4 w-4" aria-hidden /> {SITE.phone}</ButtonLink>
        </div>
        <details className="group mt-6">
          <summary className={`inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-sm font-bold ${dark ? 'text-accent-400' : 'text-brand-700'} [&::-webkit-details-marker]:hidden`}>
            {moreLabel} <span className="transition-transform group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {more.map((m) => (
              <li key={m.title}><a href={m.href} className={`inline-flex min-h-[44px] items-center text-[0.95rem] hover:underline ${dark ? 'text-white/85' : 'text-ink-soft hover:text-brand-700'}`}>{m.title}</a></li>
            ))}
          </ul>
        </details>
        {children}
      </div>
    </div>
  );
}

export function ServiceCards() {
  const pick = (list: Link[], n: number) => list.slice(0, n);
  return (
    <section id="services" aria-labelledby="services-title">
      <div className="container-x pb-10 pt-14 sm:pt-16 md:pt-20 lg:pb-14 lg:pt-24">
        <h2 id="services-title" className="h2 max-w-4xl">Plumbing and Electrical, One Call</h2>
        <p className="lead mt-5">The leak under the sink and the dead outlet beside it are one call, one dispatcher and one invoice.</p>
      </div>

      <Band
        title="Plumbing" intro="Diagnosis first, a written price second, then the repair."
        services={pick(plumbingServices, 5)} more={[...plumbingServices.slice(5), ...morePlumbing]} moreLabel="More plumbing services"
        media={<StockImage slot="plumberUnderSink" sizes="(min-width: 1024px) 55vw, 100vw" position="center 60%" className="absolute inset-0" />}
        cta="All plumbing services" ctaHref={orig('/plumbing-services/')}
      />
      <Band
        dark title="Electrical" intro="Danika is also a licensed electrical contractor, alongside our plumbing team."
        services={pick(electricalServices, 5)} more={electricalServices.slice(5)} moreLabel="More electrical services"
        media={<StockImage slot="electricianWiring" sizes="(min-width: 1024px) 55vw, 100vw" position="center 40%" className="absolute inset-0" />}
        cta="All electrical services" ctaHref={orig('/electrician-everett-wa/')}
      >
        <p className="mt-6 border-l-4 border-accent-500 pl-4 text-sm leading-relaxed text-white/85">
          <strong className="font-heading text-base text-white">Water near wiring?</strong> Our emergency electricians can make it safe on the same call.
        </p>
      </Band>
    </section>
  );
}
