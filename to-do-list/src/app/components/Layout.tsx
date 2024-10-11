import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold">Todo List</a>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <a className="hover:underline">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:underline">About</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-purple-600 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; 2024 Todo List. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
