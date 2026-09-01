// Shapes of the three editable JSON files (public/content.json,
// public/children.json, public/pets.json). Everything is optional — the page
// renders sensible blanks for missing values, so Beverly can trim freely.

export interface SiteMeta { businessName?: string; title?: string; description?: string; themeColor?: string }
export interface Brand { name?: string; tagline?: string }

export interface HeroButton { text?: string; href?: string; style?: string; icon?: string }
export interface HeroChip { icon?: string; text?: string }
export interface HeroBadge { icon?: string; text?: string }
export interface HeroPortrait { initials?: string; note?: string; photo?: string; photoAlt?: string }
export interface Hero {
  eyebrow?: string; headline?: string; lede?: string;
  buttons?: HeroButton[]; chips?: HeroChip[]; portrait?: HeroPortrait; badges?: HeroBadge[];
}

export interface AboutData {
  quote?: string; quoteCite?: string; eyebrow?: string; heading?: string;
  lead?: string; paragraphs?: string[];
}

export interface SectionIntro { eyebrow?: string; heading?: string; intro?: string }

export interface ServiceItem { icon?: string; title?: string; description?: string }
export interface ExperienceItem {
  years?: string; role?: string; family?: string; location?: string;
  current?: boolean; description?: string;
}
export interface SkillItem { label?: string; icon?: string; star?: boolean; href?: string }
export interface EducationItem { school?: string; detail?: string }
export interface SkillsData extends SectionIntro {
  items?: SkillItem[]; educationHeading?: string; education?: EducationItem[];
}
export interface TestimonialData {
  eyebrow?: string; stars?: number; quote?: string; author?: string;
  authorDetail?: string; note?: string;
}
export interface PaymentData {
  eyebrow?: string; heading?: string; blurb?: string; buttonText?: string;
  url?: string; secureNote?: string;
}
export interface ContactCardData { icon?: string; label?: string; value?: string; href?: string }
export interface ContactFormData {
  heading?: string; subtext?: string; emailTo?: string; accessKey?: string;
  nameLabel?: string; namePlaceholder?: string; contactLabel?: string; contactPlaceholder?: string;
  messageLabel?: string; messagePlaceholder?: string; buttonText?: string; note?: string;
}
export interface ContactData extends SectionIntro { cards?: ContactCardData[]; form?: ContactFormData }
export interface FooterData {
  tagline?: string; phone?: string; phoneHref?: string; email?: string;
  location?: string; copyrightName?: string; madeWith?: string;
}

export interface ChildItem {
  icon?: string; label?: string; duties?: string; folder?: string;
  photoAlt?: string; photos?: string[];
}
export interface ChildrenData extends SectionIntro { items?: ChildItem[] }

export interface PetItem {
  name?: string; note?: string; folder?: string; photoAlt?: string;
  photos?: string[];
  /** Legacy single-photo form, still honoured. */
  photo?: string;
}
export interface PetsData extends SectionIntro { note?: string; items?: PetItem[] }

export interface Content {
  site?: SiteMeta; brand?: Brand; hero?: Hero; about?: AboutData;
  services?: SectionIntro & { items?: ServiceItem[] };
  experience?: SectionIntro & { items?: ExperienceItem[] };
  skills?: SkillsData; testimonial?: TestimonialData; payment?: PaymentData;
  contact?: ContactData; footer?: FooterData;
  children?: ChildrenData; pets?: PetsData;
}
