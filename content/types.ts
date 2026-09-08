/**
 * Types for `avana-content.json`. Spec section 9: all copy lives in content and
 * is imported as typed data — no string literals in components except UI chrome.
 */

export type PlotStatus = "available" | "on-hold" | "sold";
export type PoolId = "A" | "B" | "C";

export type Plot = {
  id: string; // "P07"
  number: number; // 7
  terrace: 1 | 2 | 3;
  areaSqft: number; // 3500
  pool: PoolId | null;
  facing: string | null; // [VERIFY] from survey
  facingVerified?: boolean;
  status: PlotStatus;
  path: string; // SVG path data
  labelXY: [number, number];
};

export type Project = {
  name: string;
  developer: string;
  developerLegalName: string;
  developerTagline: string;
  units: number;
  landAcres: number;
  landGhunta: number;
  configuration: string;
  bedrooms: string;
  bedroomsVerified: boolean;
  plotSqft: number;
  builtUpSqft: number;
  carpetSqft: number;
  priceFrom: number;
  priceFromDisplay: string;
  possessionMonths: number;
  roofStyle: string;
};

export type Rera = {
  registrationNumber: string;
  qrSrc: string;
  authorityUrl: string;
  verified: boolean;
};

export type ConnectivityRow = {
  to: string;
  minutes: number | null;
  verified: boolean;
};

export type Location = {
  addressLine: string;
  district: string;
  state: string;
  pincode: string;
  range: string;
  geo: { lat: number | null; lng: number | null; verified: boolean };
  mapPinLabel: string;
  mapPinVerified: boolean;
  headline: string;
  body: string;
  orientationVerified: boolean;
  connectivity: ConnectivityRow[];
};

export type FieldNote = { label: string; value: string };

export type Hero = {
  h1: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  fieldNotes: FieldNote[];
  poster: string | null;
  video: string | null;
};

export type Measure = { value: string; label: string };

export type MasterPlan = {
  headline: string;
  layoutStatus: "schematic" | "surveyed";
  caption: string;
  availability: { source: string; verified: boolean };
  viewBox: string;
  plots: Plot[];
};

export type SpecRow = { label: string; value: string; verified: boolean };

export type FloorPlan = { level: string; src: string | null; available: boolean };

export type Villa = {
  headline: string;
  body: string;
  spec: SpecRow[];
  floorPlans: FloorPlan[];
};

export type PoolOption = {
  id: PoolId;
  name: string;
  ft: [number, number];
  m: [number, number];
  render: string | null;
};

export type Pools = {
  headline: string;
  caption: string;
  captionVerified: boolean;
  options: PoolOption[];
};

export type Feature = {
  title: string;
  body: string;
  span: number;
  image: string | null;
  href?: string;
};

export type Amenities = {
  headline: string;
  lead: string;
  items: { name: string; line: string }[];
  image: string | null;
};

export type PayoutRow = {
  principal: number;
  years: number;
  payout: number | null;
  verified: boolean;
};

export type PlanRow = { label: string; value: string };

export type Plan = {
  id: "A" | "B" | "C";
  name: string;
  oneLiner: string;
  enabled: boolean;
  gate?: string;
  rows: PlanRow[];
  payoutTable?: PayoutRow[];
  qualifier?: string;
  cta: string;
};

export type Plans = {
  headline: string;
  lead: string;
  items: Plan[];
  advantages: string[];
};

export type PaymentStep = { n: number; title: string; body: string };

export type Payment = {
  headline: string;
  steps: PaymentStep[];
  caption: string;
};

export type Developer = {
  headline: string;
  body: string;
  principles: { name: string; line: string }[];
  trustFacts: {
    yearsActive: number | null;
    projectsDelivered: number | null;
    unitsHandedOver: number | null;
    llpin: string | null;
    registeredOffice: string | null;
    verified: boolean;
  };
  website: string;
};

export type Enquire = {
  headline: string;
  lead: string;
  consent: string;
  successTitle: string;
  successBody: string;
  failure: string;
};

export type Contact = {
  phoneE164: string;
  phoneDisplay: string;
  phoneVerified: boolean;
  whatsapp: string;
  email: string;
  emailVerified: boolean;
  projectSite: string;
  developerSite: string;
  address: string;
};

export type Faq = { q: string; a: string };

export type Content = {
  project: Project;
  rera: Rera;
  location: Location;
  hero: Hero;
  measureBand: Measure[];
  masterPlan: MasterPlan;
  villa: Villa;
  pools: Pools;
  features: Feature[];
  amenities: Amenities;
  evening: { passage: string; image: string | null };
  plans: Plans;
  payment: Payment;
  developer: Developer;
  enquire: Enquire;
  contact: Contact;
  faq: Faq[];
  disclosure: string;
  disclosureApproved: boolean;
};
