import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const { selectedLab, selectedDate, bookings } = useApp();
  const navigate = useNavigate();

  const latestBooking = bookings[bookings.length - 1];

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToBookings = () => {
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={goToDashboard}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Confirmação de Agendamento
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="material-icons text-2xl text-green-600">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Agendamento Confirmado!
          </h2>
          <p className="text-gray-600">
            Sua reserva foi realizada com sucesso
          </p>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 bg-green-50 border-b border-green-100">
            <h3 className="text-lg font-semibold text-green-800">
              {selectedLab?.name}
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            {}
            <div className="flex items-center space-x-3">
              <span className="material-icons text-gray-600">calendar_today</span>
              <div>
                <p className="text-sm text-gray-600">Data</p>
                <p className="font-medium text-gray-900">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </div>

            {}
            <div className="flex items-center space-x-3">
              <span className="material-icons text-gray-600">schedule</span>
              <div>
                <p className="text-sm text-gray-600">Horário</p>
                <p className="font-medium text-gray-900">
                  {formatTime(latestBooking?.startTime || '')} - {formatTime(latestBooking?.endTime || '')}
                </p>
              </div>
            </div>

            {}
            <div className="flex items-center space-x-3">
              <span className="material-icons text-gray-600">group</span>
              <div>
                <p className="text-sm text-gray-600">Estudantes</p>
                <p className="font-medium text-gray-900">
                  {latestBooking?.students || 0} pessoas
                </p>
              </div>
            </div>

            {}
            <div className="flex items-center space-x-3">
              <span className="material-icons text-gray-600">info</span>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="font-medium text-yellow-700">Pendente de aprovação</p>
                </div>
              </div>
            </div>

            {}
            {latestBooking?.purpose && (
              <div className="flex items-start space-x-3">
                <span className="material-icons text-gray-600 mt-1">notes</span>
                <div>
                  <p className="text-sm text-gray-600">Observações</p>
                  <p className="font-medium text-gray-900">
                    {latestBooking.purpose}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="space-y-3">
          <button
            onClick={goToBookings}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Ver Meus Agendamentos
          </button>
          
          <button
            onClick={goToDashboard}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors"
          >
            Fazer Novo Agendamento
          </button>
        </div>

        {}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <span className="material-icons text-blue-600 mt-0.5">info</span>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Importante:</p>
              <p>Você receberá uma confirmação por e-mail quando sua reserva for aprovada pelo responsável do laboratório.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;