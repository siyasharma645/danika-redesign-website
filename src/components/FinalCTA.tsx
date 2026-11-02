import { Clock, Mail, MapPin } from 'lucide-react';
import { SITE } from '@/data/site';
import { QuoteForm } from '@/components/QuoteForm';

export function FinalCTA() {
  return (
    <section id="quote" aria-labelledby="cta-title" className="grid lg:grid-cols-2">
      {/* Lane 1: emergency */}
      <div className="edge-l relative isolate overflow-hidden pad-y bg-brand-700 px-4 text-white sm:px-6 lg:pr-14">
        <h2 id="cta-title" className="h2 !text-white">Need plumbing or electrical assistance?</h2>
        <p className="mt-5 max-w-md text-lg text-white/85">Emergency? Call now. A person answers, day or night, every day of the year.</p>
        <a
          href={SITE.phoneHref}
          className="display mt-6 inline-flex min-h-[56px] items-center text-[clamp(2.6rem,8.5vw,4.75rem)] text-accent-400 underline decoration-2 underline-offset-8 hover:text-accent-300"
          aria-label={`Call ${SITE.phone}`}
        >
          {SITE.phone}
        </a>
        <ul className="mt-9 space-y-3 text-[0.95rem] text-white/85">
          <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-accent-400" aria-hidden /> Emergency plumbing available 24/7</li>
          <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-accent-400" aria-hidden /> {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}</li>
          <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-accent-400" aria-hidden /> <a href={`mailto:${SITE.email}`} className="underline-offset-4 hover:underline">{SITE.email}</a></li>
        </ul>
      </div>

      {/* Lane 2: quote */}
      <div className="edge-r pad-y relative bg-white px-4 sm:px-6 lg:pl-14">
        <h3 className="h3">Request a Quote</h3>
        <p className="mb-6 mt-3 max-w-md text-ink-soft">Not an emergency? Tell us what&rsquo;s going on and we&rsquo;ll reply with a written price before any work starts. Fields marked * are required.</p>
        <QuoteForm />
      </div>
    </section>
  );
}
