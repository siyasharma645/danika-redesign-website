'use client';

import { HelpTrigger } from '@/components/help/HelpProvider';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, Phone, X, Mail, MapPin, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import { aboutNav, electricalAll, electricalNav, plumbingAll, plumbingNav, topLinks, type NavLink } from '@/data/nav';
import Image from 'next/image';
import { LOGO } from '@/lib/brand';
import { cn } from '@/lib/utils';
import { buttonClasses } from '@/components/ui/Button';
import { MobileNavigation } from '@/components/MobileNavigation';

type MenuId = 'plumbing' | 'electrical' | 'about';

/** Shared nav item: a thin yellow underline slides in on hover, focus and while its menu is open. */
const navItem =
  'relative inline-flex min-h-[44px] items-center gap-1 rounded-btn px-3 py-2 text-[0.95rem] font-semibold text-white transition-colors hover:text-accent-400 after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent-500 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100';

function DropdownItem({
  id, label, open, setOpen, children, panelClass,
}: {
  id: MenuId; label: string; open: MenuId | null; setOpen: (m: MenuId | null) => void;
  children: React.ReactNode; panelClass?: string;
}) {
  const isOpen = open === id;
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(id)}
      onMouseLeave={() => setOpen(null)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null); }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`menu-${id}`}
        onClick={() => setOpen(isOpen ? null : id)}
        className={cn(navItem, isOpen && 'text-accent-400 after:scale-x-100')}
      >
        {label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')} aria-hidden />
      </button>
      {isOpen && (
        <div id={`menu-${id}`} className={cn('absolute left-0 top-full z-50 pt-2 animate-fade-down', panelClass)}>
          <div className="rounded-card border border-line bg-white p-2 shadow-lift">{children}</div>
        </div>
      )}
    </li>
  );
}

function LinkList({ links, all, cols = 1 }: { links: NavLink[]; all?: NavLink; cols?: 1 | 2 }) {
  return (
    <>
      <ul className={cn('grid gap-x-2', cols === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
        {links.map((l) => (
          <li key={l.href + l.label}>
            <a href={l.href} className="block rounded-btn px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      {all && (
        <a href={all.href} className="mt-2 flex items-center gap-2 rounded-btn border-t border-line px-3 pb-2 pt-3 text-sm font-bold text-brand-700 hover:text-brand-800">
          {all.label} <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      )}
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobileOpen(false); } };
    const onClick = (e: MouseEvent) => { if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[70] focus:rounded-btn focus:bg-accent-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink">Skip to content</a>
      <div className="hidden bg-ink text-[0.8rem] text-white/80 lg:block">
        <div className="container-x flex items-center justify-between py-2">
          <p className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent-400" aria-hidden />{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}</span>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-4 w-4 text-accent-400" aria-hidden />{SITE.email}</a>
          </p>
          <p className="inline-flex items-center gap-1.5 font-semibold text-white"><Clock className="h-4 w-4 text-accent-400" aria-hidden />24/7 emergency plumbing</p>
        </div>
      </div>

      <header ref={headerRef} className="sticky top-0 z-50 border-b border-black/25 bg-brand-700 text-white shadow-[0_6px_20px_-12px_rgba(0,0,0,.5)]">
        <div className="container-x flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
          <a href="/" aria-label={`${SITE.name} home`} className="shrink-0">
            <Image src={LOGO.wordmark.src} alt={LOGO.wordmark.alt} width={LOGO.wordmark.width} height={LOGO.wordmark.height} priority sizes="150px" className="h-[52px] w-auto lg:h-[64px]" />
          </a>

          <nav aria-label="Primary" className="hidden lg:mr-auto lg:ml-6 lg:block xl:ml-12">
            <ul className="flex items-center gap-1">
              <DropdownItem id="plumbing" label="Plumbing" open={open} setOpen={setOpen} panelClass="w-[34rem]">
                <LinkList links={plumbingNav} all={plumbingAll} cols={2} />
              </DropdownItem>
              <DropdownItem id="electrical" label="Electrical" open={open} setOpen={setOpen} panelClass="w-72">
                <LinkList links={electricalNav} all={electricalAll} />
              </DropdownItem>
              <DropdownItem id="about" label="About" open={open} setOpen={setOpen} panelClass="w-60">
                <LinkList links={aboutNav} />
              </DropdownItem>
              <li><a href={topLinks.serviceAreas.href} className={navItem}>{topLinks.serviceAreas.label}</a></li>
              <li><HelpTrigger type="message" className={navItem}>{topLinks.contact.label}</HelpTrigger></li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={SITE.phoneHref} className="hidden items-center gap-2.5 rounded-btn px-2 py-1 xl:flex" aria-label={`Call ${SITE.phone}`}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-ink"><Phone className="h-5 w-5" aria-hidden /></span>
              <span className="leading-tight">
                <span className="block text-[0.7rem] font-bold uppercase tracking-wider text-white/75">Call 24/7</span>
                <span className="block text-lg font-bold text-white">{SITE.phone}</span>
              </span>
            </a>
            <a href={SITE.phoneHref} className="grid h-11 w-11 place-items-center rounded-btn bg-accent-500 text-ink xl:hidden" aria-label={`Call ${SITE.phone}`}>
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <HelpTrigger type="help" className={buttonClasses('primary', 'md', 'hidden lg:inline-flex')}>{topLinks.quote.label}</HelpTrigger>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-btn border border-white/40 text-white lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
      </header>
      {/* Rendered outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
