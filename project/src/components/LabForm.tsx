import React, { useState } from 'react';
import { createLab } from '../services/api';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LabCategory } from '../types';

const LabForm: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<LabCategory>('tecnologia');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [equipment, setEquipment] = useState('');
  const { labs, setLabs } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoLab = {
      name,
      category,
      description,
      capacity,
      equipment: equipment.split(',').map(item => item.trim())
    };

    const res = await createLab(novoLab);

    setLabs([
      ...labs,
      {
        ...res,
        category: res.category as LabCategory
      }
    ]);
    navigate('/dashboard');
  };

  return (
    <form className="max-w-lg mx-auto p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Cadastrar Laboratório</h2>
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="block w-full mb-2 p-2 border rounded" />
      <select value={category} onChange={e => setCategory(e.target.value as LabCategory)} className="block w-full mb-2 p-2 border rounded">
        <option value="tecnologia">Tecnologia</option>
        <option value="eletronica">Eletrônica</option>
        <option value="maker">Maker</option>
      </select>
      <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="block w-full mb-2 p-2 border rounded" />
      <input type="number" placeholder="Capacidade" value={capacity} onChange={e => setCapacity(Number(e.target.value))} className="block w-full mb-2 p-2 border rounded" />
      <input placeholder="Equipamentos (separados por vírgula)" value={equipment} onChange={e => setEquipment(e.target.value)} className="block w-full mb-4 p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Salvar</button>
    </form>
  );
};

export default LabForm;
