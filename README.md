# Danika Plumbing & Electric: Homepage Redesign

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Lucide React · `next/image`

A redesigned homepage for https://danikaplumbing.com/. All business facts (phone, address, license, services,
reviews, projects, FAQs, 25 service cities) come from the live site and live in `src/data/`.

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure
```
src/app            layout (metadata), page, sitemap.ts, robots.ts, api/lead (form endpoint)
src/components     Header, MobileNavigation, Hero, TrustBar, ProblemCards, ServiceCards, WhyChooseUs,
                   AboutSection, ProjectsSection, Testimonials, ServiceAreas, FAQ, QuoteForm, FinalCTA,
                   Footer, MobileCallBar, JsonLd, ui/{Button,Reveal,SectionHeading}
src/data           site, nav, services, reviews, projects, faqs, areas, images.json
tailwind.config.ts design tokens (colours, fonts, radii, shadows)
```

## Contact popup and help widget
Every contact, quote and schedule button (header "Get Help Now" and "Contact", hero "Request a Quote", mobile "Get a Quote",
"Book online", footer "Contact Us") opens one popup form (`src/components/help/HelpProvider.tsx`) instead of linking to the
original site. The floating "Need help?" button (`HelpWidget.tsx`) offers Start Quote Online, Schedule Service, Request a Call,
Call Contractor (dials) and Message Us. Request types are `help | quote | schedule | callback | message`; they are validated in
`src/lib/validation.ts` and sent to `/api/lead`, which forwards `type`, `source` and the optional preferred date/time to `LEAD_WEBHOOK_URL`.
Until that variable is set the form says nothing was sent and shows the phone number.

## Things you MUST review before launch
1. **Brand palette (done).** Official colours live as CSS variables in `src/app/globals.css` (`:root`) and are wired into
   `tailwind.config.ts`: red #83040A (`brand-700`), yellow #E9BF15 (`accent-500`), charcoal #252525 (`ink`),
   off-white #F5F5F4 (`paper`). Rules: red = header/hero/links on light, yellow = call-to-action buttons and highlights,
   charcoal = footer, electrical panel and body text. All text pairs meet WCAG AA (lowest real-text ratio 5.7:1).
   Logo assets are in `public/brand/` (transparent PNGs derived from the supplied file, made for red/charcoal backgrounds).
   Favicon (`src/app/icon.png`, `apple-icon.png`) is the "dp" monogram; the social share image is `public/og.png`.
2. **Form delivery needs integration.** `/api/lead` validates and honeypots, then forwards JSON to `LEAD_WEBHOOK_URL`.
   Until that is set, the form tells visitors nothing was sent and shows the phone number. Add CAPTCHA
   (e.g. Cloudflare Turnstile) and rate limiting; the original form used CAPTCHA.
3. **Images.** Genuine Danika photos load from danikaplumbing.com by default. For production run `npm run images:fetch`, then set
   `NEXT_PUBLIC_LOCAL_IMAGES=1` so Next.js self-hosts and optimises them. **Electrical photography is the only gap**: add
   licensed stock via the slot system in `STOCK_IMAGES.md` (`npm run images:stock`). Stock photos are always labelled
   "Stock photo · not a Danika project" and are never used in the Projects section.
4. **Links** go to the original site's existing pages (this redesign covers the homepage only).
5. **Canonical/domain.** Set `NEXT_PUBLIC_SITE_URL`. If this replaces the old site, keep `https://danikaplumbing.com`.
6. **Copy decisions.** "Request a Quote" is used instead of "Free Quote" because the business does not state quotes are
   free on its own site. Confirm and change if true. Reviews are as posted (light punctuation tidy, ellipses where trimmed).
7. **Schema** deliberately omits aggregateRating, opening hours and priceRange (not verifiable/appropriate).
   Add them if the business confirms them. Add your Google Search Console verification tag in `layout.tsx` metadata.

## Deploy to Vercel
1. Push to GitHub. 2. vercel.com → Add New Project → import the repo (framework auto-detected).
3. Add env vars from `.env.example`. 4. Deploy, then attach the domain and submit `/sitemap.xml` to Search Console.

## Accessibility & performance notes
Skip link, keyboard-operable dropdowns (Esc closes), ARIA accordion, labelled form with inline errors,
`prefers-reduced-motion` respected, content visible without JS, 44px touch targets, fonts self-hosted
(Fontsource), only one hero image is prioritised, everything else lazy-loads, ~118 kB first-load JS.
Run Lighthouse on the deployed URL to confirm Core Web Vitals with real images.
