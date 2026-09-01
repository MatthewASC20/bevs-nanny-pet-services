import * as React from 'react';
import { AboutBody, AboutCard, Section, Wrap } from '@bevs/design-system';
import type { AboutData } from '../content/types';

export function AboutSection({ about }: { about: AboutData }) {
  return (
    <Section id="about" className="about">
      <Wrap className="about-grid">
        <AboutCard className="reveal" quote={about.quote ?? ''} cite={about.quoteCite} />
        <AboutBody
          className="reveal d1"
          eyebrow={about.eyebrow}
          heading={about.heading ?? ''}
          lead={about.lead}
          paragraphs={about.paragraphs}
        />
      </Wrap>
    </Section>
  );
}
