"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Users, Check } from 'lucide-react';

export function GuardianSelectionPage() {
  const [selectedGuardians, setSelectedGuardians] = useState<number[]>([]);

  const guardians = [
    {
      id: 1,
      name: 'Sarah Kim',
      email: 'sarah.kim@gmail.com',
      status: 'online',
      responseTime: 'Usually responds in 5 min',
      trustLevel: 'High Trust',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.j@gmail.com',
      status: 'online',
      responseTime: 'Usually responds in 10 min',
      trustLevel: 'High Trust',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Lisa Wang',
      email: 'lisa.wang@gmail.com',
      status: 'offline',
      responseTime: 'Last seen 2 hours ago',
      trustLevel: 'Medium Trust',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.chen@gmail.com',
      status: 'online',
      responseTime: 'Usually responds in 15 min',
      trustLevel: 'High Trust',
      avatar: '👨‍🔬'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      email: 'emma.wilson@gmail.com',
      status: 'offline',
      responseTime: 'Last seen 1 hour ago',
      trustLevel: 'Medium Trust',
      avatar: '👩‍🏫'
    }
  ];

  const toggleGuardian = (guardianId: number) => {
    setSelectedGuardians(prev => 
      prev.includes(guardianId) 
        ? prev.filter(id => id !== guardianId)
        : [...prev, guardianId]
    );
  };

  const selectedCount = selectedGuardians.length;
  const progress = (selectedCount / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-12 pb-8 text-white">
        <div className="flex items-center mb-6">
          <button className="p-2 hover:bg-white/10 rounded-full mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="screen-title text-xl">Select Guardians</h1>
        </div>
        
        {/* Choose Your Helpers Card */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="card-header text-lg">Choose Your Helpers</h3>
                <p className="small-text text-white/80">Select at least 3 guardians to help you</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{selectedCount}/3</div>
              <div className="small-text text-white/80">Selected</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Recovery Requirements */}
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="card-header text-blue-900 mb-2">Recovery Requirements</h3>
              <p className="body-text text-blue-700 text-sm">
                Select 3-5 guardians who will help verify your identity. We recommend choosing those who are currently online for faster response.
              </p>
            </div>
          </div>
        </Card>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="small-text text-gray-600">Progress</span>
            <span className="small-text text-gray-600">{selectedCount} of 3 minimum selected</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Guardians List */}
        <div className="space-y-3">
          {guardians.map((guardian) => (
            <Card key={guardian.id} className="p-4 bg-white shadow-sm">
              <div className="flex items-center space-x-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleGuardian(guardian.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedGuardians.includes(guardian.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedGuardians.includes(guardian.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>

                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{guardian.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    guardian.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                </div>

                {/* Guardian Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="card-header text-gray-900">{guardian.name}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        guardian.status === 'online' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {guardian.status}
                    </Badge>
                  </div>
                  <p className="small-text text-gray-600 mb-1">{guardian.email}</p>
                  <p className="tiny-text text-gray-500">{guardian.responseTime}</p>
                </div>

                {/* Trust Level */}
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    guardian.trustLevel === 'High Trust'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {guardian.trustLevel}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedCount >= 3 && (
          <div className="pt-6">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            >
              Continue with {selectedCount} Guardians
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
