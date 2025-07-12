export type LabCategory = 'tecnologia' | 'eletronica' | 'maker';

export type Lab = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  equipment: string[];
  category: LabCategory;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'aluno' | 'user';
};




export type Booking = {
  id: string;
  labId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  students: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  allDay: boolean;
  recurring: boolean;
  recurringCount?: number;
};
