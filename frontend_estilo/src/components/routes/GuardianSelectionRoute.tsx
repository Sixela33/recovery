import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuardianSelectionScreen } from '../GuardianSelectionScreen';

export function GuardianSelectionRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <GuardianSelectionScreen onNavigate={handleNavigate} />;
}
