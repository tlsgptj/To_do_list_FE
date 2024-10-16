"use client";

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

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

const handleAddTodo = () => {
    if (newTodo.trim() === '') return;  
  
    const storedTodos = localStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
  
    const doneItems = todos.filter((todo: Todo) => todo.completed);
    const todoItems = todos.filter((todo: Todo) => !todo.completed);
  
    const newTodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,  
    };
  
    const updatedTodos = [...doneItems, ...todoItems, newTodoItem];  
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setNewTodo('');  
  };
  

  const handleToggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);  
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);  
  };

  const todoItems = todos.filter((todo) => !todo.completed);
  const doneItems = todos.filter((todo) => todo.completed);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto mt-10 p-4">
      <div className="flex w-full mb-10 justify-between space-x-10">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow p-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          placeholder="할 일을 입력해주세요"
        />
        <button
          onClick={handleAddTodo}
          className="p-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition duration-200"
        >
          <span className="hidden md:block">+ 추가하기</span> 
          <span className="block md:hidden">+</span> 
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between space-y-6 md:space-y-0 md:space-x-10">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="px-4 py-2 bg-lime-400 text-green-800 font-bold rounded-full">TO DO</h2>
          </div>

          <ul className="space-y-4">
            {todoItems.length === 0 ? (
              <div className="flex flex-col items-center">
                <img src="/images/add.png" alt="Empty Todo List" className="w-240 h-240 mb-4" />
                <p className="text-gray-500">할 일이 없어요.</p>
                <p className="text-gray-500">TODO를 새롭게 추가해주세요!</p>
              </div>
            ) : (
              todoItems.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </ul>
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="px-4 py-2 bg-green-700 text-lime-200 font-bold rounded-full">DONE</h2>
          </div>

          <ul className="space-y-4">
            {doneItems.length === 0 ? (
              <div className="flex flex-col items-center">
                <img src="/images/done.png" alt="Empty Done List" className="w-240 h-240 mb-4" />
                <p className="text-gray-500">아직 완료된 일이 없어요.</p>
              </div>
            ) : (
              doneItems.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
