import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletDashboard } from '../WalletDashboard';

export function DashboardRoute() {
  const navigate = useNavigate();
  
  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return <WalletDashboard onNavigate={handleNavigate} />;
}
