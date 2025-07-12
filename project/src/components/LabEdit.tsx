

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { LabCategory } from '../types';
import { updateLab } from '../services/api';

const LabEdit: React.FC = () => {
  const { id } = useParams();
  const { labs, setLabs, setSelectedLab } = useApp();
  const navigate = useNavigate();

  const lab = labs.find(l => l.id === id);

  useEffect(() => {
    if (!lab) navigate('/dashboard');
  }, [lab]);

  const [name, setName] = useState(lab?.name || '');
  const [category, setCategory] = useState<LabCategory>(lab?.category || 'tecnologia');
  const [capacity, setCapacity] = useState(lab?.capacity || 0);
  const [description, setDescription] = useState(lab?.description || '');
  const [equipment, setEquipment] = useState<string[]>(lab?.equipment || []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lab) return;

    const atualizado = {
      ...lab,
      name,
      category,
      capacity,
      description,
      equipment
    };

    try {
      await updateLab(lab.id, atualizado);
      setLabs(labs.map(l => (l.id === lab.id ? atualizado : l)));
      setSelectedLab(null);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar laboratório:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded shadow p-6">
      <button
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        onClick={() => navigate('/dashboard')}
      >
        <span className="material-icons mr-2">arrow_back</span>
        Voltar para o menu
      </button>
      <h2 className="text-xl font-bold mb-4">Editar Laboratório</h2>
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
          value={equipment.join(', ')}
          onChange={e => setEquipment(e.target.value.split(',').map(s => s.trim()))}
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
          Salvar Edição
        </button>
      </form>
    </div>
  );
};

export default LabEdit;
