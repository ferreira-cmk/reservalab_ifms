import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lab } from '../types';
import { useNavigate } from 'react-router-dom';
import logoIf from '../assets/if.jpeg';

const Dashboard: React.FC = () => {
  const { user, labs, setLabs, setSelectedLab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const handleEditLab = (lab: Lab) => {
    setSelectedLab(lab);
  navigate(`/admin/lab-edit/${lab.id}`);
  };

  const handleRemoveLab = (labId: string) => {
    if (window.confirm('Tem certeza que deseja remover este laboratório?')) {
      setLabs(labs.filter(lab => lab.id !== labId));
    }
  };

  const categories = [
    { id: 'all', name: 'Todos', color: 'bg-gray-600' },
    { id: 'tecnologia', name: 'Tecnologia', color: 'bg-blue-600' },
    { id: 'eletronica', name: 'Eletrônica', color: 'bg-purple-600' },
    { id: 'maker', name: 'Maker', color: 'bg-orange-600' }
  ];

  const filteredLabs = selectedCategory === 'all'
    ? labs
    : labs.filter(lab => lab.category === selectedCategory);

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    navigate('/calendar');
  };

  const goToBookings = () => {
    navigate('/bookings');
  };





   
  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img src={logoIf} alt="Logo IF" className="h-10 w-10 rounded bg-white" />
              <h1 className="text-xl font-semibold text-gray-900">Laboratórios</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={goToBookings}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="material-icons">event_note</span>
                <span className="hidden sm:inline">Meus Agendamentos</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-gray-600">account_circle</span>
                <span className="text-gray-700">{user?.name || "Visitante"}</span>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Administração
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => handleLabSelect(lab)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors flex items-center">
                    {lab.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{lab.description}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <span className="material-icons text-sm">people</span>
                      <span>Capacidade: {lab.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="material-icons text-sm">inventory</span>
                      <span>{lab.equipment.length} equipamentos</span>
                    </div>
                  </div>
                </div>
                {}
                {user?.role === 'admin' && (
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      title="Editar"
                      onClick={e => {
                        e.stopPropagation();
                        handleEditLab(lab);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <span className="material-icons" style={{ fontSize: 20 }}>edit</span>
                    </button>
                    <button
                      title="Remover"
                      onClick={e => {
                        e.stopPropagation();
                        handleRemoveLab(lab.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <span className="material-icons" style={{ fontSize: 20 }}>delete</span>
                    </button>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <span className="material-icons">calendar_today</span>
                  </button>
                  <span className="material-icons text-gray-300 group-hover:text-green-500 transition-colors">
                    arrow_forward_ios
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="fixed bottom-6 right-6">
          <button 
            onClick={goToBookings}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105"
          >
            <span className="material-icons">event_note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
