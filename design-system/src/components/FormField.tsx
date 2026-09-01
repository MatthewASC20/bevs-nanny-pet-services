import * as React from 'react';

export interface FormFieldProps {
  /** Field label text. */
  label: string;
  /** Input id (label binds to it). */
  id: string;
  /** Render a textarea instead of a single-line input. */
  textarea?: boolean;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

/**
 * A labelled form field in the site's soft style — rounded, cream-bordered.
 * Compose inside a `.form` card next to a `Button` submit.
 *
 * ```tsx
 * <form className="form">
 *   <FormField id="name" label="Your name" placeholder="Jane" required />
 *   <FormField id="msg" label="How can I help?" textarea />
 *   <Button variant="honey" icon="arrow">Send</Button>
 * </form>
 * ```
 */
export function FormField({ label, id, textarea, name, type = 'text', placeholder, required, className }: FormFieldProps) {
  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label htmlFor={id}>{label}</label>
      {textarea
        ? <textarea id={id} name={name ?? id} placeholder={placeholder} required={required} />
        : <input id={id} name={name ?? id} type={type} placeholder={placeholder} required={required} />}
    </div>
  );
}
