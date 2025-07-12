import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Calendar: React.FC = () => {
  const {
    selectedLab, setSelectedDate, bookings, fetchBookings
  } = useApp();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popupDay, setPopupDay] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedLab) {
      fetchBookings(
        selectedLab.id,
        currentDate.getFullYear().toString(),
        String(currentDate.getMonth() + 1).padStart(2, '0')
      );
    }
    // eslint-disable-next-line
  }, [selectedLab, currentDate]);

  if (!selectedLab) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Selecione um laboratório antes de acessar o calendário.</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const getDayStatus = (date: Date) => {
    const ymd = date.toISOString().split('T')[0];
    const dayBookings = bookings.filter(b => b.labId === selectedLab.id && b.date === ymd);
    const isFullyBusy = dayBookings.some(b => b.allDay);
    const isPartiallyBusy = !isFullyBusy && dayBookings.length > 0;
    return { isFullyBusy, isPartiallyBusy, dayBookings };
  };

  const calendarDays = [];
  const currentDateIterator = new Date(startDate);

  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      const dayNumber = currentDateIterator.getDate();
      const isCurrentMonth = currentDateIterator.getMonth() === month;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPastDate = currentDateIterator < today;
      const isToday =
        dayNumber === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const { isFullyBusy, isPartiallyBusy, dayBookings } = getDayStatus(currentDateIterator);

      calendarDays.push({
        day: dayNumber,
        isCurrentMonth,
        date: new Date(currentDateIterator),
        isFullyBusy,
        isPartiallyBusy,
        isToday: isCurrentMonth && isToday,
        isPastDate,
        dayBookings
      });

      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }
  }

  const handleDateSelect = (calendarDay: any) => {
    if (!calendarDay.isCurrentMonth || calendarDay.isPastDate) return;
    setPopupDay(calendarDay.date);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    setPopupDay(null);
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  const renderPopup = () => {
    if (!popupDay) return null;
    const ymd = popupDay.toISOString().split('T')[0];
    const bookingsOnThisDay = bookings.filter(
      b => b.labId === selectedLab.id && b.date === ymd
    );
    const isFull = bookingsOnThisDay.some(b => b.allDay);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50" onClick={() => setPopupDay(null)}>
        <div className="bg-white rounded-lg p-6 shadow-md" onClick={e => e.stopPropagation()}>
          <h3 className="font-bold mb-2">Horários já ocupados neste dia:</h3>
          <ul>
            {bookingsOnThisDay.map(b => (
              <li key={b.id} className="mb-1">
                {b.allDay
                  ? <span className="font-semibold text-green-700">Ocupado o dia todo</span>
                  : <span>{b.startTime} - {b.endTime}</span>
                }
                <span className="ml-2 text-gray-500 text-xs">{b.purpose}</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setPopupDay(null)}
          >
            Fechar
          </button>
          {!isFull && (
            <button
              className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setSelectedDate(popupDay);
                setPopupDay(null);
                navigate('/booking');
              }}
            >
              Reservar horário disponível
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={goBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="material-icons">arrow_back</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {selectedLab?.name || 'Selecionar Data'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <span className="material-icons text-gray-600">chevron_left</span>
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                {monthNames[month].toUpperCase()} {year}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <span className="material-icons text-gray-600">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-200">
            {dayNames.map((dayName, index) => (
              <div
                key={index}
                className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50"
              >
                {dayName}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((calendarDay, index) => {
              let classNames = "relative p-3 text-center text-sm transition-all duration-200 border-b border-r border-gray-100 ";

              if (!calendarDay.isCurrentMonth) {
                classNames += " text-gray-300 bg-gray-50 cursor-not-allowed";
              } else if (calendarDay.isFullyBusy) {
                classNames += " bg-green-500 text-white font-semibold cursor-pointer";
              } else if (calendarDay.isPartiallyBusy) {
                classNames += " bg-yellow-300 text-gray-800 font-semibold cursor-pointer border-yellow-500";
              } else if (calendarDay.isPastDate) {
                classNames += " text-gray-300 cursor-not-allowed";
              } else {
                classNames += " text-gray-900 hover:bg-green-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(calendarDay)}
                  disabled={
                    !calendarDay.isCurrentMonth ||
                    calendarDay.isPastDate
                  }
                  className={classNames}
                  title={
                    calendarDay.isFullyBusy
                      ? "Dia ocupado - já reservado"
                      : calendarDay.isPartiallyBusy
                        ? "Dia parcialmente ocupado"
                        : ""
                  }
                >
                  {calendarDay.day}
                </button>
              );
            })}
          </div>
        </div>

        {}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">Ocupado (todo o dia)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-300 border border-yellow-600 rounded"></div>
            <span className="text-gray-600">Parcialmente ocupado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            <span className="text-gray-600">Disponível</span>
          </div>
        </div>
        {renderPopup()}
      </div>
    </div>
  );
};

export default Calendar;
