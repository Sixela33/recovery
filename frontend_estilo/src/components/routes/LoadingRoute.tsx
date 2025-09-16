import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../LoadingScreen';

export function LoadingRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <LoadingScreen onNavigate={handleNavigate} />;
}
