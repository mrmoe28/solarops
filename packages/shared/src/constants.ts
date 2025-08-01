export const US_STATES = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
} as const;

export const ROOF_TYPES = [
  'Asphalt Shingle',
  'Metal',
  'Tile',
  'Flat/Membrane',
  'Wood Shake',
  'Slate',
  'Other',
] as const;

export const PROPERTY_TYPES = [
  'Single Family Home',
  'Townhouse',
  'Condo',
  'Multi-Family',
  'Commercial',
  'Other',
] as const;

export const ELECTRICAL_PANEL_SIZES = [
  '100 Amp',
  '125 Amp',
  '150 Amp',
  '200 Amp',
  '225 Amp',
  '400 Amp',
  'Other',
] as const;

export const AGENT_RETRY_CONFIG = {
  maxAttempts: 3,
  backoffMultiplier: 2,
  initialDelay: 5000, // 5 seconds
  maxDelay: 60000, // 1 minute
};

export const QUEUE_NAMES = {
  PERMIT_OFFICE: 'permit-office-queue',
  PARCEL_INFO: 'parcel-info-queue',
  OPEN_SOLAR: 'open-solar-queue',
  PROPOSAL: 'proposal-queue',
} as const;
