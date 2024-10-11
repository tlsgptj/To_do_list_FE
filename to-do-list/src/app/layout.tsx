import './globals.css';

export const metadata = {
  title: 'ToDo App',
  description: '할 일 목록 관리 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

