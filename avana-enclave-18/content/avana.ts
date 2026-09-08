export const content = {
  project: {
    name: 'Avana Enclave 18',
    developer: 'Batra & Sankhe Buildcon',
    legalDeveloper: 'Batra and Sons Infra Realty Developers LLP',
    units: 18,
    landAcres: 2,
    location: 'Karjat Shindhol, Karjat Valley, Raigad, Maharashtra 410201',
    configuration: 'Ground + first floor + terrace',
    plotSqft: 3500,
    builtUpSqft: 2500,
    carpetSqft: 1950,
    airportMinutes: 95,
    possession: '9 months from booking'
  },
  pools: [
    { id: 'A', name: 'Standard family pool', ft: [12, 12], m: [3.7, 3.7] },
    { id: 'B', name: 'Premium lap pool', ft: [8, 23], m: [2.4, 7.0] },
    { id: 'C', name: 'Luxury pool with jacuzzi', ft: [10, 20], m: [3.0, 6.1] }
  ] as const,
  amenities: [
    ['Clubhouse', 'Lounge, indoor games and a multipurpose hall for gatherings.'],
    ['Clubhouse pool', 'A resort-style pool for the community, beyond your own.'],
    ['Restaurant', 'On-site dining for weekends and guests.'],
    ['Organic supermarket', 'Everyday essentials without leaving the gate.'],
    ["Kids' play area", 'A dedicated, enclosed play zone.'],
    ['Meditation zones', 'Quiet sit-outs at the edge of the slope.'],
    ['Water bodies', 'Landscaped water features through the enclave.'],
    ['Mango and Ashoka planting', 'Shade trees chosen for the terrain.'],
    ['Paved internal roads', 'Black bitumen, graded for the slope.'],
    ['24/7 security', 'Perimeter wall, gates and manned entry.']
  ],
  features: [
    ['Designer elevation', 'Premium architectural facade with bespoke designer finishes, crafted to reflect luxury living and distinguished curb appeal.'],
    ['Master suite bathtub', 'A freestanding bathtub with designer CP fittings in the master suite.'],
    ['Landscaped garden', 'Manicured planting, an outdoor leisure deck and a private gazebo.'],
    ['Pool options', 'Standard family pool, premium lap pool or a luxury pool with jacuzzi — chosen at booking.']
  ]
} as const;
