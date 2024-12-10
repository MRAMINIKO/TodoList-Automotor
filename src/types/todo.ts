export interface Todo {
  id: string;
  title: string;
  description: string;
  category: 'mantenimiento' | 'reparacion' | 'mejora' | 'compra';
  priority: 'baja' | 'media' | 'alta';
  completed: boolean;
  dueDate?: Date;
}