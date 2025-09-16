import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LostAccessScreen } from '../LostAccessScreen';

export function LostAccessRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <LostAccessScreen onNavigate={handleNavigate} />;
}
