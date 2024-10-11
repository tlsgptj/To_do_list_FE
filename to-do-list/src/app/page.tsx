import Image from 'next/image';
import TodoList from './components/TodoList';

export default function HomePage() {
  return (
    <main className="flex flex-col items-start justify-start mt-2">
      <div className="flex items-center space-x-2 mt-2"> 
        <Image
          src="/images/logo.png" 
          alt="Logo"
          width={50} 
          height={50}
        />
        <h1 className="text-2xl font-bold" style={{ color: '#4B0082' }}>do it;</h1>
      </div>
      <TodoList />
    </main>
  );
}

