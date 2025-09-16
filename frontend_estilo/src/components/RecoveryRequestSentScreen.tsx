import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Clock, Users, Smartphone } from 'lucide-react';
import type { Screen } from '../App';

interface RecoveryRequestSentScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function RecoveryRequestSentScreen({ onNavigate }: RecoveryRequestSentScreenProps) {
  useEffect(() => {
    // Auto-navigate to progress screen after a few seconds
    const timer = setTimeout(() => {
      onNavigate('recovery-progress');
    }, 4000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  const selectedGuardians = [
    { name: 'Sarah Kim', avatar: '👩‍💼', status: 'sent' },
    { name: 'Mike Johnson', avatar: '👨‍💻', status: 'sent' },
    { name: 'David Chen', avatar: '👨‍🔬', status: 'sent' },
    { name: 'Emma Wilson', avatar: '👩‍🏫', status: 'sent' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 pt-12 pb-6 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl mb-2">Recovery Request Sent!</h1>
          <p className="text-green-200">Your guardians have been notified</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Success Animation */}
        <Card className="p-6 mb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-xl mb-3">Request Successfully Sent</h2>
          <p className="text-gray-600 leading-relaxed">
            We've securely notified your selected guardians. They'll receive instructions 
            on how to help you recover your wallet access.
          </p>
        </Card>

        {/* Notified Guardians */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Guardians Notified ({selectedGuardians.length})
          </h3>
          <div className="space-y-3">
            {selectedGuardians.map((guardian, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{guardian.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm">{guardian.name}</p>
                    <p className="text-xs text-green-700">Notification sent</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-green-600" />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* What Happens Next */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            What Happens Next
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">1</div>
              <div>
                <p className="text-sm mb-1">Guardian Verification</p>
                <p className="text-xs text-gray-500">Your guardians will verify your identity through secure questions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">2</div>
              <div>
                <p className="text-sm mb-1">Approval Process</p>
                <p className="text-xs text-gray-500">3 guardians need to approve your recovery request</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">3</div>
              <div>
                <p className="text-sm mb-1">Access Restored</p>
                <p className="text-xs text-gray-500">You'll be able to access your wallet again</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Estimated Time */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="text-center">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-900 text-sm mb-1">Estimated Recovery Time</p>
            <p className="text-blue-700 text-xs">
              15-30 minutes (depending on guardian response time)
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => onNavigate('recovery-progress')}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12"
          >
            <Clock className="w-5 h-5 mr-2" />
            Check Recovery Progress
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onNavigate('dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            You'll receive notifications as your guardians respond
          </p>
        </div>
      </div>
    </div>
  );
}