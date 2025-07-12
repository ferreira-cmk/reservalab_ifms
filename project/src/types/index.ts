export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  capacity: number;
  equipment: string[];
  category: 'tecnologia' | 'eletronica' | 'maker';
}

// src/types/index.ts
export type Student = {
  id: string;
  name: string;
};


export interface Booking {
  id: string;
  labId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  students: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  recurring?: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}