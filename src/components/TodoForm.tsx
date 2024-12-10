import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'completed'>) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Todo['category']>('mantenimiento');
  const [priority, setPriority] = useState<Todo['priority']>('media');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo({
      title,
      description,
      category,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    setTitle('');
    setDescription('');
    setCategory('mantenimiento');
    setPriority('media');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título de la Tarea
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa el título de la tarea"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingresa la descripción de la tarea"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1 space-y-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Todo['category'])}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="mantenimiento">Mantenimiento</option>
            <option value="reparacion">Reparación</option>
            <option value="mejora">Mejora</option>
            <option value="compra">Compra</option>
          </select>
        </div>
        
        <div className="flex-1 space-y-1">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Prioridad
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Todo['priority'])}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="baja">Prioridad Baja</option>
            <option value="media">Prioridad Media</option>
            <option value="alta">Prioridad Alta</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Fecha de Vencimiento
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
      >
        <PlusCircle size={20} />
        Agregar Tarea
      </button>
    </form>
  );
}