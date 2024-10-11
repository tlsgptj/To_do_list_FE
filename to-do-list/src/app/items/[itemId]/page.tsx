import dynamic from 'next/dynamic';

const TodoDetailPage = dynamic(() => import('../../components/TodoDetailPage'), { ssr: false });

export default function ItemPage() {
  return <TodoDetailPage />;
}