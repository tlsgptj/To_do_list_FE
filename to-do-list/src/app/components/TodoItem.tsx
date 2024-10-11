import React from 'react';
import Link from 'next/link';

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

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete }) => {
  return (
    <li
      className={`flex justify-between items-center p-2 rounded-lg ${
        todo.completed ? 'bg-purple-100 border-2 border-black rounded-full' : 'bg-white border-2 border-black rounded-full'
      }`}
    >
      <div className="flex items-center">
        <div
          onClick={() => onToggleComplete(todo.id)}
          className="mr-2 w-6 h-6 flex items-center justify-center cursor-pointer"
        >
          {todo.completed ? (
            <img src="/images/unchecked.png" alt="Checked" className="w-full h-full" />
          ) : (
            <img src="/images/checked.png" alt="Unchecked" className="w-full h-full" />
          )} {/* checked.png와 unchecked.png를 이름을 실수로 다르게 설정했습니다.*/}
        </div>


       <Link href={`/items/${todo.id}`}>
          <span className={todo.completed ? 'line-through text-gray-500 cursor-pointer' : 'cursor-pointer'}>
            {todo.text}
          </span>
        </Link> 
      </div>
    </li>
  );
};

export default TodoItem;

