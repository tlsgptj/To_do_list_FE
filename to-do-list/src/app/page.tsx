import TodoList from './components/TodoList';
import Layout from './components/Layout';

export default function HomePage() {
  return (
    <div>
      <Layout />
      <main>
        <TodoList />
      </main>
    </div>
  );
}


