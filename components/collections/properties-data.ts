import type { StaticImageData } from "next/image";

import villaPanorama1 from "@/app/assets/Villa Panorama/1.jpeg";
import villaPanorama2 from "@/app/assets/Villa Panorama/2.jpeg";
import villaPanorama3 from "@/app/assets/Villa Panorama/3.jpeg";
import villaPanorama4 from "@/app/assets/Villa Panorama/4.jpeg";
import villaPanorama5 from "@/app/assets/Villa Panorama/5.jpeg";

import villaNerolia1 from "@/app/assets/Villa Nerolia/1.jpeg";
import villaNerolia2 from "@/app/assets/Villa Nerolia/2.jpeg";
import villaNerolia3 from "@/app/assets/Villa Nerolia/3.jpeg";
import villaNerolia4 from "@/app/assets/Villa Nerolia/4.jpeg";
import villaNerolia5 from "@/app/assets/Villa Nerolia/5.jpeg";

import villaGolfAmelkis1 from "@/app/assets/Villa Golf Amelkis/1.jpeg";
import villaGolfAmelkis2 from "@/app/assets/Villa Golf Amelkis/2.jpeg";
import villaGolfAmelkis3 from "@/app/assets/Villa Golf Amelkis/3.jpeg";
import villaGolfAmelkis4 from "@/app/assets/Villa Golf Amelkis/4.jpeg";
import villaGolfAmelkis5 from "@/app/assets/Villa Golf Amelkis/5.jpeg";

import villaZizou1 from "@/app/assets/Villa Zizou/1.jpeg";
import villaZizou2 from "@/app/assets/Villa Zizou/2.jpeg";
import villaZizou3 from "@/app/assets/Villa Zizou/3.jpeg";
import villaZizou4 from "@/app/assets/Villa Zizou/4.jpeg";
import villaZizou5 from "@/app/assets/Villa Zizou/5.jpeg";

import villaHajar1 from "@/app/assets/Villa Hajar/1.jpeg";
import villaHajar2 from "@/app/assets/Villa Hajar/2.jpeg";
import villaHajar3 from "@/app/assets/Villa Hajar/3.jpeg";
import villaHajar4 from "@/app/assets/Villa Hajar/4.jpeg";
import villaHajar5 from "@/app/assets/Villa Hajar/5.jpeg";

import appartYakout1 from "@/app/assets/Appart Yakout/1.jpeg";
import appartYakout2 from "@/app/assets/Appart Yakout/2.jpeg";
import appartYakout3 from "@/app/assets/Appart Yakout/3.jpeg";
import appartYakout4 from "@/app/assets/Appart Yakout/4.jpeg";
import appartYakout5 from "@/app/assets/Appart Yakout/5.jpeg";

import appartMabrouka1 from "@/app/assets/Appart Mabrouka/1.jpeg";
import appartMabrouka2 from "@/app/assets/Appart Mabrouka/2.jpeg";
import appartMabrouka3 from "@/app/assets/Appart Mabrouka/3.jpeg";
import appartMabrouka4 from "@/app/assets/Appart Mabrouka/4.jpeg";
import appartMabrouka5 from "@/app/assets/Appart Mabrouka/5.jpeg";

import appartAtlassi1 from "@/app/assets/Appart Atlassi/1.jpeg";
import appartAtlassi2 from "@/app/assets/Appart Atlassi/2.jpeg";
import appartAtlassi3 from "@/app/assets/Appart Atlassi/3.jpeg";
import appartAtlassi4 from "@/app/assets/Appart Atlassi/4.jpeg";
import appartAtlassi5 from "@/app/assets/Appart Atlassi/5.jpeg";

import duplexManis1 from "@/app/assets/Duplex Manis/1.jpeg";
import duplexManis2 from "@/app/assets/Duplex Manis/2.jpeg";
import duplexManis3 from "@/app/assets/Duplex Manis/3.jpeg";
import duplexManis4 from "@/app/assets/Duplex Manis/4.jpeg";
import duplexManis5 from "@/app/assets/Duplex Manis/5.jpeg";

import prestigiaJubaea1 from "@/app/assets/Prestigia Jubaea/1.jpeg";
import prestigiaJubaea2 from "@/app/assets/Prestigia Jubaea/2.jpeg";
import prestigiaJubaea3 from "@/app/assets/Prestigia Jubaea/3.jpeg";
import prestigiaJubaea4 from "@/app/assets/Prestigia Jubaea/4.jpeg";
import prestigiaJubaea5 from "@/app/assets/Prestigia Jubaea/5.jpeg";

import prestigiaJubaea15_1 from "@/app/assets/Prestigia Jubaea 15/1.jpeg";
import prestigiaJubaea15_2 from "@/app/assets/Prestigia Jubaea 15/2.jpeg";
import prestigiaJubaea15_3 from "@/app/assets/Prestigia Jubaea 15/3.jpeg";
import prestigiaJubaea15_4 from "@/app/assets/Prestigia Jubaea 15/4.jpeg";
import prestigiaJubaea15_5 from "@/app/assets/Prestigia Jubaea 15/5.jpeg";

import prestigiaSaphir305_1 from "@/app/assets/Prestigia Saphir 305/1.jpeg";
import prestigiaSaphir305_2 from "@/app/assets/Prestigia Saphir 305/2.jpeg";
import prestigiaSaphir305_3 from "@/app/assets/Prestigia Saphir 305/3.jpeg";
import prestigiaSaphir305_4 from "@/app/assets/Prestigia Saphir 305/4.jpeg";
import prestigiaSaphir305_5 from "@/app/assets/Prestigia Saphir 305/5.jpeg";

export type PropertyType = "Villa" | "Apartment" | "Riad";

export interface Amenity {
  key: "wifi" | "ac" | "pool" | "parking" | "kitchen" | "tv" | "laundry";
  label: string;
}

export interface Pricing {
  low: number;
  high: number;
  peak: number;
}

export interface Property {
  slug: string;
  name: string;
  type: PropertyType;
  location: string;
  rating: number;
  beds: number;
  pool: boolean;
  top?: boolean;
  description: string;
  descriptionLong: string[];
  amenities: Amenity[];
  includedServices: string[];
  pricing: Pricing;
  image?: StaticImageData;
  images: StaticImageData[];
}

const baseAmenities: Amenity[] = [
  { key: "wifi", label: "High-speed wifi" },
  { key: "ac", label: "Air conditioning" },
  { key: "parking", label: "Private parking" },
  { key: "kitchen", label: "Equipped kitchen" },
];

function amenitiesFor(type: PropertyType, pool: boolean): Amenity[] {
  const list = [...baseAmenities];
  if (pool) {
    list.push({
      key: "pool",
      label: type === "Villa" ? "Private pool" : "Shared pool",
    });
  }
  if (type === "Villa") {
    list.push({ key: "tv", label: "Television" });
  }
  return list;
}

const includedServices = [
  "Daily housekeeping",
  "Personal check-in",
  "Linens included",
  "24/7 support",
];

export const properties: Property[] = [
  {
    slug: "villa-panorama",
    name: "Villa Panorama",
    type: "Villa",
    location: "Palmeraie",
    rating: 4.9,
    beds: 4,
    pool: true,
    top: true,
    description: "4-bedroom villa with sweeping views in the Palmeraie.",
    descriptionLong: [
      "A 4-bedroom villa tucked into the Palmeraie, with generous living spaces and open views over the surrounding palm groves.",
      "Private pool, landscaped garden and 24/7 security. Ideal for family or group stays, just minutes from the city centre.",
    ],
    amenities: amenitiesFor("Villa", true),
    includedServices,
    pricing: { low: 220, high: 320, peak: 420 },
    image: villaPanorama1,
    images: [villaPanorama1, villaPanorama2, villaPanorama3, villaPanorama4, villaPanorama5],
  },
  {
    slug: "villa-nerolia",
    name: "Villa Nerolia",
    type: "Villa",
    location: "Noria Golf",
    rating: 4.9,
    beds: 5,
    pool: true,
    top: true,
    description: "Contemporary 5-bedroom villa in the Noria Golf residence.",
    descriptionLong: [
      "A contemporary 5-bedroom villa within the Noria Golf residence, combining modern architecture with high-end comfort.",
      "Large private pool, spacious terrace and golf-course views. Perfect for larger groups seeking space and quiet.",
    ],
    amenities: amenitiesFor("Villa", true),
    includedServices,
    pricing: { low: 240, high: 340, peak: 440 },
    image: villaNerolia1,
    images: [villaNerolia1, villaNerolia2, villaNerolia3, villaNerolia4, villaNerolia5],
  },
  {
    slug: "villa-golf-amelkis",
    name: "Villa Golf Amelkis",
    type: "Villa",
    location: "Amelkis",
    rating: 4.9,
    beds: 4,
    pool: true,
    top: true,
    description: "Prestige 4-bedroom villa facing the Amelkis golf course.",
    descriptionLong: [
      "A prestige 4-bedroom villa facing the Amelkis golf course. An exceptional setting for a stay that blends relaxation and refinement.",
      "Heatable private pool, summer lounge and concierge service available on request.",
    ],
    amenities: amenitiesFor("Villa", true),
    includedServices,
    pricing: { low: 210, high: 310, peak: 400 },
    image: villaGolfAmelkis1,
    images: [villaGolfAmelkis1, villaGolfAmelkis2, villaGolfAmelkis3, villaGolfAmelkis4, villaGolfAmelkis5],
  },
  {
    slug: "villa-zizou",
    name: "Villa Zizou",
    type: "Villa",
    location: "Targa",
    rating: 4.8,
    beds: 4,
    pool: true,
    description: "4-bedroom family villa with a garden, in Targa.",
    descriptionLong: [
      "A 4-bedroom family villa with a garden, set in the quiet Targa neighbourhood.",
      "Private pool, barbecue area and large outdoor lounge — ideal for a family holiday.",
    ],
    amenities: amenitiesFor("Villa", true),
    includedServices,
    pricing: { low: 190, high: 280, peak: 380 },
    image: villaZizou1,
    images: [villaZizou1, villaZizou2, villaZizou3, villaZizou4, villaZizou5],
  },
  {
    slug: "villa-hajar",
    name: "Villa Hajar",
    type: "Villa",
    location: "Route de l'Ourika",
    rating: 4.9,
    beds: 5,
    pool: true,
    description: "Family villa with an olive-tree garden, Route de l'Ourika.",
    descriptionLong: [
      "A 5-bedroom villa surrounded by an olive grove on the Route de l'Ourika, peaceful and close to nature.",
      "Large pool, shaded terrace and Atlas mountain views. A haven of calm just minutes from Marrakech.",
    ],
    amenities: amenitiesFor("Villa", true),
    includedServices,
    pricing: { low: 230, high: 330, peak: 430 },
    image: villaHajar1,
    images: [villaHajar1, villaHajar2, villaHajar3, villaHajar4, villaHajar5],
  },
  {
    slug: "appart-yakout",
    name: "Appart Yakout",
    type: "Apartment",
    location: "Guéliz",
    rating: 4.8,
    beds: 2,
    pool: false,
    description: "Modern 2-bedroom apartment in the heart of Guéliz.",
    descriptionLong: [
      "A modern 2-bedroom apartment in the heart of Guéliz, within walking distance of cafés, restaurants and shops.",
      "Thoughtful decor, a fully equipped kitchen and a bright balcony.",
    ],
    amenities: amenitiesFor("Apartment", false),
    includedServices,
    pricing: { low: 70, high: 110, peak: 150 },
    image: appartYakout1,
    images: [appartYakout1, appartYakout2, appartYakout3, appartYakout4, appartYakout5],
  },
  {
    slug: "appart-mabrouka",
    name: "Appart Mabrouka",
    type: "Apartment",
    location: "Guéliz",
    rating: 4.7,
    beds: 2,
    pool: false,
    description: "Bright 2-bedroom apartment, walking distance to Guéliz.",
    descriptionLong: [
      "A bright 2-bedroom apartment, just steps from Guéliz. Ideal for a comfortable city stay.",
      "Modern finishes, an equipped kitchen and a central location close to every amenity.",
    ],
    amenities: amenitiesFor("Apartment", false),
    includedServices,
    pricing: { low: 65, high: 100, peak: 140 },
    image: appartMabrouka1,
    images: [appartMabrouka1, appartMabrouka2, appartMabrouka3, appartMabrouka4, appartMabrouka5],
  },
  {
    slug: "appart-atlassi",
    name: "Appart Atlassi",
    type: "Apartment",
    location: "Hivernage",
    rating: 4.7,
    beds: 2,
    pool: false,
    description: "2-bedroom apartment in the quiet Hivernage district.",
    descriptionLong: [
      "A 2-bedroom apartment in the quiet, residential Hivernage district.",
      "Close to major hotels and the Menara gardens, with quick access to the city centre.",
    ],
    amenities: amenitiesFor("Apartment", false),
    includedServices,
    pricing: { low: 75, high: 115, peak: 155 },
    image: appartAtlassi1,
    images: [appartAtlassi1, appartAtlassi2, appartAtlassi3, appartAtlassi4, appartAtlassi5],
  },
  {
    slug: "duplex-manis",
    name: "Duplex Manis",
    type: "Apartment",
    location: "Guéliz",
    rating: 4.8,
    beds: 3,
    pool: false,
    description: "Spacious 3-bedroom duplex in central Guéliz.",
    descriptionLong: [
      "A spacious 3-bedroom duplex in central Guéliz, spread across two levels for extra privacy.",
      "Equipped open-plan kitchen, double-height living room and a private terrace.",
    ],
    amenities: amenitiesFor("Apartment", false),
    includedServices,
    pricing: { low: 95, high: 140, peak: 190 },
    image: duplexManis1,
    images: [duplexManis1, duplexManis2, duplexManis3, duplexManis4, duplexManis5],
  },
  {
    slug: "prestigia-jubaea",
    name: "Prestigia Jubaea",
    type: "Apartment",
    location: "Prestigia",
    rating: 4.8,
    beds: 2,
    pool: true,
    description: "2-bedroom residence apartment with shared pool, Prestigia.",
    descriptionLong: [
      "A 2-bedroom apartment in the Prestigia residence. Fitted with a premium coffee machine, designer kitchen and modern finishes.",
      "A residence with a shared pool, 24/7 security and private parking. Close to the Marrakech golf course and shops.",
    ],
    amenities: amenitiesFor("Apartment", true),
    includedServices,
    pricing: { low: 90, high: 150, peak: 210 },
    image: prestigiaJubaea1,
    images: [prestigiaJubaea1, prestigiaJubaea2, prestigiaJubaea3, prestigiaJubaea4, prestigiaJubaea5],
  },
  {
    slug: "prestigia-jubaea-15",
    name: "Prestigia Jubaea 15",
    type: "Apartment",
    location: "Prestigia",
    rating: 4.8,
    beds: 2,
    pool: true,
    description: "2-bedroom residence apartment with shared pool, Prestigia.",
    descriptionLong: [
      "A 2-bedroom apartment in the Prestigia residence. Fitted with a premium coffee machine, designer kitchen and modern finishes.",
      "A residence with a shared pool, 24/7 security and private parking. Close to the Marrakech golf course and shops.",
    ],
    amenities: amenitiesFor("Apartment", true),
    includedServices,
    pricing: { low: 90, high: 150, peak: 210 },
    image: prestigiaJubaea15_1,
    images: [
      prestigiaJubaea15_1,
      prestigiaJubaea15_2,
      prestigiaJubaea15_3,
      prestigiaJubaea15_4,
      prestigiaJubaea15_5,
    ],
  },
  {
    slug: "prestigia-saphir-305",
    name: "Prestigia Saphir 305",
    type: "Apartment",
    location: "Prestigia",
    rating: 4.7,
    beds: 3,
    pool: true,
    description: "2-bedroom residence apartment with shared pool, Prestigia.",
    descriptionLong: [
      "A spacious 3-bedroom apartment in the Prestigia Saphir residence. Fitted with a premium coffee machine, designer kitchen and modern finishes.",
      "A residence with a shared pool, 24/7 security and private parking. Close to the Marrakech golf course and shops.",
    ],
    amenities: amenitiesFor("Apartment", true),
    includedServices,
    pricing: { low: 120, high: 200, peak: 280 },
    image: prestigiaSaphir305_1,
    images: [
      prestigiaSaphir305_1,
      prestigiaSaphir305_2,
      prestigiaSaphir305_3,
      prestigiaSaphir305_4,
      prestigiaSaphir305_5,
    ],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}
