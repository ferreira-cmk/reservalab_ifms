import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

const UserRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      const res = await createUser({ name, email, password, role });
      if (res.error) {
        setErro(res.error);
      } else {
        navigate('/login');
      }
    } catch (err) {
      setErro('Erro ao cadastrar usuário');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-center">Cadastro</h2>
      {erro && <div className="text-red-600">{erro}</div>}
      <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
      <select value={role} onChange={e => setRole(e.target.value)} className="w-full border p-2 rounded">
        <option value="user">Usuário</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Cadastrar</button>
    </form>
  );
};

export default UserRegister;
