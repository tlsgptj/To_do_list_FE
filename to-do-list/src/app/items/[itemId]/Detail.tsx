import dynamic from 'next/dynamic';

// dynamic import를 사용하여 클라이언트 전용 컴포넌트를 불러옵니다.
const TodoDetailPage = dynamic(() => import('../../components/TodoDetailPage'), { ssr: false });

export default function ItemPage() {
  return <TodoDetailPage />;
}
