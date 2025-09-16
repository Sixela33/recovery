import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Users, CheckCircle } from 'lucide-react';
import type { Screen } from '../App';
import { getGuardians, type Guardian } from '../actions/getGuardians';

interface GuardianSelectionScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function GuardianSelectionScreen({ onNavigate }: GuardianSelectionScreenProps) {
  const [selectedGuardians, setSelectedGuardians] = useState<number[]>([]);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        setLoading(true);
        // In a real app, you would get the account from context or props
        const account = 'user-account'; // This should come from your app state
        const guardiansData = await getGuardians(account);
        setGuardians(guardiansData);
      } catch (error) {
        console.error('Error fetching guardians:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardians();
  }, []);

  const handleGuardianToggle = (guardianId: number) => {
    setSelectedGuardians(prev => 
      prev.includes(guardianId)
        ? prev.filter(id => id !== guardianId)
        : prev.length < 5 ? [...prev, guardianId] : prev
    );
  };

  const canProceed = selectedGuardians.length >= 3;

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 lg:px-8 pt-8 lg:pt-12 pb-6 text-white">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('lost-access')}
            className="p-2 hover:bg-white/10 rounded-full mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Select Guardians</h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-200" />
              <div>
                <h3 className="text-lg">Choose Your Helpers</h3>
                <p className="text-blue-200 text-sm">Select at least 3 guardians to help you</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">{selectedGuardians.length}/3</div>
              <div className="text-blue-200 text-xs">Selected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-8 py-6 max-w-content mx-auto">
        {/* Instructions */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200 max-w-card mx-auto">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-900 text-sm mb-1">Recovery Requirements</p>
              <p className="text-blue-700 text-xs leading-relaxed">
                Select 3-5 guardians who will help verify your identity. We recommend choosing those who are 
                currently online for faster response.
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{selectedGuardians.length} of 3 minimum selected</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((selectedGuardians.length / 3) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Guardians List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading guardians...</p>
            </div>
          ) : (
            guardians.map((guardian) => (
            <Card 
              key={guardian.id} 
              className={`p-4 cursor-pointer transition-all ${
                selectedGuardians.includes(guardian.id) 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleGuardianToggle(guardian.id)}
            >
              <div className="flex items-center space-x-3">
                <Checkbox 
                  checked={selectedGuardians.includes(guardian.id)}
                  onChange={() => handleGuardianToggle(guardian.id)}
                />
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{guardian.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    guardian.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">{guardian.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      guardian.status === 'online' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {guardian.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{guardian.email}</p>
                  <p className="text-xs text-gray-400">{guardian.responseTime}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    guardian.trustLevel === 'High' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {guardian.trustLevel} Trust
                  </span>
                </div>
              </div>
            </Card>
            ))
          )}
        </div>

        {/* Selection Summary */}
        {selectedGuardians.length > 0 && (
          <Card className="p-4 mb-6 bg-green-50 border-green-200 max-w-card mx-auto">
            <div className="text-center">
              <p className="text-green-800 text-sm mb-2">
                {selectedGuardians.length} guardian{selectedGuardians.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex justify-center space-x-2">
                {selectedGuardians.map(id => {
                  const guardian = guardians.find(g => g.id === id);
                  return guardian ? (
                    <div key={id} className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                      <span className="text-sm">{guardian.avatar}</span>
                      <span className="text-xs">{guardian.name.split(' ')[0]}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Action Button */}
        <div className="max-w-button mx-auto">
          <Button 
            onClick={() => onNavigate('recovery-sent')}
            disabled={!canProceed}
            className={`w-full max-w-button h-14 text-lg ${
              canProceed 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            {canProceed 
              ? `Send Recovery Request to ${selectedGuardians.length} Guardians`
              : `Select at least 3 guardians to continue`
            }
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Your guardians will receive a secure notification to help verify your identity
        </p>
      </div>
    </div>
  );
}