import { processSteps } from '@/data/services';
import { SITE, orig } from '@/data/site';
import { Timeline } from '@/components/Timeline';

const reasons = [
  { title: 'A local company.', text: `Our shop is at ${SITE.address.street} in Everett, not a regional dispatch center.`, link: { href: orig('/about-us/'), label: 'About our company' } },
  { title: 'A written price before work starts.', text: 'No scripted upsell. If a cheaper repair will hold, you will hear about it.' },
  { title: 'One-year parts and labor warranty.', text: 'We stand behind our work and the products we install.' },
  { title: 'Emergency plumbing, 24/7.', text: 'Available 24 hours a day, 7 days a week, across our whole service area.' },
  { title: 'Plumbing and electrical in-house.', text: 'One call, one dispatcher and one invoice.' },
];

export function WhyChooseUs() {
  return (
    <section id="why-danika" aria-labelledby="why-title" className="section bg-ink text-white">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow !text-accent-400">Why people call us a second time</p>
          <h2 id="why-title" className="h2 !text-white">Why Everett Homeowners Choose Danika Plumbing & Electric</h2>
          <ul className="mt-9 divide-y divide-white/15 border-y border-white/15">
            {reasons.map((r) => (
              <li key={r.title} className="py-4">
                <p className="text-base leading-snug"><strong className="font-heading text-lg text-white">{r.title}</strong> <span className="text-white/70">{r.text}</span></p>
                {r.link && <a href={r.link.href} className="mt-1 inline-flex min-h-[44px] items-center text-sm font-bold text-accent-400 underline underline-offset-4">{r.link.label}</a>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-accent-400">The Danika way</p>
          <h3 className="h3 mb-10 !text-white lg:mb-12">From your first call to finished work</h3>
          <Timeline steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
