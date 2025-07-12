import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { getBookings, createBooking } from '../services/api';

const BookingModal: React.FC = () => {
  const { labs, user, selectedDate, selectedLab, fetchBookings } = useApp();
  const navigate = useNavigate();

  const [allDay, setAllDay] = useState(true);
  const [labCategory, setLabCategory] = useState('tecnologia');
  const [labId, setLabId] = useState(selectedLab ? selectedLab.id : '');
  const [responsible] = useState(user?.name || '');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(() => {
    return selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
  });
  const [success, setSuccess] = useState(false);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate.toISOString().split('T')[0]);
    }
    if (selectedLab) setLabId(selectedLab.id);
  }, [selectedDate, selectedLab]);

  useEffect(() => {
    if (labId && date) {
      getBookings(labId, date.split('-')[0], date.split('-')[1])
        .then(data => {
          setConflicts(data.filter((b: any) => b.date === date));
        })
        .catch(() => setConflicts([]));
    } else {
      setConflicts([]);
    }
  }, [labId, date]);

  const filteredLabs = labs.filter(lab => lab.category === labCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labId || !date) return;

    if (conflicts.some(b => b.allDay)) {
      alert('Laboratório já reservado para o dia todo.');
      return;
    }

    if (!allDay) {
      const toMinutes = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
      };
      const startA = toMinutes(startTime);
      const endA = toMinutes(endTime);
      const overlaps = conflicts.some(b => {
        if (b.allDay) return true;
        const startB = toMinutes(b.startTime);
        const endB = toMinutes(b.endTime);
        return Math.max(startA, startB) < Math.min(endA, endB);
      });
      if (overlaps) {
        alert('Conflito de horário com outro agendamento!');
        return;
      }
    }

    try {
      await createBooking({
        labId,
        userId: user?.id || '',
        date,
        startTime: allDay ? '00:00' : startTime,
        endTime: allDay ? '23:59' : endTime,
        purpose: notes,
        students: 0,
        status: 'pending',
        allDay,
        recurring: false,
      });
      setSuccess(true);
      await fetchBookings(labId, date.split('-')[0], date.split('-')[1]);
      setTimeout(() => {
        setSuccess(false);
        navigate('/dashboard');
      }, 1200);
    } catch (error: any) {
      setError(error.message || 'Erro ao agendar');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      {success && (
        <div className="text-green-700 font-semibold p-2 rounded bg-green-100 text-center mb-2">
          Agendamento realizado!
        </div>
      )}
      {error && (
        <div className="text-red-700 font-semibold p-2 rounded bg-red-100 text-center mb-2">
          {error}
        </div>
      )}
      {}
      {conflicts.length > 0 && (
        <div className="mb-3 text-sm">
          <strong>Horários já ocupados:</strong>
          <ul>
            {conflicts.map((b, i) => (
              <li key={i} className="text-gray-700">
                {b.allDay ? 'Dia todo' : `${b.startTime} - ${b.endTime}`}
                {b.purpose && (
                  <>
                    {' '}
                    | <span className="italic text-gray-400">{b.purpose}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center justify-between border rounded px-3 py-2">
        <label className="font-medium flex items-center gap-2">
          <span className="material-icons text-gray-600">schedule</span>
          Todo o dia
        </label>
        <input
          type="checkbox"
          checked={allDay}
          onChange={() => setAllDay(val => !val)}
          className="toggle"
        />
      </div>
      {!allDay && (
        <div className="flex gap-2 border rounded px-3 py-2 items-center">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <span>→</span>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      )}
      <div className="border rounded px-3 py-2">
        <label className="block text-xs text-gray-500">Categoria do laboratório</label>
        <select
          value={labCategory}
          onChange={e => setLabCategory(e.target.value)}
          className="w-full"
        >
          <option value="tecnologia">Tecnologia</option>
          <option value="eletronica">Eletrônica</option>
          <option value="maker">Maker</option>
        </select>
        <select
          value={labId}
          onChange={e => setLabId(e.target.value)}
          className="w-full mt-2"
        >
          <option value="">Selecione o laboratório</option>
          {filteredLabs.map(lab => (
            <option key={lab.id} value={lab.id}>
              {lab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="border rounded px-3 py-2">
        <label className="block text-xs text-gray-500">Responsável</label>
        <input
          type="text"
          className="w-full"
          value={responsible}
          readOnly
          placeholder="Nome do responsável"
        />
      </div>
      <div className="border rounded px-3 py-2">
        <textarea
          className="w-full"
          rows={2}
          placeholder="Anotações"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2"
        disabled={success}
      >
        Agendar
      </button>
    </form>
  );
};

export default BookingModal;
