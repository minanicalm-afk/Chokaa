const rates = {
  "boundary-wall": {
    unit: "m",
    label: "Boundary wall",
    low: 9000,
    high: 18000,
  },
  "cabro-paving": {
    unit: "m²",
    label: "Cabro paving",
    low: 2800,
    high: 4500,
  },
  renovation: {
    unit: "rooms",
    label: "Renovation",
    low: 250000,
    high: 700000,
  },
  "fit-out": {
    unit: "m²",
    label: "Fit-out",
    low: 45000,
    high: 95000,
  },
} as const;

export type EstimatorType = keyof typeof rates;

export const estimatorChoices: Array<{
  value: EstimatorType;
  label: string;
  quantityLabel: string;
  unit: string;
}> = [
  {
    value: "boundary-wall",
    label: "Boundary wall",
    quantityLabel: "Length",
    unit: "metres",
  },
  {
    value: "cabro-paving",
    label: "Cabro paving",
    quantityLabel: "Area",
    unit: "square metres",
  },
  {
    value: "renovation",
    label: "Renovation",
    quantityLabel: "Rooms",
    unit: "rooms",
  },
  {
    value: "fit-out",
    label: "Commercial fit-out",
    quantityLabel: "Floor area",
    unit: "square metres",
  },
];

const kes = new Intl.NumberFormat("en-KE");

export function estimate(projectType: EstimatorType, quantity: number) {
  const rate = rates[projectType];
  const low = rate.low * quantity;
  const high = rate.high * quantity;
  const range = `KSh ${kes.format(low)} – ${kes.format(high)}`;
  return {
    range,
    unit: rate.unit,
    label: rate.label,
    disclaimer:
      "Indicative only. Final costs depend on site conditions, materials, and scope. Request a quote for an accurate figure.",
  };
}
