export type ScaffoldPart = {
  name: string;
  partNumber: string;
  type: "standard" | "ledger" | "deck" | "brace" | "baseJack" | "toeboard" | "guardrail";
  length_m?: number;   // meters
  height_m?: number;   // meters
  adjustable?: boolean;
  material: "steel" | "aluminum";
  weight_kg?: number;
};

export const layherParts: ScaffoldPart[] = [
  {
    name: "Standard Vertical 2.0m",
    partNumber: "2601.200",
    type: "standard",
    height_m: 2.0,
    material: "steel",
    weight_kg: 8.6,
  },
  {
    name: "Standard Vertical 1.0m",
    partNumber: "2601.100",
    type: "standard",
    height_m: 1.0,
    material: "steel",
    weight_kg: 4.5,
  },
  {
    name: "Ledger 1.09m",
    partNumber: "2602.109",
    type: "ledger",
    length_m: 1.09,
    material: "steel",
    weight_kg: 3.2,
  },
  {
    name: "Ledger 2.07m",
    partNumber: "2602.207",
    type: "ledger",
    length_m: 2.07,
    material: "steel",
    weight_kg: 5.5,
  },
  {
    name: "Deck 2.57m x 0.32m",
    partNumber: "2611.257",
    type: "deck",
    length_m: 2.57,
    material: "steel",
    weight_kg: 15.0,
  },
  {
    name: "Diagonal Brace 2.57m",
    partNumber: "2603.257",
    type: "brace",
    length_m: 2.57,
    material: "steel",
    weight_kg: 5.8,
  },
  {
    name: "Base Jack Adjustable",
    partNumber: "2604.500",
    type: "baseJack",
    adjustable: true,
    material: "steel",
    weight_kg: 4.2,
  },
  // ...add more as needed
];