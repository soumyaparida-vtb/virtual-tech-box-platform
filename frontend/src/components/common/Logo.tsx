// components/common/Logo.tsx
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
        {/* Virtual Tech Box */}
        <span className="text-xl font-bold">VTB</span>
      </div>
      <span className="text-xl font-semibold hidden sm:block">Virtual Tech Box</span>
    </div>
  );
};

export default Logo;