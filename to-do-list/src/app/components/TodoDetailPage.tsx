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
      }
    }
    router.back();
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
      <div className="w-full max-w-2xl p-4 flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="border-2 border-black p-4 w-full rounded-full text-lg text-center"
          />
        </div>
      </div>

      <div className="w-full max-w-2xl flex space-x-4 mt-4">
  <div className="w-1/2 bg-gray-100 p-4 flex items-center justify-center border-2 border-dashed rounded-lg relative">
    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="Todo Image"
        className="w-full h-full object-cover rounded-lg"
      />
    ) : (
      <div className="text-gray-400 text-lg flex items-center justify-center">
        <img 
          src="/images/img.png" 
          width={64} 
          height={64} 
        />
      </div>
    )}

    <input
      type="file"
      id="fileUpload"
      accept="image/*"
      style={{ display: 'none' }} 
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setImage(file); 
        }
      }}
    />

    <button
      onClick={() => document.getElementById('fileUpload')?.click()} // 버튼 클릭 시 파일 선택창을 오픈
      className="absolute bottom-4 right-4 p-2 rounded-full"
    >
      <img src="/images/plus.png" width={45} height={45} />
    </button>
  </div>


        <div className="w-1/2 bg-yellow-50 p-4 rounded-lg relative">
        <p className="text-red-500 text-center">memo</p>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full h-full bg-no-repeat bg-cover bg-yellow-50 p-4 rounded-lg"
            style={{
              backgroundImage: `url('/images/memo.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              minHeight: '150px',
            }}
          />
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleUpdate}
          className="bg-gray-300 text-black font-bold py-2 px-6 rounded-full shadow-md hover:bg-lime-400 hover:text-white flex items-center justify-center"
        >
          V 수정 완료
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-red-400 flex items-center justify-center"
        >
          X 삭제하기
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage;
