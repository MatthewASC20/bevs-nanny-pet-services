import * as React from 'react';
import { Section, Testimonial, Wrap } from '@bevs/design-system';
import type { TestimonialData } from '../content/types';

export function TestimonialSection({ data }: { data: TestimonialData }) {
  return (
    <Section id="kind-words" className="testimonial">
      <Wrap>
        <Testimonial
          eyebrow={data.eyebrow}
          stars={data.stars ?? 0}
          quote={data.quote ?? ''}
          author={data.author ?? ''}
          authorDetail={data.authorDetail}
          note={data.note}
        />
      </Wrap>
    </Section>
  );
}
