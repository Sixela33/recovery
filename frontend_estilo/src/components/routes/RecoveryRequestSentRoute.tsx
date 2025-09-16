import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryRequestSentScreen } from '../RecoveryRequestSentScreen';

export function RecoveryRequestSentRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <RecoveryRequestSentScreen onNavigate={handleNavigate} />;
}
