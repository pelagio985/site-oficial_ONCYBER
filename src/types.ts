export interface Service {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  iconName: string; // Used to dynamically map Lucide icons
  deliverables: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  feedback: string;
  avatar: string;
}

export interface PartnerLogo {
  name: string;
  displayName: string;
  iconName: string;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  selectedServices: number[];
  message: string;
  urgency: 'low' | 'medium' | 'high';
}
