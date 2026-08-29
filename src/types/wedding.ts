export interface Person {
  name: string;
  role?: string;
  image?: string;
}

export interface Couple {
  bride: string;
  groom: string;
  displayName: string;
}

export interface WeddingDetails {
  /** ISO local datetime, e.g. 2026-12-12T15:00:00 — interpreted in `timezone` */
  date: string;
  timezone: string;
  displayDate: string;
}

export interface Venue {
  name: string;
  address: string;
  time: string;
  mapsUrl?: string;
  image?: string;
}

export interface PrincipalSponsors {
  ninong: Person[];
  ninang: Person[];
}

export interface SecondarySponsors {
  candle: Person[];
  veil: Person[];
  cord: Person[];
}

export interface Entourage {
  bridesParents: Person[];
  groomsParents: Person[];
  principalSponsors: PrincipalSponsors;
  secondarySponsors: SecondarySponsors;
  bestMan: Person[];
  maidOfHonor: Person[];
  bridesSiblings: Person[];
  groomsSiblings: Person[];
  ringBearer: Person[];
  flowerGirls: Person[];
}

export interface AttirePair {
  gentlemen: string;
  ladies: string;
}

export interface AttireGuide {
  principalSponsors: AttirePair;
  guests: AttirePair;
}

export interface WeddingColor {
  name: string;
  hex: string;
}

export interface ProgramEvent {
  time: string;
  title: string;
  description?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GiftOption {
  id: string;
  name: string;
  accountName?: string;
  accountNumber?: string;
  qrCode?: string;
  logo?: string;
  instructions?: string;
}

export interface RSVPConfig {
  enabled: boolean;
  apiUrl?: string;
  allowAdditionalGuests: boolean;
  maxGuests: number;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface WeddingTheme {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
    script?: string;
  };
}

export interface HeroCopy {
  image?: string;
  familiesLine: string;
  inviteLine: string;
  openButtonLabel: string;
}

export interface ClosingMessage {
  signOff: string;
  names?: string;
  body: string;
  farewell?: string;
}

export interface SEO {
  title: string;
  description: string;
  ogImage?: string;
}

export interface SnapShare {
  hashtag: string;
}

export interface WeddingConfig {
  id: string;
  couple: Couple;
  wedding: WeddingDetails;
  theme: WeddingTheme;
  hero: HeroCopy;
  invitationMessage: string;
  ceremony: Venue;
  reception: Venue;
  entourage: Entourage;
  attire: AttireGuide;
  colors: WeddingColor[];
  program: ProgramEvent[];
  gallery: GalleryImage[];
  gifts: GiftOption[];
  rsvp: RSVPConfig;
  social: SocialLinks;
  snapShare: SnapShare;
  faqs: FAQ[];
  closingMessage: ClosingMessage;
  seo: SEO;
}

export interface RSVPData {
  fullName: string;
  email: string;
  attendance: "accepts" | "declines";
  numberOfGuests?: number;
  message?: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
}
