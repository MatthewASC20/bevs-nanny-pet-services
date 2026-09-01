import * as React from 'react';
import { EduPanel, Eyebrow, Pill, Section, Wrap } from '@bevs/design-system';
import { iconName } from '../content/photoPaths';
import type { SkillsData } from '../content/types';

export function SkillsSection({ data }: { data: SkillsData }) {
  return (
    <Section id="skills">
      <Wrap className="skills-grid">
        <div className="reveal">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2>{data.heading}</h2>
          {data.intro ? <p>{data.intro}</p> : null}
          <div className="pill-wrap">
            {(data.items ?? []).map((it, i) => (
              <Pill key={i} icon={iconName(it.icon)} star={it.star} href={it.href}>{it.label}</Pill>
            ))}
          </div>
        </div>
        <EduPanel
          className="reveal d1"
          heading={data.educationHeading}
          items={(data.education ?? []).map((e) => ({ school: e.school ?? '', detail: e.detail }))}
        />
      </Wrap>
    </Section>
  );
}
