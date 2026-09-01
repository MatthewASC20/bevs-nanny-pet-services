import * as React from 'react';
import { PayCard, Section, Wrap } from '@bevs/design-system';
import type { PaymentData } from '../content/types';

export function PaymentSection({ data }: { data: PaymentData }) {
  // The section exists only when a real hosted-checkout link is configured —
  // Beverly hides it by blanking payment.url in content.json.
  const url = (data.url ?? '').trim();
  if (!/^https?:\/\//i.test(url)) return null;
  return (
    <Section id="pay" className="pay">
      <Wrap>
        <PayCard
          className="reveal"
          eyebrow={data.eyebrow}
          heading={data.heading ?? ''}
          blurb={data.blurb}
          buttonText={data.buttonText || 'Pay securely'}
          url={url}
          secureNote={data.secureNote}
        />
      </Wrap>
    </Section>
  );
}
