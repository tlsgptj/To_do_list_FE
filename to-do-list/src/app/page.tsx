import TodoList from './components/TodoList';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">할 일 목록</h1>
      <TodoList />
    </main>
  );
}
