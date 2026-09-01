import * as React from 'react';
import { Icon } from '../icons';
import { FormField } from './FormField';

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error';

export interface FormSentProps {
  /** First name to thank, when known. */
  name?: string;
}

/**
 * The inline success state that replaces the contact form after a message
 * goes through — check glyph, "Message sent!", and a warm thank-you.
 *
 * ```tsx
 * <FormSent name="Jane" />
 * ```
 */
export function FormSent({ name }: FormSentProps) {
  return (
    <div className="form-sent">
      <Icon name="check" />
      <h3>Message sent!</h3>
      <p>Thanks{name ? ', ' + name : ''} — your note is on its way to Bev. She’ll be in touch soon.</p>
    </div>
  );
}

export interface ContactFormShellProps {
  heading?: string;
  /** Short line under the heading. */
  subtext?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  contactLabel?: string;
  contactPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  /** Submit label. */
  buttonText?: string;
  /** Small note under the button (e.g. response-time promise). */
  note?: string;
  /** Drives the button and note: `sending` disables with "Sending…", `sent` swaps the whole form body for `FormSent`, `error` shows `errorNote` in blush. */
  status?: ContactFormStatus;
  /** Error copy shown in place of `note` when `status` is `error`. */
  errorNote?: string;
  /** Name echoed by the `sent` state. */
  sentName?: string;
  /** The page owns submission (validation, honeypot check, POST/mailto). Fields are named `name`, `contact`, `message`, `botcheck` on the form element. */
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

/**
 * The contact form's presentational shell: three labelled fields, a hidden
 * honeypot input (`botcheck` — leave submission-side handling to the page),
 * a honey submit button, and note/success/error states. Purely controlled —
 * pass `status` and `onSubmit`.
 *
 * ```tsx
 * <ContactFormShell heading="Send a note" nameLabel="Your name"
 *   contactLabel="Email or phone" messageLabel="How can I help?"
 *   buttonText="Send message" status={status} onSubmit={handleSubmit} />
 * ```
 */
export function ContactFormShell({
  heading, subtext, nameLabel, namePlaceholder, contactLabel, contactPlaceholder,
  messageLabel, messagePlaceholder, buttonText, note, status = 'idle', errorNote,
  sentName, onSubmit, className,
}: ContactFormShellProps) {
  return (
    <form className={['form', className].filter(Boolean).join(' ')} onSubmit={onSubmit}>
      {status === 'sent' ? (
        <FormSent name={sentName} />
      ) : (
        <>
          <h3>{heading}</h3>
          <p className="f-sub">{subtext}</p>
          <FormField id="cf-name" name="name" label={nameLabel ?? ''} placeholder={namePlaceholder} required />
          <FormField id="cf-contact" name="contact" label={contactLabel ?? ''} placeholder={contactPlaceholder} required />
          <FormField id="cf-msg" name="message" label={messageLabel ?? ''} textarea placeholder={messagePlaceholder} required />
          <input type="text" name="botcheck" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn honey" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : <>{buttonText} <Icon name="arrow" /></>}
          </button>
          {status === 'error'
            ? <p className="form-note" style={{ color: 'var(--blush)' }}>{errorNote}</p>
            : note ? <p className="form-note">{note}</p> : null}
        </>
      )}
    </form>
  );
}
