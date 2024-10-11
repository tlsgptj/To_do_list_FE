import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">do it ;</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-white shadow p-4 text-center">
        <p>Footer content here</p>
      </footer>
    </div>
  );
};

export default Layout;
