import React from 'react';

interface LayoutProps {
  onReset: () => void; 
}

const Layout: React.FC<LayoutProps> = ({ onReset }) => {
  return (
    <div className="flex items-center space-x-2 mt-2" onClick={onReset}> {/* 클릭 시 onReset 호출 */}
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

