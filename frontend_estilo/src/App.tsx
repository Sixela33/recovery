import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CrossmintProviders } from './actions';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OnboardingRoute } from './components/routes/OnboardingRoute';
import { LoadingRoute } from './components/routes/LoadingRoute';
import { DashboardRoute } from './components/routes/DashboardRoute';
import { AddGuardiansRoute } from './components/routes/AddGuardiansRoute';
import { GuardianManagementRoute } from './components/routes/GuardianManagementRoute';
import { LostAccessRoute } from './components/routes/LostAccessRoute';
import { GuardianSelectionRoute } from './components/routes/GuardianSelectionRoute';
import { RecoveryRequestSentRoute } from './components/routes/RecoveryRequestSentRoute';
import { RecoveryProgressRoute } from './components/routes/RecoveryProgressRoute';
import { RecoveryCompleteRoute } from './components/routes/RecoveryCompleteRoute';
import { GuardianNotificationRoute } from './components/routes/GuardianNotificationRoute';

export type Screen = 
  | 'onboarding'
  | 'loading'
  | 'dashboard'
  | 'add-guardians'
  | 'guardian-management'
  | 'lost-access'
  | 'guardian-selection'
  | 'recovery-sent'
  | 'recovery-progress'
  | 'recovery-complete'
  | 'guardian-notification';

export default function App() {
  return (
    <CrossmintProviders>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
            {/* Rutas públicas - no requieren autenticación */}
            <Route path="/" element={<OnboardingRoute />} />
            <Route path="/loading" element={<LoadingRoute />} />
            
            {/* Rutas privadas - requieren autenticación */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardRoute />
              </ProtectedRoute>
            } />
            <Route path="/add-guardians" element={
              <ProtectedRoute>
                <AddGuardiansRoute />
              </ProtectedRoute>
            } />
            <Route path="/guardian-management" element={
              <ProtectedRoute>
                <GuardianManagementRoute />
              </ProtectedRoute>
            } />
            <Route path="/lost-access" element={
              <ProtectedRoute>
                <LostAccessRoute />
              </ProtectedRoute>
            } />
            <Route path="/guardian-selection" element={
              <ProtectedRoute>
                <GuardianSelectionRoute />
              </ProtectedRoute>
            } />
            <Route path="/recovery-sent" element={
              <ProtectedRoute>
                <RecoveryRequestSentRoute />
              </ProtectedRoute>
            } />
            <Route path="/recovery-progress" element={
              <ProtectedRoute>
                <RecoveryProgressRoute />
              </ProtectedRoute>
            } />
            <Route path="/recovery-complete" element={
              <ProtectedRoute>
                <RecoveryCompleteRoute />
              </ProtectedRoute>
            } />
            <Route path="/guardian-notification" element={
              <ProtectedRoute>
                <GuardianNotificationRoute />
              </ProtectedRoute>
            } />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </CrossmintProviders>
  );
}