import { SITE } from '@/data/site';

const items = [
  { value: `Est. ${SITE.founded}`, label: 'Locally owned in Everett' },
  { value: `WA Lic. ${SITE.license}`, label: 'Verify on L&I', href: SITE.licenseUrl },
  { value: '24/7', label: 'A person answers' },
  { value: '1-year warranty', label: 'Parts and labor' },
  { value: `${SITE.rating.value} on Google`, label: SITE.rating.label },
];

export function TrustBar() {
  return (
    <section aria-label="Why customers trust Danika" className="border-t border-white/10 bg-ink">
      <ul className="no-scrollbar container-x flex snap-x gap-8 overflow-x-auto py-4 lg:justify-between lg:gap-4">
        {items.map(({ value, label, href }) => (
          <li key={value} className="shrink-0 snap-start leading-tight">
            <span className="block font-heading text-lg font-bold text-accent-500">{value}</span>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-sm font-medium text-accent-500 underline underline-offset-4 hover:text-accent-400 sm:min-h-0">
                {label}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="block text-sm text-accent-500">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
