"use client";

import React, { useState } from 'react';
import { Layout } from './Layout';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { WalletDashboard } from './screens/WalletDashboard';
import { AddGuardiansScreen } from './screens/AddGuardiansScreen';
import { GuardianManagementScreen } from './screens/GuardianManagementScreen';
import { LostAccessScreen } from './screens/LostAccessScreen';
import { RecoveryProgressScreen } from './screens/RecoveryProgressScreen';

type Screen = 
  | 'onboarding'
  | 'dashboard'
  | 'add-guardians'
  | 'guardian-management'
  | 'lost-access'
  | 'recovery-progress'
  | 'recovery-complete'
  | 'guardian-selection'
  | 'recovery-sent'
  | 'guardian-notification';

export function AppRouter() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
      case 'dashboard':
        return <WalletDashboard onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
      case 'add-guardians':
        return <AddGuardiansScreen onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
      case 'guardian-management':
        return <GuardianManagementScreen onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
      case 'lost-access':
        return <LostAccessScreen onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
      case 'recovery-progress':
        return <RecoveryProgressScreen onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
      case 'recovery-complete':
        return <RecoveryCompleteScreen onNavigate={handleNavigate} />;
      case 'guardian-selection':
        return <GuardianSelectionScreen onNavigate={handleNavigate} />;
      case 'recovery-sent':
        return <RecoveryRequestSentScreen onNavigate={handleNavigate} />;
      case 'guardian-notification':
        return <GuardianNotificationScreen onNavigate={handleNavigate} />;
      default:
        return <OnboardingScreen onNavigate={(screen: string) => handleNavigate(screen as Screen)} />;
    }
  };

  // For screens that don't need the sidebar layout (full-screen)
  const standaloneScreens = [
    'onboarding', 
    'add-guardians', 
    'guardian-management', 
    'lost-access', 
    'recovery-progress',
    'recovery-complete',
    'guardian-selection',
    'recovery-sent',
    'guardian-notification'
  ];
  
  if (standaloneScreens.includes(currentScreen)) {
    return renderScreen();
  }

  // For screens that need the layout with sidebar (only dashboard)
  return (
    <Layout>
      {renderScreen()}
    </Layout>
  );
}

// Placeholder components for screens not yet implemented
function RecoveryCompleteScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="screen-title text-2xl mb-4">Recovery Complete!</h1>
        <p className="body-text text-gray-600 mb-6">Your wallet access has been restored.</p>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

function GuardianSelectionScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="screen-title text-2xl mb-4">Guardian Selection</h1>
        <p className="body-text text-gray-600 mb-6">Select guardians for recovery.</p>
        <button 
          onClick={() => onNavigate('recovery-sent')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Send Recovery Request
        </button>
      </div>
    </div>
  );
}

function RecoveryRequestSentScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="screen-title text-2xl mb-4">Recovery Request Sent</h1>
        <p className="body-text text-gray-600 mb-6">Your guardians have been notified.</p>
        <button 
          onClick={() => onNavigate('recovery-progress')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          View Progress
        </button>
      </div>
    </div>
  );
}

function GuardianNotificationScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="screen-title text-2xl mb-4">Guardian Notification</h1>
        <p className="body-text text-gray-600 mb-6">Guardian notification interface.</p>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
