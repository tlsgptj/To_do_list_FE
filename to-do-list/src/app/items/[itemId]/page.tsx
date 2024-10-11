interface TodoProps {
    todo: {
      id: string;
      text: string;
      completed: boolean;
    };
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
  }
  
  const TodoItem: React.FC<TodoProps> = ({ todo, onToggleComplete, onDelete }) => {
    return (
      <li className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg">
        <div
          className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.text}
        </div>
  
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 ${todo.completed ? 'bg-purple-500' : 'bg-green-500'} text-white rounded-full`}
            onClick={() => onToggleComplete(todo.id)}
          >
            {todo.completed ? '완료됨' : '진행 중'}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-full"
            onClick={() => onDelete(todo.id)}
          >
            삭제
          </button>
        </div>
      </li>
    );
  };
  
  export default TodoItem;
  
