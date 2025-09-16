import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlertTriangle, Users, Shield, Key, ArrowLeft } from 'lucide-react';
import type { Screen } from '../App';

interface LostAccessScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LostAccessScreen({ onNavigate }: LostAccessScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-full mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Wallet Recovery</h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-200" />
            <div>
              <h3 className="text-lg">Lost Access?</h3>
              <p className="text-orange-200 text-sm">We'll help you get back in safely</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Main Message */}
        <Card className="p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-xl mb-3">Don't worry!</h2>
          <p className="text-gray-600 leading-relaxed">
            Your SafeWallet is protected by your trusted guardians. 
            They can help you regain access safely and securely.
          </p>
        </Card>

        {/* How Recovery Works */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            How Recovery Works
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">1</div>
              <div>
                <p className="text-sm mb-1">Request Help</p>
                <p className="text-xs text-gray-500">We'll notify your guardians that you need assistance</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">2</div>
              <div>
                <p className="text-sm mb-1">Guardian Approval</p>
                <p className="text-xs text-gray-500">3 of your guardians will verify your identity and approve</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mt-0.5">3</div>
              <div>
                <p className="text-sm mb-1">Access Restored</p>
                <p className="text-xs text-gray-500">You'll regain full access to your wallet and funds</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Your Guardians */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Your Guardians (5 Available)
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {[
              { name: 'Sarah', avatar: '👩‍💼', status: 'online' },
              { name: 'Mike', avatar: '👨‍💻', status: 'online' },
              { name: 'Lisa', avatar: '👩‍🎨', status: 'offline' },
              { name: 'David', avatar: '👨‍🔬', status: 'online' },
              { name: 'Emma', avatar: '👩‍🏫', status: 'online' }
            ].map((guardian, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">{guardian.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    guardian.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                </div>
                <p className="text-xs text-gray-600">{guardian.name}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            4 guardians are online and available to help
          </p>
        </Card>

        {/* Security Notice */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-900 text-sm mb-1">Your funds are always safe</p>
              <p className="text-blue-700 text-xs leading-relaxed">
                Guardians can only help you recover access - they cannot move your funds or see your private keys.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={() => onNavigate('guardian-selection')}
          className="w-full bg-orange-600 hover:bg-orange-700 h-14 text-lg"
        >
          <Users className="w-5 h-5 mr-2" />
          Get Help from Guardians
        </Button>

        {/* Alternative Options */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-3">Other options</p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full" size="sm">
              Try signing in again
            </Button>
            <Button variant="ghost" className="w-full" size="sm">
              Contact support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}