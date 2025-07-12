import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LabCategory } from '../types';
import { useNavigate } from 'react-router-dom';

const LabRegister: React.FC = () => {
  const { user, labs, setLabs } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState<number>(0);
  const [equipment, setEquipment] = useState<string>(''); // CSV
  const [category, setCategory] = useState<LabCategory>('tecnologia');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!name || !description || !capacity || !equipment || !category) {
      setError('Preencha todos os campos');
      return;
    }

    const novoLab = {
      name,
      description,
      capacity,
      equipment: equipment.split(',').map(eq => eq.trim()),
      category: category as LabCategory,
    };

    try {
      const resp = await fetch('http://localhost:5000/labs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoLab)
      });
      if (!resp.ok) throw new Error('Erro ao cadastrar');
      const data = await resp.json(); 
      setSuccess(true);
      setName('');
      setDescription('');
      setCapacity(0);
      setEquipment('');
      setCategory('tecnologia');
      setLabs([...labs, { ...novoLab, id: data.id }]); 
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError('Falha ao cadastrar laboratório');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Cadastrar Laboratório</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && (
        <div className="text-green-600 mb-2">
          Laboratório cadastrado com sucesso!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select
          className="border p-2 w-full rounded"
          value={category}
          onChange={e => setCategory(e.target.value as LabCategory)}
        >
          <option value="tecnologia">Tecnologia</option>
          <option value="eletronica">Eletrônica</option>
          <option value="maker">Maker</option>
        </select>
        <input
          className="border p-2 w-full rounded"
          type="number"
          placeholder="Capacidade"
          value={capacity}
          onChange={e => setCapacity(Number(e.target.value))}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Equipamentos (separados por vírgula)"
          value={equipment}
          onChange={e => setEquipment(e.target.value)}
        />
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2"
        >
          Cadastrar Laboratório
        </button>
      </form>
      <button
        className="mt-4 text-gray-600 underline"
        onClick={() => navigate('/dashboard')}
      >
        Voltar ao Dashboard
      </button>
    </div>
  );
};

export default LabRegister;
