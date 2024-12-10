import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    baja: 'bg-green-100 text-green-800',
    media: 'bg-yellow-100 text-yellow-800',
    alta: 'bg-red-100 text-red-800',
  };

  const categoryColors = {
    mantenimiento: 'bg-blue-100 text-blue-800',
    reparacion: 'bg-purple-100 text-purple-800',
    mejora: 'bg-indigo-100 text-indigo-800',
    compra: 'bg-pink-100 text-pink-800',
  };

  const getPriorityText = (priority: Todo['priority']) => {
    const texts = {
      baja: 'prioridad baja',
      media: 'prioridad media',
      alta: 'prioridad alta',
    };
    return texts[priority];
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </button>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </h3>
          <p className="text-gray-600 mt-1">{todo.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-sm ${categoryColors[todo.category]}`}>
              {todo.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[todo.priority]}`}>
              {getPriorityText(todo.priority)}
            </span>
            {todo.dueDate && (
              <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                Vence: {new Date(todo.dueDate).toLocaleDateString('es-ES')}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Eliminar tarea"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}