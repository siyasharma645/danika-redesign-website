import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { orig } from '@/data/site';
import { getImage } from '@/lib/images';
import { ButtonLink } from '@/components/ui/Button';
import { CarouselControls } from '@/components/CarouselControls';
import { Reveal } from '@/components/ui/Reveal';

export function ProjectsSection() {
  const [lead, ...rest] = projects;
  const lImg = getImage(lead.image);
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Real jobs, real photos</p>
            <h2 id="projects-title" className="h2 max-w-3xl">Recent Plumbing Projects Around Snohomish County</h2>
            <p className="lead mt-5">Not stock photos. Each write-up covers what the homeowner called about, what we found, how we fixed it and how it looks now.</p>
          </div>
          <ButtonLink href={orig('/projects/')} variant="secondary" className="self-start lg:self-auto">See all projects <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
        </div>

        {/* Featured project: wide image, text panel overlapping its lower corner */}
        <Reveal><article className="group relative mt-10 lg:mb-14 lg:mt-14">
          <a href={lead.href} aria-label={`${lead.title}, ${lead.place}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/9] lg:aspect-[2/1]">
              <Image src={lImg.src} alt={lImg.alt} fill loading="lazy" sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            </div>
            <div className="bg-ink p-6 text-white sm:p-8 lg:absolute lg:-bottom-10 lg:right-8 lg:w-[28rem] lg:bg-brand-700 lg:p-9">
              <p className="text-sm font-bold text-accent-400">{lead.type}</p>
              <p className="text-sm text-white/75">{lead.place}</p>
              <h3 className="h3-compact mt-3 !text-white">{lead.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/80">{lead.text}</p>
              <span className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-bold text-accent-400">Read the project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
            </div>
          </a>
        </article></Reveal>

        {/* Three equal thumbnails: snap carousel below lg, grid from lg */}
        <ul id="projects-track" tabIndex={0} aria-label="More projects. Scroll horizontally to see more." className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0">
          {rest.map((p) => {
            const img = getImage(p.image);
            return (
              <li key={p.href} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
                <article className="group h-full">
                  <a href={p.href} aria-label={`${p.title}, ${p.place}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
                      <Image src={img.src} alt={img.alt} fill loading="lazy" sizes="(min-width: 1024px) 400px, 82vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    </div>
                    <p className="mt-4 text-sm font-bold text-brand-700">{p.type}</p>
                    <p className="text-sm text-ink-soft">{p.place}</p>
                    <h3 className="h4 mt-2 line-clamp-2 decoration-accent-500 decoration-2 underline-offset-4 group-hover:underline">{p.title}</h3>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
        <CarouselControls targetId="projects-track" label="projects" className="mt-5 lg:hidden" />
      </div>
    </section>
  );
}
