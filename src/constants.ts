
import { Accommodation, Testimonial } from './types';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: '1',
    title: 'Waldhaus "Fuchsbau"',
    type: 'Haus',
    guests: 6,
    bedrooms: 3,
    price: 145,
    rating: 4.9,
    image: 'https://picsum.photos/800/1000?random=1',
    features: ['Kamin', 'Sauna', 'Waldrand'],
    icalUrl: 'https://www.airbnb.com/calendar/ical/1345608403986703089.ics?s=ec334041650d51a74b6320bad50d39fe&locale=de'
  },
  {
    id: '2',
    title: 'Apartment "Tannenzapfen"',
    type: 'Wohnung',
    guests: 4,
    bedrooms: 2,
    price: 95,
    rating: 4.8,
    image: 'https://picsum.photos/800/1000?random=2',
    features: ['Balkon', 'WLAN', 'Kinderfreundlich'],
    icalUrl: 'https://www.airbnb.com/calendar/ical/947626755793190991.ics?s=3395a9b3a16d5e736b454360ff356602&locale=de'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Familie Müller',
    role: 'Aus Berlin',
    text: 'Der perfekte Ort, um dem Stadtlärm zu entfliehen. Die Kinder liebten den Wald direkt vor der Tür. Wir kommen definitiv wieder!',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah & Tom',
    role: 'Wanderer aus München',
    text: 'Unglaubliche Ruhe und sehr gemütliche Ausstattung. Der Kaminofen war unser Highlight an den kühlen Abenden.',
    rating: 5
  },
  {
    id: '3',
    name: 'Markus Weber',
    role: 'Familienvater',
    text: 'Super sauber und top ausgestattet. Der Kontakt war sehr herzlich und unkompliziert. Absolut empfehlenswert für Familien.',
    rating: 5
  }
];
