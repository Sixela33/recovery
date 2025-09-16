import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryCompleteScreen } from '../RecoveryCompleteScreen';

export function RecoveryCompleteRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <RecoveryCompleteScreen onNavigate={handleNavigate} />;
}
