// Origin locations for each theory: [longitude, latitude] and place label (used for equirectangular map).
// Where the idea or its main figure originated / was active.

export const MAP_ORIGINS = {
  freud: { coordinates: [16.37, 48.21], place: 'Vienna, Austria' },
  jung: { coordinates: [8.58, 47.32], place: 'Küsnacht, Switzerland' },
  adler: { coordinates: [16.37, 48.21], place: 'Vienna, Austria' },
  pavlov: { coordinates: [30.34, 59.93], place: 'Saint Petersburg, Russia' },
  watson: { coordinates: [-82.4, 34.85], place: 'South Carolina, USA' },
  skinner: { coordinates: [-75.6, 41.94], place: 'Pennsylvania, USA' },
  maslow: { coordinates: [-73.99, 40.65], place: 'New York, USA' },
  rogers: { coordinates: [-87.78, 41.89], place: 'Illinois, USA' },
  piaget: { coordinates: [6.93, 46.99], place: 'Neuchâtel, Switzerland' },
  vygotsky: { coordinates: [30.42, 54.52], place: 'Orsha, Belarus' },
  beck: { coordinates: [-71.41, 41.82], place: 'Rhode Island, USA' },
  ellis: { coordinates: [-73.99, 40.71], place: 'New York, USA' },
  bandura: { coordinates: [-112.34, 53.59], place: 'Alberta, Canada' },
  milgram: { coordinates: [-73.79, 40.73], place: 'New York, USA' },
  zimbardo: { coordinates: [-73.95, 40.78], place: 'New York, USA' },
  seligman: { coordinates: [-73.76, 42.65], place: 'New York, USA' },
  asch: { coordinates: [21.01, 52.23], place: 'Warsaw, Poland' },
  'eastern-mindfulness': { coordinates: [84.99, 27.48], place: 'Bodh Gaya, India' },
  'yoga-psych': { coordinates: [77.21, 28.61], place: 'India' },
  confucian: { coordinates: [116.98, 35.60], place: 'Qufu, China' },
  ubuntu: { coordinates: [28.05, -26.20], place: 'South Africa' },
  fanon: { coordinates: [-61.07, 14.61], place: 'Martinique' },
  'liberation-psych': { coordinates: [-89.19, 13.69], place: 'El Salvador' },
  'indigenous-holistic': { coordinates: [-106.35, 56.13], place: 'North America' },
};

export function getMapOrigin(theoryId) {
  return MAP_ORIGINS[theoryId] || null;
}
