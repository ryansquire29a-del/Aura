export type ServiceTierId = 'hourly' | 'extended' | 'overnight';

export interface ServiceTier {
  id: ServiceTierId;
  name: string;
  tagline: string;
  baseRate: number;
  durationLabel: string;
  minHours?: number;
  maxHours?: number;
  hourlyRate?: number;
  description: string;
  inclusions: string[];
  bestFor: string;
}

export interface AdelaideVenue {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  vibe: string;
  itinerary: {
    arrival: string;
    dining: string;
    drinks: string;
    transition: string;
  };
  recommendedWine: string;
  bestSuitedFor: string;
}

export interface LuxuryEssentialItem {
  id: string;
  category: 'grooming' | 'atmosphere' | 'practical';
  title: string;
  description: string;
  detail: string;
  isPacked: boolean;
}

export interface PrepRoutineStep {
  id: string;
  stepNumber: number;
  timing: string;
  title: string;
  objective: string;
  checklist: string[];
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: 'email' | 'signal' | 'sms';
  selectedService: ServiceTierId;
  hoursCount: number; // for hourly service
  date: string;
  time: string;
  hotelVenueType: 'eos' | 'mayfair' | 'mount_lofty' | 'custom';
  customHotelName: string;
  roomNumber: string;
  hasConfirmedReservation: boolean;
  specialDesires: string;
  boundariesOrHealthNotes: string;
  verificationMethod: 'social' | 'id_upload';
  socialLink: string;
  idFileName: string;
  paymentMethod: 'payid' | 'crypto' | 'cash_balance';
  agreedToTerms: boolean;
  agreedToScreening: boolean;
}

export interface BuddySystemState {
  clientName: string;
  clientPhone: string;
  hotelName: string;
  roomNumber: string;
  scheduledDurationHours: number;
  scheduledEndTime: string;
  status: 'pre_booking' | 'inside_active' | 'extended' | 'safely_checked_out' | 'overdue';
  checkInTimestamp?: string;
  buddyPhone: string;
  extensionMinutes: number;
}
