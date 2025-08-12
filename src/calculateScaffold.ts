import { layherParts, ScaffoldPart } from "./layherParts";

type Input = {
  length: number; // meters
  width: number;  // meters
  height: number; // meters
};

export type PartRequirement = {
  part: ScaffoldPart;
  count: number;
};

export function calculateScaffold({ length, width, height }: Input): PartRequirement[] {
  // For simplicity, use only 2.0m vertical standards, 2.07m ledgers, 2.57m decks

  // Calculate bays (distance between standards)
  const bayLength = 2.07; // meters (Ledger)
  const bayWidth = 1.09;  // meters (Ledger)
  const deckLength = 2.57; // meters

  const baysLength = Math.ceil(length / bayLength);
  const baysWidth = Math.ceil(width / bayWidth);
  const deckRows = baysWidth;
  const deckCols = Math.ceil(length / deckLength);

  // Verticals: At every intersection (corner of each bay, all levels)
  const levels = Math.ceil(height / 2.0) + 1; // +1 for top level
  const verticals = (baysLength + 1) * (baysWidth + 1) * levels;

  // Ledgers: Around each bay, per level (simplified, only long ledgers)
  const ledgersLong = (baysLength + 1) * baysWidth * levels;
  const ledgersShort = (baysWidth + 1) * baysLength * levels;

  // Decks: Fill scaffold top area
  const decks = deckRows * deckCols;

  return [
    { part: layherParts.find(p => p.partNumber === "2601.200")!, count: verticals },
    { part: layherParts.find(p => p.partNumber === "2602.207")!, count: ledgersLong },
    { part: layherParts.find(p => p.partNumber === "2602.109")!, count: ledgersShort },
    { part: layherParts.find(p => p.partNumber === "2611.257")!, count: decks },
  ];
}