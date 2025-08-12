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
  // Layher system uses standard bay sizes
  const standardBayLength = 2.07; // meters (standard ledger length)
  const standardBayWidth = 1.09;  // meters (standard ledger length)
  const standardHeight = 2.0;     // meters (standard vertical height)

  // Calculate number of bays needed
  const baysAlongLength = Math.ceil(length / standardBayLength);
  const baysAlongWidth = Math.ceil(width / standardBayWidth);
  const levels = Math.ceil(height / standardHeight);

  // Calculate number of standards (verticals) needed
  // Standards are placed at each corner of each bay, at each level
  const standardsPerLevel = (baysAlongLength + 1) * (baysAlongWidth + 1);
  const totalStandards = standardsPerLevel * (levels + 1); // +1 for base level

  // Calculate ledgers needed
  // Long ledgers (2.07m) run along the length direction
  const longLedgersPerLevel = (baysAlongLength) * (baysAlongWidth + 1) * 2; // 2 sides (front/back)
  const totalLongLedgers = longLedgersPerLevel * levels;

  // Short ledgers (1.09m) run along the width direction  
  const shortLedgersPerLevel = (baysAlongWidth) * (baysAlongLength + 1) * 2; // 2 sides (left/right)
  const totalShortLedgers = shortLedgersPerLevel * levels;

  // Calculate decks needed (only for top level typically)
  // Each deck is 2.57m x 0.32m, so we need to cover the total area
  const deckLength = 2.57;
  const deckWidth = 0.32;
  const decksAlongLength = Math.ceil(length / deckLength);
  const decksAlongWidth = Math.ceil(width / deckWidth);
  const totalDecks = decksAlongLength * decksAlongWidth;

  // Calculate diagonal braces (typically 1 per bay per level)
  const totalBraces = baysAlongLength * baysAlongWidth * levels;

  // Calculate base jacks (1 per standard at ground level)
  const totalBaseJacks = standardsPerLevel;

  const requirements: PartRequirement[] = [];

  // Add standards (use 2.0m standards primarily, add 1.0m if needed for height adjustment)
  const standard2m = layherParts.find(p => p.partNumber === "2601.200")!;
  const standard1m = layherParts.find(p => p.partNumber === "2601.100")!;
  
  requirements.push({ part: standard2m, count: totalStandards });
  
  // If height doesn't divide evenly by 2m, add some 1m standards for adjustment
  const heightRemainder = height % standardHeight;
  if (heightRemainder > 0 && heightRemainder < 1.5) {
    const adjustment1mStandards = Math.ceil(standardsPerLevel * 0.5); // Estimate
    requirements.push({ part: standard1m, count: adjustment1mStandards });
  }

  // Add ledgers
  const longLedger = layherParts.find(p => p.partNumber === "2602.207")!;
  const shortLedger = layherParts.find(p => p.partNumber === "2602.109")!;
  
  requirements.push({ part: longLedger, count: totalLongLedgers });
  requirements.push({ part: shortLedger, count: totalShortLedgers });

  // Add decks
  const deck = layherParts.find(p => p.partNumber === "2611.257")!;
  requirements.push({ part: deck, count: totalDecks });

  // Add braces
  const brace = layherParts.find(p => p.partNumber === "2603.257")!;
  requirements.push({ part: brace, count: totalBraces });

  // Add base jacks
  const baseJack = layherParts.find(p => p.partNumber === "2604.500")!;
  requirements.push({ part: baseJack, count: totalBaseJacks });

  // Filter out any requirements with 0 count
  return requirements.filter(req => req.count > 0);
}