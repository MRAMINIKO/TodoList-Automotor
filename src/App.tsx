import React, { useState, useEffect } from 'react';
import { Wrench, Database } from 'lucide-react';
import { Todo } from './types/todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { generateId, filterAndSortTodos } from './utils/todoUtils';
import { generateTestData } from './utils/testDataGenerator';
import { DatabaseService } from './services/db';

const db = new DatabaseService();

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<Todo['category'] | 'todas'>('todas');
  const [filterPriority, setFilterPriority] = useState<Todo['priority'] | 'todas'>('todas');

  useEffect(() => {
    const initDb = async () => {
      try {
        await db.initDatabase();
        const tasks = await db.getAllTasks();
        setTodos(tasks);
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initDb();
  }, []);

  const handleAddTodo = async (newTodo: Omit<Todo, 'id' | 'completed'>) => {
    const todo: Todo = {
      ...newTodo,
      id: generateId(),
      completed: false,
    };

    try {
      await db.addTask(todo);
      setTodos((prev) => [...prev, todo]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      const updatedTodo = updatedTodos.find((todo) => todo.id === id);
      if (updatedTodo) {
        await db.updateTask(updatedTodo);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await db.deleteTask(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleLoadTestData = async () => {
    try {
      const testData = generateTestData();
      for (const todo of testData) {
        await db.addTask(todo);
      }
      setTodos((prev) => [...prev, ...testData]);
    } catch (error) {
      console.error('Error al cargar datos de prueba:', error);
    }
  };

  const sortedAndFilteredTodos = filterAndSortTodos(todos, {
    sortBy,
    sortDirection,
    filterCategory,
    filterPriority,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Wrench className="text-blue-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Tareas del Proyecto Automotriz</h1>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-end">
            <button
              onClick={handleLoadTestData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <Database size={16} />
              Cargar datos de prueba
            </button>
          </div>

          <TodoForm onAddTodo={handleAddTodo} />
          
          <TodoFilters
            sortBy={sortBy}
            sortDirection={sortDirection}
            filterCategory={filterCategory}
            filterPriority={filterPriority}
            onSortChange={setSortBy}
            onSortDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            onFilterCategoryChange={setFilterCategory}
            onFilterPriorityChange={setFilterPriority}
          />

          {sortedAndFilteredTodos.length > 0 ? (
            <TodoList
              todos={sortedAndFilteredTodos}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {todos.length === 0
                  ? 'No hay tareas aún. ¡Agrega tu primera tarea automotriz arriba!'
                  : 'No hay tareas que coincidan con los filtros seleccionados.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}