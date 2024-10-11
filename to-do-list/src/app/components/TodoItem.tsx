import React from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <li
      className={`flex justify-between items-center p-2 rounded-lg ${
        todo.completed ? 'bg-green-100' : 'bg-white'
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="mr-2"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.text}
        </span>
      </div>
      <button
        className="text-red-500"
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
