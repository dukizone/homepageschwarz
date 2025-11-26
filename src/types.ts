
export interface Accommodation {
  id: string;
  title: string;
  type: 'Haus' | 'Wohnung';
  guests: number;
  bedrooms: number;
  price: number;
  image: string;
  rating: number;
  features: string[];
  icalUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SectionId {
  HERO = 'hero',
  LISTINGS = 'ferienwohnungen',
  GUIDE = 'reisefuehrer',
  REVIEWS = 'bewertungen',
  CONTACT = 'kontakt',
}
