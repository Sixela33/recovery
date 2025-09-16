import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryProgressScreen } from '../RecoveryProgressScreen';

export function RecoveryProgressRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <RecoveryProgressScreen onNavigate={handleNavigate} />;
}
