import * as React from 'react';
import { Grid, KidCard, Section, SectionHead, ShowCard, Wrap, revealDelay } from '@bevs/design-system';
import { iconName, photoPaths } from '../content/photoPaths';
import type { ChildrenData } from '../content/types';
import type { GalleryState } from '../gallery';

export function ChildrenSection({ data, onOpen }: { data: ChildrenData; onOpen: (g: GalleryState) => void }) {
  return (
    <Section id="children" className="children">
      <Wrap>
        <SectionHead className="reveal" center eyebrow={data.eyebrow ?? ''} heading={data.heading ?? ''} intro={data.intro} />
        <Grid variant="kids">
          {(data.items ?? []).map((it, i) => {
            const photos = photoPaths(it.folder, it.photos);
            // Privacy default: children render as icon tiles until a family
            // has agreed to a photo (see assets/README.md).
            return photos.length ? (
              <ShowCard
                key={i}
                className={'reveal' + revealDelay(i)}
                title={it.label ?? ''}
                sub={it.duties}
                photos={photos}
                alt={it.photoAlt}
                onOpen={() => onOpen({ name: it.label ?? '', alt: it.photoAlt, photos })}
              />
            ) : (
              <KidCard
                key={i}
                className={'reveal' + revealDelay(i)}
                icon={iconName(it.icon, 'child')}
                label={it.label ?? ''}
                duties={it.duties}
              />
            );
          })}
        </Grid>
      </Wrap>
    </Section>
  );
}
