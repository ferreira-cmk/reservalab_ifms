
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow rounded p-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Painel de Administração</h2>
      <div className="space-y-4">
        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
          onClick={() => navigate('/admin/lab-register')}
        >
          Cadastrar Laboratório
        </button>
        <button
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-semibold"
          onClick={() => navigate('/admin/user-register')}
        >
          Cadastrar Usuário
        </button>
        <button
          className="mt-6 text-gray-600 underline"
          onClick={() => navigate('/dashboard')}
        >
          Voltar ao Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
