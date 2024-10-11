import { useRouter } from 'next/router';

export default function TodoDetailPage() {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold">할 일 상세</h2>
      <p>할 일 ID: {itemId}</p>
      {/* 할 일 수정 및 삭제 기능 */}
    </div>
  );
}
