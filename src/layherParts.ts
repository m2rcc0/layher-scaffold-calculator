export type ScaffoldPart = {
  name: string;
  partNumber: string;
  type: "standard" | "ledger" | "deck";
  length_m?: number;
  height_m?: number;
  material: "steel" | "aluminum";
};

export const layherParts: ScaffoldPart[] = [
  {
    name: "Standard Vertical 2.0m",
    partNumber: "2601.200",
    type: "standard",
    height_m: 2.0,
    material: "steel",
  },
  {
    name: "Ledger 2.07m",
    partNumber: "2602.207",
    type: "ledger",
    length_m: 2.07,
    material: "steel",
  },
  {
    name: "Ledger 1.09m",
    partNumber: "2602.109",
    type: "ledger",
    length_m: 1.09,
    material: "steel",
  },
  {
    name: "Deck 2.57m",
    partNumber: "2611.257",
    type: "deck",
    length_m: 2.57,
    material: "steel",
  },
  // Add more as needed
];