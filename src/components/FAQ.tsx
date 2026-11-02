'use client';

import { useId, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { electricalFaqs, faqs, type FaqCategory } from '@/data/faqs';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

const tabs: { id: FaqCategory; label: string }[] = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
];

export function FAQ() {
  const base = useId();
  const [category, setCategory] = useState<FaqCategory>('plumbing');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const list = category === 'plumbing' ? faqs : electricalFaqs;

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Asked on the phone every week" title={<span id="faq-title">Plumbing and Electrical Questions from Everett Homeowners</span>}>
            Straight answers about emergencies, pricing, water heaters, older pipes and electrical work.
          </SectionHeading>
          <div className="mt-7 border-l-4 border-accent-500 bg-ink p-6 text-white">
            <p className="font-heading text-lg font-bold">Still have a question?</p>
            <p className="mt-1 text-sm text-white/80">A person at our Everett office answers, day or night.</p>
            <ButtonLink href={SITE.phoneHref} className="mt-4 w-full sm:w-auto"><Phone className="h-4 w-4" aria-hidden /> {SITE.phone}</ButtonLink>
          </div>
        </div>

        <div>
          <div role="group" aria-label="Question category" className="mb-5 flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={category === t.id}
                onClick={() => { setCategory(t.id); setOpenIndex(0); }}
                className={cn('min-h-[44px] flex-1 rounded-btn border-2 px-5 font-heading text-lg font-bold transition-colors sm:flex-none sm:min-w-[9rem]', category === t.id ? 'border-ink bg-ink text-white' : 'border-ink text-ink hover:bg-white')}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="divide-y divide-line border-y-2 border-ink">
            {list.map((f, i) => {
              const open = openIndex === i;
              const btnId = `${base}-${category}-q${i}`;
              const panelId = `${base}-${category}-a${i}`;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      id={btnId} type="button" aria-expanded={open} aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 px-1 py-4 text-left font-heading text-lg font-bold leading-snug transition-colors hover:text-brand-700"
                    >
                      <span>{f.q}</span>
                      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-200', open ? 'bg-ink text-white' : 'text-brand-700')}>
                        <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <p className="px-1 pb-6 pr-12 text-[0.98rem] leading-relaxed text-ink-soft sm:pr-14" inert={!open}>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
