const BASE_URL = 'http://192.168.1.14:5000';

// Função auxiliar para checar resposta e lançar erro com mensagem do backend
async function checkResponse(res: Response) {
  if (!res.ok) {
    let errorMsg = 'Erro desconhecido';
    try {
      const err = await res.json();
      errorMsg = err.error || errorMsg;
    } catch {
      // fallback se não conseguir parsear json
    }
    throw new Error(errorMsg);
  }
  return res.json();
}

// USERS
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return checkResponse(res);
}

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return checkResponse(res);
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    // credentials: 'include', // descomente se usar cookies
  });
  return checkResponse(res);
}

// LABS
export async function getLabs() {
  const res = await fetch(`${BASE_URL}/labs`);
  return checkResponse(res);
}

export async function createLab(lab: {
  name: string;
  description: string;
  capacity: number;
  equipment: string[];
  category: string;
}) {
  const res = await fetch(`${BASE_URL}/labs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lab),
  });
  return checkResponse(res);
}

export async function updateLab(
  id: string,
  updatedLab: {
    name: string;
    description: string;
    capacity: number;
    equipment: string[];
    category: string;
  }
) {
  const res = await fetch(`${BASE_URL}/labs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedLab),
  });
  return checkResponse(res);
}

// BOOKINGS
export async function createBooking(booking: {
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
}) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  return checkResponse(res);
}

export async function updateBooking(
  id: string,
  updatedBooking: Partial<{
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
  }>
) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBooking),
  });
  return checkResponse(res);
}

export async function getBookings(labId: string, year: string, month: string) {
  const res = await fetch(
    `${BASE_URL}/bookings?lab_id=${labId}&year=${year}&month=${month}`
  );
  return checkResponse(res);
}

export async function deleteBooking(id: string) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  return checkResponse(res);
}

// BUSCA AGENDAMENTOS DO USUÁRIO
export async function getUserBookings(userId: string) {
  const res = await fetch(`${BASE_URL}/bookings/user/${userId}`);
  return checkResponse(res);
}
