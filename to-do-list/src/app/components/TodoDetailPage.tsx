"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from './Layout';
//Todo에서 받을 인자들 정의
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
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
//Id를 받아온다
  useEffect(() => {
    if (itemId) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const currentTodo = todos.find((todo) => todo.id === itemId);
        if (currentTodo) {
          setTodo(currentTodo);
          setUpdatedText(currentTodo.text);
          setMemo(currentTodo.memo || '');
          setImage(currentTodo.imageUrl || '');
        } else {
          console.log('해당 ID의 할 일을 찾을 수 없습니다.');
        }
      }
    }
  }, [itemId]);
  //파일 5MB이내로 업로드 해야함
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!/^[a-zA-Z0-9_.-]+$/.test(file.name)) {
        console.log('파일 이름은 영어로만 이루어져야 합니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.log('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };
  //사진 및 메모 저장 로직
  const handleUpdate = () => {
    if (todo) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const updatedTodos = todos.map((t) =>
          t.id === todo.id ? { ...t, text: updatedText, memo, imageUrl: image } : t
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      }
    }
    router.back();
  };
  //지우고 메인으로 돌아감
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

  const handleToggleComplete = () => {
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      setTodo(updatedTodo);
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const updatedTodos = todos.map((t) =>
          t.id === updatedTodo.id ? updatedTodo : t
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      }
    }
  };

  if (!todo) {
    return <div>할 일을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Layout /> 
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
        <div className="w-full p-4 flex space-x-4">
          <div className="flex-1 relative">
            {/* 수정로직을 구현하기 위해 기능 분리를 했습니다. 수정 아니면 수정아님, 수정아닐때 -> 체크 아니면 체크아님 */}
            {isEditing ? (
              <div className="relative w-full border-2 border-black rounded-full p-4 flex items-center">
                <div
                  onClick={handleToggleComplete}
                  className={`w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 cursor-pointer 
                  `}
                ></div>

                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  className="w-full text-lg text-center bg-white text-black outline-none"
                  onBlur={() => setIsEditing(false)}
                  //엔터키 누르면 수정 반영되는 내용 추가
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleUpdate();
                        setIsEditing(false);
                    }
                  }}
                />
              </div>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className={`border-2 p-4 w-full rounded-full text-lg text-center cursor-pointer flex items-center justify-center ${
                  todo.completed ? 'bg-purple-100 border-purple-300' : 'bg-white border-gray-300'
                }`}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleComplete();
                  }}
                  className={`w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 cursor-pointer ${
                    todo.completed ? 'bg-purple-600 border-purple-600' : 'border-gray-400'
                  }`}
                >
                  {todo.completed ? (
                    <div className="bg-white w-3 h-3 rounded-full flex items-center justify-center">
                      <img src="/images/unchecked.png" alt="Checked" />
                    </div>
                  ) : (
                    <div className="bg-white w-3 h-3 rounded-full flex items-center justify-center"></div>
                  )}
                </div>

                <span className={`underline ${todo.completed ? 'text-black' : 'text-black'}`}>
                  {todo.text}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <div className="w-full md:w-1/2 bg-gray-100 p-4 flex items-center justify-center border-2 border-dashed rounded-lg relative">
            {image ? (
              <img src={image} alt="Todo Image" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-gray-400 text-lg flex items-center justify-center">
                <img src="/images/img.png" width={64} height={64} />
              </div>
            )}

            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            <button
              onClick={() => document.getElementById('fileUpload')?.click()}
              className="absolute bottom-4 right-4 p-2 rounded-full"
            >
              <img src="/images/plus.png" width={45} height={45} />
            </button>
          </div>

          <div className="w-full md:w-1/2 bg-yellow-50 p-4 rounded-lg relative">
            <p className="text-red-500 text-center">memo</p>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full h-full bg-no-repeat bg-cover p-4 rounded-lg"
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

        <div className="mt-4 flex justify-end w-full space-x-2">
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
    </div>
  );
};

export default TodoDetailPage;
