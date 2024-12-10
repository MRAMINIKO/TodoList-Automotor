import React from 'react';
import { SortAsc, SortDesc, Filter } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoFiltersProps {
  sortBy: 'date' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
  filterCategory: Todo['category'] | 'todas';
  filterPriority: Todo['priority'] | 'todas';
  onSortChange: (sort: 'date' | 'priority' | 'title') => void;
  onSortDirectionChange: () => void;
  onFilterCategoryChange: (category: Todo['category'] | 'todas') => void;
  onFilterPriorityChange: (priority: Todo['priority'] | 'todas') => void;
}

export function TodoFilters({
  sortBy,
  sortDirection,
  filterCategory,
  filterPriority,
  onSortChange,
  onSortDirectionChange,
  onFilterCategoryChange,
  onFilterPriorityChange,
}: TodoFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} />
            Filtros
          </label>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => onFilterCategoryChange(e.target.value as Todo['category'] | 'todas')}
              className="flex-1 px-3 py-1.5 border rounded-md text-sm"
            >
              <option value="todas">Todas las categorías</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="reparacion">Reparación</option>
              <option value="mejora">Mejora</option>
              <option value="compra">Compra</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => onFilterPriorityChange(e.target.value as Todo['priority'] | 'todas')}
              className="flex-1 px-3 py-1.5 border rounded-md text-sm"
            >
              <option value="todas">Todas las prioridades</option>
              <option value="baja">Prioridad Baja</option>
              <option value="media">Prioridad Media</option>
              <option value="alta">Prioridad Alta</option>
            </select>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            {sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            Ordenar por
          </label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'date' | 'priority' | 'title')}
              className="flex-1 px-3 py-1.5 border rounded-md text-sm"
            >
              <option value="date">Fecha de vencimiento</option>
              <option value="priority">Prioridad</option>
              <option value="title">Título</option>
            </select>
            <button
              onClick={onSortDirectionChange}
              className="px-3 py-1.5 border rounded-md hover:bg-gray-50"
              title={sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
            >
              {sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}