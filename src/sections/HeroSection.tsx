import * as React from 'react';
import { Button, Chip, Eyebrow, FloatBadge, Portrait, RichText, Wrap } from '@bevs/design-system';
import { iconName } from '../content/photoPaths';
import type { Hero } from '../content/types';

export function HeroSection({ hero }: { hero: Hero }) {
  const badges = hero.badges ?? [];
  const b0 = badges[0] ?? { icon: 'pawfill', text: '' };
  const b1 = badges[1] ?? { icon: 'heartfill', text: '' };
  const p = hero.portrait ?? {};
  return (
    <section className="hero">
      <Wrap className="hero-grid">
        <div className="hero-copy">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1><RichText text={hero.headline ?? ''} primaryClass="leaf-word" accentClass="paw-word" /></h1>
          <p className="hero-lede">{hero.lede}</p>
          <div className="hero-actions">
            {(hero.buttons ?? []).map((bt, i) => (
              <Button
                key={i}
                variant={bt.style === 'honey' || bt.style === 'ghost' ? bt.style : 'primary'}
                href={bt.href}
                icon={bt.icon ? iconName(bt.icon) : undefined}
              >
                {bt.text}
              </Button>
            ))}
          </div>
          <div className="hero-chips">
            {(hero.chips ?? []).map((c, i) => (
              <Chip key={i} icon={iconName(c.icon)}>{c.text}</Chip>
            ))}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <Portrait src={p.photo || undefined} alt={p.photoAlt || p.initials} initials={p.initials} note={p.note} />
          <FloatBadge icon={iconName(b0.icon, 'pawfill')} corner="top-left" animated>{b0.text}</FloatBadge>
          <FloatBadge icon={iconName(b1.icon, 'heartfill')} corner="bottom-right" animated className="slow">{b1.text}</FloatBadge>
        </div>
      </Wrap>
    </section>
  );
}
