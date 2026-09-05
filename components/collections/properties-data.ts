export type PropertyType = "Villa" | "Apartment" | "Riad";

export interface Property {
  name: string;
  type: PropertyType;
  location: string;
  rating: number;
  beds: number;
  pool: boolean;
  top?: boolean;
  description: string;
}

export const properties: Property[] = [
  {
    name: "Villa Nerolia",
    type: "Villa",
    location: "Noria Golf",
    rating: 4.9,
    beds: 5,
    pool: true,
    top: true,
    description: "Contemporary 5-bedroom villa in the Noria Golf residence.",
  },
  {
    name: "Villa Hajar",
    type: "Villa",
    location: "Route de l'Ourika",
    rating: 4.9,
    beds: 5,
    pool: true,
    top: true,
    description: "Family villa with an olive-tree garden, Route de l'Ourika.",
  },
  {
    name: "Villa Golf Amelkis",
    type: "Villa",
    location: "Amelkis",
    rating: 4.9,
    beds: 4,
    pool: true,
    top: true,
    description: "Prestige 4-bedroom villa facing the Amelkis golf course.",
  },
  {
    name: "Riad Yasmine",
    type: "Riad",
    location: "Marrakech Medina",
    rating: 4.8,
    beds: 3,
    pool: false,
    description: "Traditional riad with a rooftop terrace, steps from Jemaa el-Fna.",
  },
  {
    name: "Loft Guéliz",
    type: "Apartment",
    location: "Guéliz",
    rating: 4.7,
    beds: 2,
    pool: false,
    description: "Modern 2-bedroom apartment in the heart of Guéliz.",
  },
  {
    name: "Villa Oasis",
    type: "Villa",
    location: "Palmeraie",
    rating: 4.9,
    beds: 6,
    pool: true,
    top: true,
    description: "Private pool villa surrounded by palm groves in the Palmeraie.",
  },
];
