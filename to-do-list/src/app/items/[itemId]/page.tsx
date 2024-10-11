"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  memo: string;
  image: string; 
}

const TodoDetailPage: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query; 
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (itemId) {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos);
        const foundTodo = todos.find((t) => t.id === itemId);
        setTodo(foundTodo || null);
      }
    }
  }, [itemId]);

  if (!todo) return <div>할 일을 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const updatedTodos = todos.filter((t) => t.id !== itemId);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      router.push("/");
    }
  };

  const handleUpdate = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const updatedTodos = todos.map((t) =>
        t.id === itemId ? { ...t, text: todo.text, memo: todo.memo } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      router.push("/"); 
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">할 일 세부 정보</h1>

      <input
        type="text"
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
        className="w-full p-4 border-2 border-gray-300 rounded-md mb-4"
      />

      <div className="flex">
        <div className="w-1/2 border-dashed border-2 border-gray-300 p-4">
          <img src={todo.image || "/images/default.png"} alt="첨부된 이미지" className="w-full h-full object-cover" />
          <button className="mt-2 p-2 bg-gray-200 rounded">이미지 첨부</button>
        </div>

    
        <div className="w-1/2 ml-4 p-4 bg-yellow-50 rounded-md">
          <h2 className="font-bold">Memo</h2>
          <textarea
            value={todo.memo}
            onChange={(e) => setTodo({ ...todo, memo: e.target.value })}
            className="w-full h-full p-4 border-2 border-gray-300 rounded-md"
            placeholder="할 일에 대한 메모를 입력하세요"
          ></textarea>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white p-4 rounded-md"
        >
          수정 완료
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-4 rounded-md"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage;
 
