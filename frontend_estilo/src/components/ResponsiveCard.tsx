import React from 'react';
import { Card } from './ui/card';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
};

export function ResponsiveCard({ 
  children, 
  className = '', 
  maxWidth = 'full' 
}: ResponsiveCardProps) {
  return (
    <div className={`w-full ${maxWidthClasses[maxWidth]} mx-auto`}>
      <Card className={className}>
        {children}
      </Card>
    </div>
  );
}
