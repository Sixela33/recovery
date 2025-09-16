"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Clock, Users, AlertCircle, ArrowLeft } from 'lucide-react';

interface RecoveryProgressScreenProps {
  onNavigate: (screen: string) => void;
}

export function RecoveryProgressScreen({ onNavigate }: RecoveryProgressScreenProps) {
  const [progress, setProgress] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  const guardians = [
    { 
      id: 1, 
      name: 'Sarah Kim', 
      avatar: '👩‍💼', 
      status: 'approved', 
      approvedAt: '2 minutes ago',
      responseTime: '5 min'
    },
    { 
      id: 2, 
      name: 'Mike Johnson', 
      avatar: '👨‍💻', 
      status: 'approved', 
      approvedAt: '5 minutes ago',
      responseTime: '8 min'
    },
    { 
      id: 3, 
      name: 'David Chen', 
      avatar: '👨‍🔬', 
      status: 'pending', 
      approvedAt: null,
      responseTime: 'Usually responds in 15 min'
    },
    { 
      id: 4, 
      name: 'Emma Wilson', 
      avatar: '👩‍🏫', 
      status: 'reviewing', 
      approvedAt: null,
      responseTime: 'Currently reviewing...'
    }
  ];

  useEffect(() => {
    const approved = guardians.filter(g => g.status === 'approved').length;
    setApprovedCount(approved);
    setProgress((approved / 3) * 100);

    // Simulate recovery completion
    if (approved >= 3) {
      const timer = setTimeout(() => {
        onNavigate('recovery-complete');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [onNavigate]);

  const canComplete = approvedCount >= 3;
  const isComplete = canComplete;

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className={`px-6 pt-12 pb-6 text-white ${
        isComplete 
          ? 'bg-gradient-to-r from-green-500 to-green-600' 
          : 'bg-gradient-to-r from-blue-600 to-blue-700'
      }`}>
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('recovery-sent')}
            className="p-2 hover:bg-white/10 rounded-full mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="screen-title text-xl">Recovery Progress</h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {isComplete ? (
                <CheckCircle className="w-6 h-6 text-green-200" />
              ) : (
                <Clock className="w-6 h-6 text-blue-200 animate-pulse" />
              )}
              <div>
                <h3 className="card-header text-lg">
                  {isComplete ? 'Recovery Complete!' : 'Waiting for Guardians'}
                </h3>
                <p className={`small-text ${isComplete ? 'text-green-200' : 'text-blue-200'}`}>
                  {approvedCount} of 3 guardians have approved
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">{approvedCount}/3</div>
              <div className={`tiny-text ${isComplete ? 'text-green-200' : 'text-blue-200'}`}>
                Approved
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                isComplete ? 'bg-green-300' : 'bg-white'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Status Summary */}
        {isComplete ? (
          <Card className="p-6 mb-6 bg-green-50 border-green-200">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="card-header text-lg mb-2 text-green-900">Recovery Approved!</h3>
              <p className="body-text text-green-700 text-sm">
                Your guardians have successfully verified your identity. 
                Your wallet access will be restored momentarily.
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-pulse" />
              <h3 className="card-header text-lg mb-2 text-blue-900">Recovery in Progress</h3>
              <p className="body-text text-blue-700 text-sm">
                {3 - approvedCount} more guardian approval{3 - approvedCount !== 1 ? 's' : ''} needed 
                to complete your wallet recovery.
              </p>
            </div>
          </Card>
        )}

        {/* Real-time Guardian Status */}
        <Card className="p-6 mb-6">
          <h3 className="card-header mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Guardian Responses
          </h3>
          <div className="space-y-3">
            {guardians.map((guardian) => (
              <div key={guardian.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{guardian.avatar}</span>
                  </div>
                  <div>
                    <p className="small-text">{guardian.name}</p>
                    <p className="tiny-text text-gray-500">
                      {guardian.status === 'approved' && guardian.approvedAt 
                        ? `Approved ${guardian.approvedAt}`
                        : guardian.responseTime
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {guardian.status === 'approved' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {guardian.status === 'reviewing' && (
                    <AlertCircle className="w-5 h-5 text-orange-500 animate-pulse" />
                  )}
                  {guardian.status === 'pending' && (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                  <Badge 
                    variant={
                      guardian.status === 'approved' ? 'default' :
                      guardian.status === 'reviewing' ? 'secondary' : 'outline'
                    }
                    className={
                      guardian.status === 'approved' ? 'bg-green-100 text-green-800' :
                      guardian.status === 'reviewing' ? 'bg-orange-100 text-orange-800' : ''
                    }
                  >
                    {guardian.status === 'approved' ? 'Approved' :
                     guardian.status === 'reviewing' ? 'Reviewing' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Timeline */}
        <Card className="p-6 mb-6">
          <h3 className="card-header mb-4">Activity Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="small-text">Sarah Kim approved your recovery</p>
                <p className="tiny-text text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="small-text">Mike Johnson approved your recovery</p>
                <p className="tiny-text text-gray-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="small-text">Emma Wilson is reviewing your request</p>
                <p className="tiny-text text-gray-500">3 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="small-text">Recovery request sent to guardians</p>
                <p className="tiny-text text-gray-500">8 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        {isComplete ? (
          <Button 
            onClick={() => onNavigate('recovery-complete')}
            className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Complete Recovery
          </Button>
        ) : (
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.reload()}
            >
              <Clock className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => onNavigate('dashboard')}
            >
              Cancel Recovery
            </Button>
          </div>
        )}

        {/* Estimated Time */}
        {!isComplete && (
          <div className="mt-6 text-center">
            <p className="small-text text-gray-500">
              Estimated time remaining: 5-10 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
