import * as React from 'react';
import { ContactCard, ContactFormShell, Eyebrow, Section, Wrap, type ContactFormStatus } from '@bevs/design-system';
import { iconName } from '../content/photoPaths';
import type { ContactData } from '../content/types';

/**
 * Contact cards plus the inquiry form. Submission works exactly as the old
 * site's: a filled honeypot is silently dropped; with no Web3Forms access key
 * the visitor's own email app takes over (mailto:); otherwise the message
 * POSTs to Web3Forms, and failure falls back to a call-or-text note.
 */
export function ContactSection({ data }: { data: ContactData }) {
  const f = data.form ?? {};
  const [status, setStatus] = React.useState<ContactFormStatus>('idle');
  const [sentName, setSentName] = React.useState<string | undefined>(undefined);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (name: string) =>
      ((form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '').trim();
    if (field('botcheck')) return; // spam honeypot tripped — silently drop

    const key = (f.accessKey ?? '').trim();
    const to = f.emailTo ?? '';
    const name = field('name');
    const contact = field('contact');
    const msg = field('message');
    const subject = 'Nanny / pet care inquiry — ' + (name || 'New family');

    // No backend key configured -> fall back to the email app.
    if (!key) {
      const body = encodeURIComponent('Hi Beverly,\n\n' + msg + '\n\n— ' + name + '\nReach me at: ' + contact);
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
      return;
    }

    setStatus('sending');
    const payload: Record<string, string> = {
      access_key: key,
      subject,
      from_name: "Bev's Nanny & Pet — website",
      name,
      message: msg + '\n\nReach me at: ' + contact,
      botcheck: '',
    };
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact)) payload.email = contact;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((res: { success?: boolean; message?: string } | null) => {
        if (!res || !res.success) throw new Error(res?.message || 'Send failed');
        setSentName(name || undefined);
        setStatus('sent');
      })
      .catch(() => setStatus('error'));
  };

  return (
    <Section id="contact">
      <Wrap className="contact-grid">
        <div className="reveal">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2>{data.heading}</h2>
          {data.intro ? <p>{data.intro}</p> : null}
          <div className="contact-cards">
            {(data.cards ?? []).map((cd, i) => (
              <ContactCard key={i} icon={iconName(cd.icon)} label={cd.label ?? ''} value={cd.value ?? ''} href={cd.href} />
            ))}
          </div>
        </div>
        <ContactFormShell
          className="reveal d1"
          heading={f.heading}
          subtext={f.subtext}
          nameLabel={f.nameLabel}
          namePlaceholder={f.namePlaceholder}
          contactLabel={f.contactLabel}
          contactPlaceholder={f.contactPlaceholder}
          messageLabel={f.messageLabel}
          messagePlaceholder={f.messagePlaceholder}
          buttonText={f.buttonText}
          note={f.note}
          status={status}
          errorNote={"Sorry — that didn't go through. Please call or text Bev, or email " + (f.emailTo ?? '') + '.'}
          sentName={sentName}
          onSubmit={onSubmit}
        />
      </Wrap>
    </Section>
  );
}
