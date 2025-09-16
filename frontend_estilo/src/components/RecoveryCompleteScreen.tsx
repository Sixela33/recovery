import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Shield, Users, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

interface RecoveryCompleteScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function RecoveryCompleteScreen({ onNavigate }: RecoveryCompleteScreenProps) {
  const helpedGuardians = [
    { name: 'Sarah Kim', avatar: '👩‍💼' },
    { name: 'Mike Johnson', avatar: '👨‍💻' },
    { name: 'Emma Wilson', avatar: '👩‍🏫' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 pt-16 pb-8 text-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl mb-3">Welcome Back!</h1>
          <p className="text-green-200 text-lg">Your wallet has been successfully recovered</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Success Message */}
        <Card className="p-8 mb-6 text-center bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl mb-3 text-green-900">Recovery Complete!</h2>
          <p className="text-green-700 leading-relaxed mb-4">
            Your SafeWallet is now fully accessible again. Your funds are safe and secure, 
            and you can continue using your wallet normally.
          </p>
          <div className="bg-white/60 rounded-lg p-4">
            <p className="text-green-800 mb-2">🎉 Full access restored</p>
            <p className="text-green-800 mb-2">🔒 All funds secure</p>
            <p className="text-green-800">✨ Protection still active</p>
          </div>
        </Card>

        {/* Thank Your Guardians */}
        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <h3 className="mb-4 flex items-center text-blue-900">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Thank Your Guardians
          </h3>
          <p className="text-blue-700 text-sm mb-4">
            These amazing people helped you recover your wallet. Consider sending them a thank you message!
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            {helpedGuardians.map((guardian, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                  <span className="text-2xl">{guardian.avatar}</span>
                </div>
                <p className="text-xs text-blue-800">{guardian.name}</p>
                <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
            Send Thank You Messages
          </Button>
        </Card>

        {/* Security Recommendations */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-orange-600" />
            Security Recommendations
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm mt-0.5">!</div>
              <div>
                <p className="text-sm text-orange-900 mb-1">Update your security settings</p>
                <p className="text-xs text-orange-700">Consider reviewing and updating your backup methods</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">✓</div>
              <div>
                <p className="text-sm text-blue-900 mb-1">Your guardians are still protecting you</p>
                <p className="text-xs text-blue-700">No need to set up guardians again - they're all still active</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recovery Summary */}
        <Card className="p-6 mb-8 bg-gray-50">
          <h3 className="mb-4">Recovery Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Recovery initiated:</span>
              <span>12 minutes ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Guardians responded:</span>
              <span>3 of 4 contacted</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total time:</span>
              <span>12 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600">✓ Successful</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => onNavigate('dashboard')}
            className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Return to Wallet
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onNavigate('guardian-management')}
          >
            <Users className="w-5 h-5 mr-2" />
            Manage Guardians
          </Button>
        </div>

        {/* Final Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Your wallet is now secure and accessible. The power of community 
            helped bring you back safely! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}