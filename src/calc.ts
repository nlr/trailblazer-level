export const levels: {
  [level: number]: {
    exp: number;
    totalExp: number;
    equilibriumLevel: EquilibriumLevel;
  };
} = {
  1: { exp: 0, totalExp: 0, equilibriumLevel: 0 },
  2: { exp: 450, totalExp: 450, equilibriumLevel: 0 },
  3: { exp: 500, totalExp: 950, equilibriumLevel: 0 },
  4: { exp: 550, totalExp: 1500, equilibriumLevel: 0 },
  5: { exp: 610, totalExp: 2110, equilibriumLevel: 0 },
  6: { exp: 670, totalExp: 2780, equilibriumLevel: 0 },
  7: { exp: 720, totalExp: 3500, equilibriumLevel: 0 },
  8: { exp: 780, totalExp: 4280, equilibriumLevel: 0 },
  9: { exp: 840, totalExp: 5120, equilibriumLevel: 0 },
  10: { exp: 900, totalExp: 6020, equilibriumLevel: 0 },
  11: { exp: 960, totalExp: 6980, equilibriumLevel: 0 },
  12: { exp: 1020, totalExp: 8000, equilibriumLevel: 0 },
  13: { exp: 1070, totalExp: 9070, equilibriumLevel: 0 },
  14: { exp: 1130, totalExp: 10200, equilibriumLevel: 0 },
  15: { exp: 1190, totalExp: 11390, equilibriumLevel: 0 },
  16: { exp: 1250, totalExp: 12640, equilibriumLevel: 0 },
  17: { exp: 1310, totalExp: 13950, equilibriumLevel: 0 },
  18: { exp: 1370, totalExp: 15320, equilibriumLevel: 0 },
  19: { exp: 1430, totalExp: 16750, equilibriumLevel: 0 },
  20: { exp: 1500, totalExp: 18250, equilibriumLevel: 1 },
  21: { exp: 1600, totalExp: 19850, equilibriumLevel: 1 },
  22: { exp: 1710, totalExp: 21560, equilibriumLevel: 1 },
  23: { exp: 1830, totalExp: 23390, equilibriumLevel: 1 },
  24: { exp: 1950, totalExp: 25340, equilibriumLevel: 1 },
  25: { exp: 2080, totalExp: 27420, equilibriumLevel: 1 },
  26: { exp: 2210, totalExp: 29630, equilibriumLevel: 1 },
  27: { exp: 2350, totalExp: 31980, equilibriumLevel: 1 },
  28: { exp: 2480, totalExp: 34460, equilibriumLevel: 1 },
  29: { exp: 2620, totalExp: 37080, equilibriumLevel: 1 },
  30: { exp: 2750, totalExp: 39830, equilibriumLevel: 2 },
  31: { exp: 2850, totalExp: 42680, equilibriumLevel: 2 },
  32: { exp: 2960, totalExp: 45640, equilibriumLevel: 2 },
  33: { exp: 3080, totalExp: 48720, equilibriumLevel: 2 },
  34: { exp: 3200, totalExp: 51920, equilibriumLevel: 2 },
  35: { exp: 3330, totalExp: 55250, equilibriumLevel: 2 },
  36: { exp: 3460, totalExp: 58710, equilibriumLevel: 2 },
  37: { exp: 3600, totalExp: 62310, equilibriumLevel: 2 },
  38: { exp: 3730, totalExp: 66040, equilibriumLevel: 2 },
  39: { exp: 3870, totalExp: 69910, equilibriumLevel: 2 },
  40: { exp: 4000, totalExp: 73910, equilibriumLevel: 3 },
  41: { exp: 4140, totalExp: 78050, equilibriumLevel: 3 },
  42: { exp: 4280, totalExp: 82330, equilibriumLevel: 3 },
  43: { exp: 4430, totalExp: 86760, equilibriumLevel: 3 },
  44: { exp: 4570, totalExp: 91330, equilibriumLevel: 3 },
  45: { exp: 4710, totalExp: 96040, equilibriumLevel: 3 },
  46: { exp: 4860, totalExp: 100900, equilibriumLevel: 3 },
  47: { exp: 5000, totalExp: 105900, equilibriumLevel: 3 },
  48: { exp: 5150, totalExp: 111050, equilibriumLevel: 3 },
  49: { exp: 5300, totalExp: 116350, equilibriumLevel: 3 },
  50: { exp: 5440, totalExp: 121790, equilibriumLevel: 4 },
  51: { exp: 5700, totalExp: 127490, equilibriumLevel: 4 },
  52: { exp: 6150, totalExp: 133640, equilibriumLevel: 4 },
  53: { exp: 6630, totalExp: 140270, equilibriumLevel: 4 },
  54: { exp: 7130, totalExp: 147400, equilibriumLevel: 4 },
  55: { exp: 7640, totalExp: 155040, equilibriumLevel: 4 },
  56: { exp: 8170, totalExp: 163210, equilibriumLevel: 4 },
  57: { exp: 8700, totalExp: 171910, equilibriumLevel: 4 },
  58: { exp: 9230, totalExp: 181140, equilibriumLevel: 4 },
  59: { exp: 9780, totalExp: 190920, equilibriumLevel: 4 },
  60: { exp: 10330, totalExp: 201250, equilibriumLevel: 5 },
  61: { exp: 20300, totalExp: 221550, equilibriumLevel: 5 },
  62: { exp: 21780, totalExp: 243330, equilibriumLevel: 5 },
  63: { exp: 23350, totalExp: 266680, equilibriumLevel: 5 },
  64: { exp: 24970, totalExp: 291650, equilibriumLevel: 5 },
  65: { exp: 26630, totalExp: 318280, equilibriumLevel: 6 },
  66: { exp: 65070, totalExp: 383350, equilibriumLevel: 6 },
  67: { exp: 68810, totalExp: 452160, equilibriumLevel: 6 },
  68: { exp: 72490, totalExp: 524650, equilibriumLevel: 6 },
  69: { exp: 76120, totalExp: 600770, equilibriumLevel: 6 },
  70: { exp: 79710, totalExp: 680480, equilibriumLevel: 6 },
};

type ActivityExp = number;
type EquilibriumLevel = number;

export const dailyActivityExp: Map<EquilibriumLevel, ActivityExp> = new Map([
  [0, 200],
  [1, 230],
  [2, 260],
  [3, 290],
  [4, 320],
  [5, 350],
  [6, 380],
]);

interface PowerRefill {
  [key: number]: { jadeCost: number; totalCost: number };
}

export const powerRefill: PowerRefill = {
  0: { jadeCost: 0, totalCost: 0 },
  1: { jadeCost: 50, totalCost: 50 },
  2: { jadeCost: 75, totalCost: 125 },
  3: { jadeCost: 75, totalCost: 200 },
  4: { jadeCost: 100, totalCost: 300 },
  5: { jadeCost: 100, totalCost: 400 },
  6: { jadeCost: 150, totalCost: 550 },
  7: { jadeCost: 150, totalCost: 700 },
  8: { jadeCost: 200, totalCost: 900 },
};

export function getDateAfter(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  return today.toLocaleDateString();
}
