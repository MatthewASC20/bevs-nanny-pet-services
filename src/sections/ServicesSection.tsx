import * as React from 'react';
import { Grid, Section, SectionHead, ServiceCard, Wrap, revealDelay } from '@bevs/design-system';
import { iconName } from '../content/photoPaths';
import type { SectionIntro, ServiceItem } from '../content/types';

export function ServicesSection({ data }: { data: SectionIntro & { items?: ServiceItem[] } }) {
  return (
    <Section id="services">
      <Wrap>
        <SectionHead className="reveal" center eyebrow={data.eyebrow ?? ''} heading={data.heading ?? ''} intro={data.intro} />
        <Grid variant="svc">
          {(data.items ?? []).map((it, i) => (
            // Direct children of .svc-grid — the icon-tile tint cycle is :nth-child based.
            <ServiceCard
              key={i}
              className={'reveal' + revealDelay(i)}
              icon={iconName(it.icon)}
              title={it.title ?? ''}
              description={it.description ?? ''}
            />
          ))}
        </Grid>
      </Wrap>
    </Section>
  );
}
