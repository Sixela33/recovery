import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingScreen } from '../OnboardingScreen';

export function OnboardingRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <OnboardingScreen onNavigate={handleNavigate} />;
}
