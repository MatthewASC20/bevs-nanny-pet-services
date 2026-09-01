import * as React from 'react';
import { Section, SectionHead, Timeline, TimelineItem, Wrap } from '@bevs/design-system';
import type { ExperienceItem, SectionIntro } from '../content/types';

export function ExperienceSection({ data }: { data: SectionIntro & { items?: ExperienceItem[] } }) {
  return (
    <Section id="experience" className="experience">
      <Wrap>
        <SectionHead className="reveal" center eyebrow={data.eyebrow ?? ''} heading={data.heading ?? ''} intro={data.intro} />
        <Timeline>
          {(data.items ?? []).map((it, i) => (
            <TimelineItem
              key={i}
              className="reveal"
              years={it.years ?? ''}
              role={it.role ?? ''}
              family={it.family ?? ''}
              location={it.location}
              current={it.current}
              description={it.description}
            />
          ))}
        </Timeline>
      </Wrap>
    </Section>
  );
}
