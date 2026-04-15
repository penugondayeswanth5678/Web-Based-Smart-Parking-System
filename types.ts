
export type AuthMode = 'login' | 'register' | 'forgot-password' | 'dashboard';
export type DashboardView = 'main' | 'bookings' | 'profile' | 'admin';

export interface VehicleDetails {
  plateNumber: string;
  type: 'Car' | 'Bike' | 'EV' | 'SUV' | 'Other';
}

export interface DocumentDetails {
  drivingLicense?: string;
  govId?: string;
  ageProof?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  vehicle: VehicleDetails;
  documents: DocumentDetails;
  isVerified: boolean;
  role?: 'user' | 'admin';
}

export interface ParkingLocation {
  id: string;
  name: string;
  area: string;
  totalSlots: number;
  pricePerHour: number;
  isPeakHour: boolean;
  description: string;
  image: string;
}

export interface ParkingSlot {
  id: number;
  isBooked: boolean;
}

export interface Booking {
  id: string;
  userEmail: string;
  locationName: string;
  slotNumber: number;
  date: string;
  duration: number;
  totalAmount: number;
  status: 'Active' | 'Completed' | 'Cancelled';
}
