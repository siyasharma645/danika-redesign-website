'use client';

import { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { electricalProblems, problems, type ProblemRow } from '@/data/services';
import { SITE, orig } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink, buttonClasses } from '@/components/ui/Button';
import { HelpTrigger } from '@/components/help/HelpProvider';
import { Reveal } from '@/components/ui/Reveal';

const plumbingRows: ProblemRow[] = [
  'Burst Pipe or Active Leak', 'No Hot Water', 'Clogged or Slow Drain',
  'Sewer Smell or Backup', 'Hidden Leak or High Water Bill', 'Low Water Pressure',
].map((t) => {
  const p = problems.find((x) => x.title === t)!;
  return { title: p.title, text: p.text, cta: p.cta, href: p.href, emergency: t.startsWith('Burst') };
});

/** One red highlight across both columns; it follows whichever row is hovered, focused or tapped. The first plumbing row is highlighted until another is chosen. */
function Group({ id, active, onSelect, title, intro, rows, all }: { id: string; active: string; onSelect: (key: string) => void; title: string; intro: string; rows: ProblemRow[]; all: { href: string; label: string } }) {
  return (
    <div>
      <h3 className="h3">{title}</h3>
      <p className="mt-2 text-ink-soft">{intro}</p>
      <ul className="mt-6 border-t-2 border-ink">
        {rows.map((r, i) => {
          const key = `${id}-${i}`;
          const on = key === active;
          return (
            <li key={r.title} className="border-b border-line">
              <a
                href={r.href}
                onMouseEnter={() => onSelect(key)}
                onFocus={() => onSelect(key)}
                onTouchStart={() => onSelect(key)}
                className={`group flex min-h-[64px] items-center justify-between gap-4 px-4 py-4 transition-colors duration-200 ${on ? 'bg-brand-700 text-white' : 'text-ink'}`}
              >
                <span>
                  <span className={`h4 block ${on ? 'text-white' : ''}`}>{r.title}</span>
                  <span className={`mt-1 block text-sm leading-snug ${on ? 'text-white/85' : 'text-ink-soft'}`}>{r.text}</span>
                </span>
                <ArrowRight className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${on ? 'text-accent-400' : 'text-brand-700'}`} aria-hidden />
                <span className="sr-only">{r.cta}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <a href={all.href} className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-bold text-brand-700 underline decoration-accent-500 decoration-2 underline-offset-4">
        {all.label} <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}

export function ProblemCards() {
  const [active, setActive] = useState('plumbing-0');
  return (
    <section id="problems" aria-labelledby="problems-title" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="What's going on at your place?" title={<span id="problems-title">Find Your Plumbing or Electrical Problem</span>}>
          Pick the one that sounds like yours. Every visit starts with a diagnosis and a written price, never a guess.
        </SectionHeading>

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <Reveal><Group id="plumbing" active={active} onSelect={setActive} title="Plumbing" intro="Water that will not drain, will not stop, or will not run hot." rows={plumbingRows} all={{ href: orig('/plumbing-services/'), label: 'All plumbing services' }} /></Reveal>
          <Reveal delay={120}><Group id="electrical" active={active} onSelect={setActive} title="Electrical" intro="Power that trips, flickers or fails, and upgrades for modern loads." rows={electricalProblems} all={{ href: orig('/electrician-everett-wa/'), label: 'All electrical services' }} /></Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.95rem] text-ink-soft">
            <strong className="font-heading text-lg text-ink">Not sure which one it is?</strong>{' '}
            Describe what you see and we will point you to the right visit.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={SITE.phoneHref}><Phone className="h-4 w-4" aria-hidden /> Call {SITE.phone}</ButtonLink>
            <HelpTrigger type="schedule" className={buttonClasses('secondary')}>Book online</HelpTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
