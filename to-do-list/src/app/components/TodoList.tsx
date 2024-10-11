import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // 할 일 목록 불러오기
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 할 일 목록 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 새로운 할 일 추가
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  // 할 일 완료 토글
  const handleToggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // 할 일 삭제
  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">할 일 목록</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none"
          placeholder="할 일을 입력하세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2 rounded-lg"
          onClick={handleAddTodo}
        >
          추가하기
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
