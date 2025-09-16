import React from 'react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveWrapper({ children, className = '' }: ResponsiveWrapperProps) {
  return (
    <div className={`min-h-screen bg-gray-50 lg:bg-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
