import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuardianManagementScreen } from '../GuardianManagementScreen';

export function GuardianManagementRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <GuardianManagementScreen onNavigate={handleNavigate} />;
}
