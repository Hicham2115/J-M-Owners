// Rough short-term rental revenue estimator for the Marrakech market.
// Figures are indicative only — a commercial confirms the real number per file.

type PropertyType = "Villa" | "Apartment" | "Riad" | "Duplex";

const OWNER_SHARE = 0.6;
const AGENCY_SHARE_LOW = 0.35;
const AGENCY_SHARE_HIGH = 0.4;
const OCCUPANCY_RATE = 0.6;
const NIGHTS_PER_MONTH = 30 * OCCUPANCY_RATE;
// Peak season (holidays, festivals) charges above the regular high-season rate.
const PEAK_SEASON_MULTIPLIER = 1.35;

// Avg nightly rate range (MAD) by property type and bedroom count.
const BASE_NIGHTLY_RATE: Record<PropertyType, Record<string, [number, number]>> = {
  Apartment: {
    "1": [350, 500],
    "2": [500, 750],
    "3": [700, 1000],
    "4": [900, 1300],
    "5+": [1100, 1600],
  },
  Duplex: {
    "1": [450, 650],
    "2": [650, 950],
    "3": [900, 1300],
    "4": [1200, 1700],
    "5+": [1500, 2100],
  },
  Riad: {
    "1": [550, 800],
    "2": [800, 1200],
    "3": [1200, 1800],
    "4": [1700, 2500],
    "5+": [2300, 3500],
  },
  Villa: {
    "1": [600, 900],
    "2": [900, 1300],
    "3": [1300, 1900],
    "4": [1800, 2600],
    "5+": [2500, 3800],
  },
};

const LOCATION_MULTIPLIER: Record<string, number> = {
  Palmeraie: 1.15,
  Hivernage: 1.15,
  Amelkis: 1.1,
  Prestigia: 1.1,
  Guéliz: 1,
  Medina: 0.95,
  Targa: 0.9,
  Other: 0.9,
};

function roundToHundred(value: number) {
  return Math.round(value / 100) * 100;
}

export interface RevenueEstimateInput {
  propertyType: string;
  bedrooms: string;
  location: string;
  amenities: string[];
}

export interface RevenueEstimate {
  monthlyLow: number;
  monthlyHigh: number;
  ownerLow: number;
  ownerHigh: number;
  agencyLow: number;
  agencyHigh: number;
  nightlyLowSeason: number;
  nightlyHighSeason: number;
  nightlyPeakSeason: number;
}

export function estimateMonthlyRevenue({
  propertyType,
  bedrooms,
  location,
  amenities,
}: RevenueEstimateInput): RevenueEstimate | null {
  const base = BASE_NIGHTLY_RATE[propertyType as PropertyType]?.[bedrooms];
  if (!base) return null;

  const locationMultiplier = LOCATION_MULTIPLIER[location] ?? 1;
  const amenityBoost = 1 + Math.min(amenities.length, 6) * 0.02;
  const [nightlyLow, nightlyHigh] = base;

  const monthlyLow = roundToHundred(nightlyLow * locationMultiplier * amenityBoost * NIGHTS_PER_MONTH);
  const monthlyHigh = roundToHundred(nightlyHigh * locationMultiplier * amenityBoost * NIGHTS_PER_MONTH);

  const adjustedNightlyLow = nightlyLow * locationMultiplier * amenityBoost;
  const adjustedNightlyHigh = nightlyHigh * locationMultiplier * amenityBoost;

  return {
    monthlyLow,
    monthlyHigh,
    ownerLow: roundToHundred(monthlyLow * OWNER_SHARE),
    ownerHigh: roundToHundred(monthlyHigh * OWNER_SHARE),
    agencyLow: roundToHundred(monthlyLow * AGENCY_SHARE_LOW),
    agencyHigh: roundToHundred(monthlyHigh * AGENCY_SHARE_HIGH),
    nightlyLowSeason: roundToHundred(adjustedNightlyLow),
    nightlyHighSeason: roundToHundred(adjustedNightlyHigh),
    nightlyPeakSeason: roundToHundred(adjustedNightlyHigh * PEAK_SEASON_MULTIPLIER),
  };
}

export function formatMAD(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} MAD`;
}
