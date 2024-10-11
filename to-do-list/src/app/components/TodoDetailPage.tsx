"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  memo?: string;
  imageUrl?: string;
}

const TodoDetailPage: React.FC = () => {
  const router = useRouter();
  const { itemId } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [updatedText, setUpdatedText] = useState('');
  const [memo, setMemo] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("itemId:", itemId); 
    if (itemId) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const currentTodo = todos.find((todo) => todo.id === itemId);
        if (currentTodo) {
          setTodo(currentTodo);
          setUpdatedText(currentTodo.text);
          setMemo(currentTodo.memo || '');
        } else {
          console.log("해당 ID의 할 일을 찾을 수 없습니다.");
        }
      } else {
        console.log("로컬 저장소에서 할 일을 찾을 수 없습니다.");
      }
    }
  }, [itemId]);
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!/^[a-zA-Z0-9_.-]+$/.test(file.name)) {
        setError('파일 이름은 영어로만 이루어져야 합니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      setImage(file);
      setError('');
    }
  };

  const handleUpdate = () => {
    if (todo) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const updatedTodos = todos.map((t) =>
          t.id === todo.id ? { ...t, text: updatedText, memo, imageUrl: image?.name } : t
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        router.push('/');
      }
    }
  };

  const handleDelete = () => {
    if (todo) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        router.push('/');
      }
    }
  };

  if (!todo) {
    return <div>할 일을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">할 일 상세</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <p>
          <strong>할 일: </strong>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </p>
        <p>
          <strong>메모: </strong>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </p>
        <p>
          <strong>이미지 첨부: </strong>
          <input type="file" onChange={handleImageUpload} />
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="mt-4 flex space-x-2">
        <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-lg">
          수정 완료
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-lg">
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage;