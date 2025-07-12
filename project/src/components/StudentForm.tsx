import React, { useState } from 'react';

const StudentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [classGroup, setClassGroup] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Estudante cadastrado!');
  };

  return (
    <form className="max-w-lg mx-auto p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Cadastrar Estudante</h2>
      <input placeholder="ID" value={studentId} onChange={e => setStudentId(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input placeholder="Curso" value={course} onChange={e => setCourse(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input placeholder="Turma" value={classGroup} onChange={e => setClassGroup(e.target.value)} className="block w-full mb-4 p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  );
};

export default StudentForm;
