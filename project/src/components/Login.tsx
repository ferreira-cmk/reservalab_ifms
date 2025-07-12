import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Login: React.FC = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setUser({
      id: 'admin-id',
      name: 'Administrador',
      email: 'admin@exemplo.com',
      role: 'admin',
    });

    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
