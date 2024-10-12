import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center space-x-2 mt-2"> 
        <img
          src="/images/logo.png" 
          alt="Logo"
          width={50} 
          height={50}
        />
        <h1 className="text-2xl font-bold" style={{ color: '#4B0082' }}>do it;</h1>
      </div>
  );
};

export default Layout;
