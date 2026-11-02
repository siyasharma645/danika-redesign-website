'use client';

import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import { aboutNav, electricalAll, electricalNav, plumbingAll, plumbingNav, topLinks, type NavLink } from '@/data/nav';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { HelpTrigger } from '@/components/help/HelpProvider';

function Group({ id, label, links, all, onNavigate }: { id: string; label: string; links: NavLink[]; all?: NavLink; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-between text-left text-lg font-bold"
        aria-expanded={open}
        aria-controls={`m-${id}`}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', open && 'rotate-180')} aria-hidden />
      </button>
      <div id={`m-${id}`} className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <ul className="pb-3" inert={!open}>
            {[...links, ...(all ? [all] : [])].map((l) => (
              <li key={l.href + l.label}>
                <a href={l.href} onClick={onNavigate} className="flex min-h-[44px] items-center rounded-btn px-3 text-[0.95rem] font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-nav"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        'fixed inset-x-0 bottom-0 top-[72px] z-[45] overflow-y-auto overscroll-contain bg-white transition-[opacity,transform,visibility] duration-300 ease-out lg:hidden',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0',
      )}
    >
      <nav aria-label="Mobile" className="container-x pb-10 pt-2">
        <Group id="plumbing" label="Plumbing Services" links={plumbingNav} all={plumbingAll} onNavigate={onClose} />
        <Group id="electrical" label="Electrical Services" links={electricalNav} all={electricalAll} onNavigate={onClose} />
        <Group id="about" label="About" links={aboutNav} onNavigate={onClose} />
        <a href={topLinks.serviceAreas.href} onClick={onClose} className="flex min-h-[56px] items-center border-b border-line text-lg font-bold">{topLinks.serviceAreas.label}</a>
        <HelpTrigger type="message" onClick={onClose} className="flex min-h-[56px] items-center border-b border-line text-lg font-bold">{topLinks.contact.label}</HelpTrigger>

        <div className="mt-6 grid gap-3">
          <a href={SITE.phoneHref} className={buttonClasses('primary', 'lg', 'w-full')}>
            <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phone}
          </a>
          <HelpTrigger type="help" onClick={onClose} className={buttonClasses('brand', 'lg', 'w-full')}>{topLinks.quote.label}</HelpTrigger>
          <p className="text-center text-sm text-ink-soft">Emergency plumbing available 24/7</p>
        </div>
      </nav>
    </div>
  );
}
