export type Race = {
  round: number
  name: string
  circuit: string
  city: string
  country: string
  /** Approximate race start in UTC. Check the official schedule for final times. */
  start: string
  sprint?: boolean
  night?: boolean
}

export const season = 2026

export const races: Race[] = [
  {
    round: 1,
    name: 'Australian Grand Prix',
    circuit: 'Albert Park',
    city: 'Melbourne',
    country: 'AUS',
    start: '2026-03-08T04:00:00Z',
  },
  {
    round: 2,
    name: 'Chinese Grand Prix',
    circuit: 'Shanghai International Circuit',
    city: 'Shanghai',
    country: 'CHN',
    start: '2026-03-15T07:00:00Z',
    sprint: true,
  },
  {
    round: 3,
    name: 'Japanese Grand Prix',
    circuit: 'Suzuka',
    city: 'Suzuka',
    country: 'JPN',
    start: '2026-03-29T05:00:00Z',
  },
  {
    round: 4,
    name: 'Bahrain Grand Prix',
    circuit: 'Bahrain International Circuit',
    city: 'Sakhir',
    country: 'BHR',
    start: '2026-04-12T15:00:00Z',
    night: true,
  },
  {
    round: 5,
    name: 'Saudi Arabian Grand Prix',
    circuit: 'Jeddah Corniche Circuit',
    city: 'Jeddah',
    country: 'KSA',
    start: '2026-04-19T17:00:00Z',
    night: true,
  },
  {
    round: 6,
    name: 'Miami Grand Prix',
    circuit: 'Miami International Autodrome',
    city: 'Miami',
    country: 'USA',
    start: '2026-05-03T20:00:00Z',
    sprint: true,
  },
  {
    round: 7,
    name: 'Canadian Grand Prix',
    circuit: 'Circuit Gilles Villeneuve',
    city: 'Montréal',
    country: 'CAN',
    start: '2026-05-24T18:00:00Z',
    sprint: true,
  },
  {
    round: 8,
    name: 'Monaco Grand Prix',
    circuit: 'Circuit de Monaco',
    city: 'Monte Carlo',
    country: 'MON',
    start: '2026-06-07T13:00:00Z',
  },
  {
    round: 9,
    name: 'Barcelona-Catalunya Grand Prix',
    circuit: 'Circuit de Barcelona-Catalunya',
    city: 'Barcelona',
    country: 'ESP',
    start: '2026-06-14T13:00:00Z',
  },
  {
    round: 10,
    name: 'Austrian Grand Prix',
    circuit: 'Red Bull Ring',
    city: 'Spielberg',
    country: 'AUT',
    start: '2026-06-28T13:00:00Z',
  },
  {
    round: 11,
    name: 'British Grand Prix',
    circuit: 'Silverstone',
    city: 'Silverstone',
    country: 'GBR',
    start: '2026-07-05T14:00:00Z',
    sprint: true,
  },
  {
    round: 12,
    name: 'Belgian Grand Prix',
    circuit: 'Spa-Francorchamps',
    city: 'Stavelot',
    country: 'BEL',
    start: '2026-07-19T13:00:00Z',
  },
  {
    round: 13,
    name: 'Hungarian Grand Prix',
    circuit: 'Hungaroring',
    city: 'Budapest',
    country: 'HUN',
    start: '2026-07-26T13:00:00Z',
  },
  {
    round: 14,
    name: 'Dutch Grand Prix',
    circuit: 'Zandvoort',
    city: 'Zandvoort',
    country: 'NED',
    start: '2026-08-23T13:00:00Z',
    sprint: true,
  },
  {
    round: 15,
    name: 'Italian Grand Prix',
    circuit: 'Monza',
    city: 'Monza',
    country: 'ITA',
    start: '2026-09-06T13:00:00Z',
  },
  {
    round: 16,
    name: 'Spanish Grand Prix',
    circuit: 'Madring',
    city: 'Madrid',
    country: 'ESP',
    start: '2026-09-13T13:00:00Z',
  },
  {
    round: 17,
    name: 'Azerbaijan Grand Prix',
    circuit: 'Baku City Circuit',
    city: 'Baku',
    country: 'AZE',
    start: '2026-09-26T11:00:00Z',
  },
  {
    round: 18,
    name: 'Singapore Grand Prix',
    circuit: 'Marina Bay',
    city: 'Singapore',
    country: 'SGP',
    start: '2026-10-11T12:00:00Z',
    night: true,
    sprint: true,
  },
  {
    round: 19,
    name: 'United States Grand Prix',
    circuit: 'Circuit of the Americas',
    city: 'Austin',
    country: 'USA',
    start: '2026-10-25T19:00:00Z',
  },
  {
    round: 20,
    name: 'Mexico City Grand Prix',
    circuit: 'Autódromo Hermanos Rodríguez',
    city: 'Mexico City',
    country: 'MEX',
    start: '2026-11-01T20:00:00Z',
  },
  {
    round: 21,
    name: 'São Paulo Grand Prix',
    circuit: 'Interlagos',
    city: 'São Paulo',
    country: 'BRA',
    start: '2026-11-08T17:00:00Z',
  },
  {
    round: 22,
    name: 'Las Vegas Grand Prix',
    circuit: 'Las Vegas Strip Circuit',
    city: 'Las Vegas',
    country: 'USA',
    start: '2026-11-22T04:00:00Z',
    night: true,
  },
  {
    round: 23,
    name: 'Qatar Grand Prix',
    circuit: 'Lusail International Circuit',
    city: 'Lusail',
    country: 'QAT',
    start: '2026-11-29T16:00:00Z',
    night: true,
  },
  {
    round: 24,
    name: 'Abu Dhabi Grand Prix',
    circuit: 'Yas Marina',
    city: 'Abu Dhabi',
    country: 'UAE',
    start: '2026-12-06T13:00:00Z',
  },
]

export type Team = {
  name: string
  base: string
  powerUnit: string
  color: string
  drivers: [string, string]
}

export const teams: Team[] = [
  {
    name: 'McLaren',
    base: 'Woking, UK',
    powerUnit: 'Mercedes',
    color: '#ff8000',
    drivers: ['Lando Norris', 'Oscar Piastri'],
  },
  {
    name: 'Ferrari',
    base: 'Maranello, Italy',
    powerUnit: 'Ferrari',
    color: '#e8002d',
    drivers: ['Charles Leclerc', 'Lewis Hamilton'],
  },
  {
    name: 'Mercedes',
    base: 'Brackley, UK',
    powerUnit: 'Mercedes',
    color: '#27f4d2',
    drivers: ['George Russell', 'Kimi Antonelli'],
  },
  {
    name: 'Red Bull Racing',
    base: 'Milton Keynes, UK',
    powerUnit: 'Red Bull Ford',
    color: '#3671c6',
    drivers: ['Max Verstappen', 'Isack Hadjar'],
  },
  {
    name: 'Aston Martin',
    base: 'Silverstone, UK',
    powerUnit: 'Honda',
    color: '#229971',
    drivers: ['Fernando Alonso', 'Lance Stroll'],
  },
  {
    name: 'Williams',
    base: 'Grove, UK',
    powerUnit: 'Mercedes',
    color: '#64c4ff',
    drivers: ['Alex Albon', 'Carlos Sainz'],
  },
  {
    name: 'Alpine',
    base: 'Enstone, UK',
    powerUnit: 'Mercedes',
    color: '#ff87bc',
    drivers: ['Pierre Gasly', 'Franco Colapinto'],
  },
  {
    name: 'Racing Bulls',
    base: 'Faenza, Italy',
    powerUnit: 'Red Bull Ford',
    color: '#6692ff',
    drivers: ['Liam Lawson', 'Arvid Lindblad'],
  },
  {
    name: 'Haas',
    base: 'Kannapolis, USA',
    powerUnit: 'Ferrari',
    color: '#b6babd',
    drivers: ['Esteban Ocon', 'Oliver Bearman'],
  },
  {
    name: 'Audi',
    base: 'Hinwil, Switzerland',
    powerUnit: 'Audi',
    color: '#c1c6c8',
    drivers: ['Nico Hülkenberg', 'Gabriel Bortoleto'],
  },
  {
    name: 'Cadillac',
    base: 'Silverstone, UK & Indiana, USA',
    powerUnit: 'Ferrari',
    color: '#d4af37',
    drivers: ['Sergio Pérez', 'Valtteri Bottas'],
  },
]

export const regulations = [
  {
    stat: '≈50%',
    title: 'Electric power',
    description:
      'New power units split output close to evenly between the combustion engine and a far stronger hybrid system.',
  },
  {
    stat: '100%',
    title: 'Sustainable fuel',
    description:
      'Cars run on advanced sustainable fuels, part of the sport’s push toward net-zero.',
  },
  {
    stat: 'Active',
    title: 'Movable aero',
    description:
      'Front and rear wings switch between high-downforce and low-drag modes, replacing DRS.',
  },
  {
    stat: 'Lighter',
    title: 'Nimbler cars',
    description:
      'Shorter, narrower and lighter chassis designed for closer racing and more overtaking.',
  },
]

/** Returns the first race that has not yet started, or undefined once the season is over. */
export function nextRace(now: number, list: Race[] = races) {
  return list.find((race) => Date.parse(race.start) > now)
}
