import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import { useNavigate } from 'react-router-dom';
import { updateBooking, deleteBooking } from '../services/api';

const MyBookings: React.FC = () => {
  const { user, bookings, setBookings, labs } = useApp();
  const [editBookingId, setEditBookingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Booking>>({});
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const myBookings = bookings;

  const handleCancel = async (id: string) => {
    if (!user) {
      alert('Faça login para cancelar agendamentos.');
      return;
    }
    if (window.confirm('Deseja cancelar essa reserva?')) {
      try {
        await deleteBooking(id);
        setBookings(bookings.filter(b => b.id !== id));
      } catch {
        alert('Erro ao cancelar reserva');
      }
    }
  };

  const handleEdit = (booking: Booking) => {
    if (!user) {
      alert('Faça login para editar agendamentos.');
      return;
    }
    setEditBookingId(booking.id);
    setEditData(booking);
    setError('');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!user) {
      alert('Faça login para salvar agendamentos.');
      return;
    }
    if (!editBookingId || !editData.date || !editData.startTime || !editData.endTime) return;

    try {
      await updateBooking(editBookingId, editData);
      setBookings(
        bookings.map(b =>
          b.id === editBookingId ? { ...b, ...editData } : b
        )
      );
      setEditBookingId(null);
      setError('');
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar agendamento');
    }
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg mt-6 p-6">
      <button
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        onClick={goBack}
      >
        <span className="material-icons mr-2">arrow_back</span>
        Voltar para Dashboard
      </button>
      <h1 className="text-xl font-bold mb-4">Meus Agendamentos</h1>

      {!user && (
        <div className="mb-4 text-yellow-600">
          Você não está logado. Pode visualizar os agendamentos, mas precisa fazer login para editar ou cancelar.
        </div>
      )}

      <ul>
        {myBookings.length === 0 && (
          <li className="text-gray-600">Nenhum agendamento encontrado.</li>
        )}
        {myBookings.map(booking =>
          editBookingId === booking.id ? (
            <li key={booking.id} className="mb-4 p-4 border rounded shadow bg-blue-50">
              <div className="mb-2">
                <label className="font-bold mr-2">Propósito:</label>
                <input
                  name="purpose"
                  value={editData.purpose ?? ''}
                  onChange={handleEditChange}
                  className="border p-1 rounded w-1/2"
                />
              </div>
              <div className="mb-2">
                <label className="font-bold mr-2">Data:</label>
                <input
                  type="date"
                  name="date"
                  value={editData.date ?? ''}
                  onChange={handleEditChange}
                  className="border p-1 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="font-bold mr-2">Início:</label>
                <input
                  type="time"
                  name="startTime"
                  value={editData.startTime ?? ''}
                  onChange={handleEditChange}
                  className="border p-1 rounded"
                />
                <label className="font-bold mx-2">Fim:</label>
                <input
                  type="time"
                  name="endTime"
                  value={editData.endTime ?? ''}
                  onChange={handleEditChange}
                  className="border p-1 rounded"
                />
              </div>
              {error && <div className="text-red-600 mb-2">{error}</div>}
              <div>
                <button
                  onClick={handleEditSave}
                  className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditBookingId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            </li>
          ) : (
            <li
              key={booking.id}
              className="mb-3 p-4 border rounded flex justify-between items-center"
            >
              <div>
                <div>
                  <span className="font-bold">Lab:</span>{' '}
                  {labs.find(l => l.id === booking.labId)?.name || 'Desconhecido'}
                </div>
                <div>
                  <span className="font-bold">Data:</span> {booking.date}
                </div>
                <div>
                  <span className="font-bold">Horário:</span>{' '}
                  {booking.allDay
                    ? 'Dia todo'
                    : `${booking.startTime} - ${booking.endTime}`}
                </div>
                <div>
                  <span className="font-bold">Status:</span>{' '}
                  <span className="text-green-600 font-bold">{booking.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(booking)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MyBookings;
