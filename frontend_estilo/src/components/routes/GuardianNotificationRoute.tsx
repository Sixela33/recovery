import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuardianNotificationScreen } from '../GuardianNotificationScreen';

export function GuardianNotificationRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <GuardianNotificationScreen onNavigate={handleNavigate} />;
}
