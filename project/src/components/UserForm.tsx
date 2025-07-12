import React, { useState } from 'react';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Usuário cadastrado!');
  };

  return (
    <form className="max-w-lg mx-auto p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Cadastrar Usuário</h2>
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} className="block w-full mb-2 p-2 border" />
      <select value={role} onChange={e => setRole(e.target.value)} className="block w-full mb-4 p-2 border">
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  );
};

export default UserForm;
