import { Todo } from '../types/todo';
import { generateId } from './todoUtils';

const tareasPrueba: Array<Omit<Todo, 'id' | 'completed'>> = [
  {
    title: 'Cambiar aceite del motor',
    description: 'Realizar cambio de aceite y filtro según especificaciones del fabricante',
    category: 'mantenimiento',
    priority: 'alta',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 días después
  },
  {
    title: 'Revisar frenos',
    description: 'Inspeccionar el estado de las pastillas y discos de freno',
    category: 'mantenimiento',
    priority: 'alta',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 día después
  },
  {
    title: 'Comprar cubiertas nuevas',
    description: 'Adquirir juego de cubiertas all-season',
    category: 'compra',
    priority: 'media',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
  },
  {
    title: 'Reparar aire acondicionado',
    description: 'Diagnosticar y reparar falla en el sistema de climatización',
    category: 'reparacion',
    priority: 'media',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días después
  },
  {
    title: 'Instalar sistema de sonido',
    description: 'Actualizar el sistema de audio con nuevos parlantes y radio',
    category: 'mejora',
    priority: 'baja',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días después
  },
  {
    title: 'Cambiar filtro de aire',
    description: 'Reemplazar filtro de aire del motor',
    category: 'mantenimiento',
    priority: 'baja',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 días después
  },
  {
    title: 'Reparar escape',
    description: 'Soldar fuga en el sistema de escape',
    category: 'reparacion',
    priority: 'alta',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 días después
  },
  {
    title: 'Comprar kit de emergencia',
    description: 'Adquirir kit de emergencia completo para el vehículo',
    category: 'compra',
    priority: 'media',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 días después
  },
];

export function generateTestData(): Todo[] {
  return tareasPrueba.map(tarea => ({
    ...tarea,
    id: generateId(),
    completed: Math.random() > 0.7, // 30% de probabilidad de estar completada
  }));
}