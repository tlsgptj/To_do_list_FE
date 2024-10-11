"use client";

import { useParams, useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoDetailPage: React.FC = () => {
  const router = useRouter();
  const { itemId } = useParams(); 

  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (itemId) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const currentTodo = todos.find((todo) => todo.id === itemId);
        setTodo(currentTodo || null);
      }
    }
  }, [itemId]);

  if (!todo) {
    return <div>할 일을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">할 일 상세</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <p><strong>할 일: </strong>{todo.text}</p>
        <p><strong>완료 여부: </strong>{todo.completed ? '완료' : '미완료'}</p>
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
      >
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default TodoDetailPage;
