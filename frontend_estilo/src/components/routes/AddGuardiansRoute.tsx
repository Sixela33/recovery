import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddGuardiansScreen } from '../AddGuardiansScreen';

export function AddGuardiansRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <AddGuardiansScreen onNavigate={handleNavigate} />;
}
