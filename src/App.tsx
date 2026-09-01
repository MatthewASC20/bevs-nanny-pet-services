import * as React from 'react';
import { Footer, Lightbox, Nav, useRevealObserver } from '@bevs/design-system';
import { useContent } from './content/useContent';
import { useDocumentMeta } from './content/useDocumentMeta';
import { LoadErrorToast } from './components/LoadErrorToast';
import { RenderErrorBoundary } from './components/RenderErrorBoundary';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ChildrenSection } from './sections/ChildrenSection';
import { PetsSection } from './sections/PetsSection';
import { SkillsSection } from './sections/SkillsSection';
import { TestimonialSection } from './sections/TestimonialSection';
import { PaymentSection } from './sections/PaymentSection';
import type { GalleryState } from './gallery';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#children', label: 'Children' },
  { href: '#pets', label: 'Pets' },
  { href: '#skills', label: 'Skills' },
  { href: '#kind-words', label: 'Kind words' },
];

export function App() {
  const state = useContent();
  const content = state.status === 'ready' ? state.content : undefined;
  useDocumentMeta(content?.site);
  // One-shot scroll reveals, armed once the sections exist in the DOM.
  useRevealObserver(state.status === 'ready');
  const [gallery, setGallery] = React.useState<GalleryState | null>(null);

  const brand = content?.brand ?? {};
  const footer = content?.footer ?? {};

  return (
    <>
      <Nav
        brandName={brand.name ?? ''}
        brandTagline={brand.tagline}
        links={NAV_LINKS}
        cta={{ href: '#contact', label: 'Get in touch' }}
      />
      <main id="top">
        {content ? (
          <RenderErrorBoundary>
            <HeroSection hero={content.hero ?? {}} />
            <AboutSection about={content.about ?? {}} />
            <ServicesSection data={content.services ?? {}} />
            <ExperienceSection data={content.experience ?? {}} />
            <ChildrenSection data={content.children ?? {}} onOpen={setGallery} />
            <PetsSection data={content.pets ?? {}} onOpen={setGallery} />
            <SkillsSection data={content.skills ?? {}} />
            <TestimonialSection data={content.testimonial ?? {}} />
            <PaymentSection data={content.payment ?? {}} />
          </RenderErrorBoundary>
        ) : null}
      </main>
      <Footer
        brandName={brand.name ?? ''}
        brandTagline={brand.tagline}
        tagline={footer.tagline}
        phone={footer.phone}
        phoneHref={footer.phoneHref}
        email={footer.email}
        location={footer.location}
        copyrightName={footer.copyrightName}
        madeWith={footer.madeWith}
      />
      {state.status === 'error' ? <LoadErrorToast message={state.message} /> : null}
      <Lightbox
        open={!!gallery}
        onClose={() => setGallery(null)}
        items={gallery?.photos ?? []}
        name={gallery?.name ?? ''}
        alt={gallery?.alt}
      />
    </>
  );
}
