import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLabs, getBookings } from '../services/api';
import { Lab, Booking, User } from '../types';

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  labs: Lab[];
  setLabs: (labs: Lab[]) => void;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  selectedLab: Lab | null;
  setSelectedLab: (lab: Lab | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  fetchLabs: () => Promise<void>;
  fetchBookings: (labId: string | null, year: string, month: string) => Promise<void>;
  fetchUserBookings: (userId: string) => Promise<void>;
};

const BASE_URL = 'http://192.168.1.14:5000';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const data = localStorage.getItem('user');
    if (!data) return null;
    const u = JSON.parse(data);
    return {
      id: u.id,
      name: u.name || u.nome,
      email: u.email,
      role: u.role || u.tipo,
    };
  });

  const [labs, setLabs] = useState<Lab[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const setUser = (u: User | null) => {
    if (u) {
      const normalizedUser: User = {
        id: u.id,
        name: u.name || (u as any).nome,
        email: u.email,
        role: u.role || (u as any).tipo,
      };
      setUserState(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
    } else {
      setUserState(null);
      localStorage.removeItem('user');
    }
  };

  const logout = () => {
    setUser(null);
    setSelectedLab(null);
    setSelectedDate(null);
    setBookings([]);
    setLabs([]);
  };

  const fetchLabs = async () => {
    try {
      const labsData = await getLabs();
      setLabs(labsData);
    } catch (error) {
      console.error('Erro ao carregar laboratórios:', error);
    }
  };

  const fetchBookings = async (labId: string | null, year: string, month: string) => {
    try {
      let bookingsData;
      if (labId) {
        bookingsData = await getBookings(labId, year, month);
      } else {
        const url = `${BASE_URL}/bookings?year=${year}&month=${month}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao carregar agendamentos');
        bookingsData = await res.json();
      }
      setBookings(bookingsData);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  const fetchUserBookings = async (userId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/user/${userId}`);
      if (!res.ok) throw new Error('Erro ao carregar agendamentos do usuário');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos do usuário:', error);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');

    if (user?.id) {
      fetchUserBookings(user.id);
    } else {
      fetchBookings(null, year, month);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
        labs,
        setLabs,
        bookings,
        setBookings,
        selectedLab,
        setSelectedLab,
        selectedDate,
        setSelectedDate,
        fetchLabs,
        fetchBookings,
        fetchUserBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
