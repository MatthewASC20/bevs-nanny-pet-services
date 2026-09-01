import * as React from 'react';
import { Grid, Section, SectionHead, ShowCard, Wrap, revealDelay } from '@bevs/design-system';
import { photoPaths } from '../content/photoPaths';
import type { PetsData } from '../content/types';
import type { GalleryState } from '../gallery';

export function PetsSection({ data, onOpen }: { data: PetsData; onOpen: (g: GalleryState) => void }) {
  return (
    <Section id="pets" className="pets">
      <Wrap>
        <SectionHead className="reveal" center eyebrow={data.eyebrow ?? ''} heading={data.heading ?? ''} intro={data.intro} />
        <Grid variant="pets">
          {(data.items ?? []).map((it, i) => {
            // Legacy single-photo form still honoured, as on the old site.
            const list = it.photos && it.photos.length ? it.photos : it.photo ? [it.photo] : [];
            const photos = photoPaths(it.folder, list);
            return (
              <ShowCard
                key={i}
                className={'reveal' + revealDelay(i)}
                title={it.name ?? ''}
                sub={it.note}
                photos={photos}
                alt={it.photoAlt}
                onOpen={() => onOpen({ name: it.name ?? '', alt: it.photoAlt, photos })}
              />
            );
          })}
        </Grid>
        <p className="pets-note reveal">{data.note}</p>
      </Wrap>
    </Section>
  );
}
