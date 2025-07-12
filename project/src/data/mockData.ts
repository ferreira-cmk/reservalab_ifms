// src/data/mockData.ts

import { Lab, User, Booking} from '../types';

export const mockLabs: Lab[] = [
  {
    id: '1',
    name: 'Lab de Informática 1',
    description: 'Laboratório com 30 computadores equipados com softwares de desenvolvimento',
    capacity: 30,
    equipment: ['Computadores Dell', 'Projetores', 'Ar-condicionado'],
    category: 'tecnologia'
  },
  {
    id: '2',
    name: 'Lab de Eletrônica',
    description: 'Laboratório especializado em circuitos e componentes eletrônicos',
    capacity: 20,
    equipment: ['Bancadas', 'Osciloscópios', 'Fontes de alimentação'],
    category: 'eletronica'
  },
  {
    id: '3',
    name: 'Maker Space',
    description: 'Espaço criativo com impressoras 3D e ferramentas de prototipagem',
    capacity: 15,
    equipment: ['Impressoras 3D', 'Arduino', 'Ferramentas manuais'],
    category: 'maker'
  },
  {
    id: '4',
    name: 'Lab de Redes',
    description: 'Laboratório para práticas de configuração de redes e servidores',
    capacity: 25,
    equipment: ['Switches', 'Roteadores', 'Servidores'],
    category: 'tecnologia'
  },
  {
    id: '5',
    name: 'Lab de Robótica',
    description: 'Espaço dedicado ao desenvolvimento de projetos robóticos',
    capacity: 18,
    equipment: ['Kits de robótica', 'Sensores', 'Atuadores'],
    category: 'eletronica'
  },
  {
    id: '6',
    name: 'Lab Multimídia',
    description: 'Laboratório para edição de vídeo e produção digital',
    capacity: 20,
    equipment: ['Computadores Mac', 'Câmeras', 'Equipamentos de áudio'],
    category: 'tecnologia'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Admin Teste',
  email: 'admin@escola.com',
  role: 'admin',
};

export const mockBookings: Booking[] = [
  {
    id: '6',
    labId: '1',
    userId: '1',
    date: '2025-07-10',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Reserva teste funcional',
    students: 20,
    status: 'confirmed',
    allDay: false,
    recurring: false  // Adicionado
  },
  {
    id: '2',
    labId: '2',
    userId: '1',
    date: '2024-07-18',
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Projeto de circuitos',
    students: 15,
    status: 'confirmed',
    allDay: false,
    recurring: false  // Adicionado
  },
  {
    id: '3',
    labId: '3',
    userId: '1',
    date: '2024-07-17',
    startTime: '00:00',
    endTime: '23:59',
    purpose: 'Dia de uso livre do Maker',
    students: 12,
    status: 'pending',
    allDay: true,
    recurring: false  // Adicionado
  }
];


// export const mockStudents: Student[] = [
//   { id: '1', name: 'João da Silva', course: 'Engenharia', turma: '2024A' },
//   { id: '2', name: 'Maria Oliveira', course: 'Informática', turma: '2023B' },
//   { id: '3', name: 'Carlos Souza', course: 'Engenharia', turma: '2024B' },
//   { id: '4', name: 'Fernanda Dias', course: 'Eletrônica', turma: '2023A' }
//   // ...adicione mais estudantes se quiser
// ];
