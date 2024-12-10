import { Todo } from '../types/todo';

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function filterAndSortTodos(
  todos: Todo[],
  {
    sortBy,
    sortDirection,
    filterCategory,
    filterPriority,
  }: {
    sortBy: 'date' | 'priority' | 'title';
    sortDirection: 'asc' | 'desc';
    filterCategory: Todo['category'] | 'todas';
    filterPriority: Todo['priority'] | 'todas';
  }
): Todo[] {
  let filteredTodos = [...todos];

  // Aplicar filtros
  if (filterCategory !== 'todas') {
    filteredTodos = filteredTodos.filter((todo) => todo.category === filterCategory);
  }
  if (filterPriority !== 'todas') {
    filteredTodos = filteredTodos.filter((todo) => todo.priority === filterPriority);
  }

  // Ordenar
  const priorityWeight = { alta: 3, media: 2, baja: 1 };

  return filteredTodos.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'priority':
        comparison = priorityWeight[b.priority] - priorityWeight[a.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }

    // Aplicar dirección del ordenamiento
    return sortDirection === 'asc' ? comparison : -comparison;
  });
}