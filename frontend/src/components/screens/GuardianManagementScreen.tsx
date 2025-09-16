"use client";

import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Shield, MoreVertical, UserCheck, UserX, UserPlus } from 'lucide-react';

interface GuardianManagementScreenProps {
  onNavigate: (screen: string) => void;
}

export function GuardianManagementScreen({ onNavigate }: GuardianManagementScreenProps) {
  const guardians = [
    {
      id: 1,
      name: 'Sarah Kim',
      email: 'sarah.kim@gmail.com',
      status: 'active',
      joinedDate: '2 weeks ago',
      avatar: '👩‍💼',
      trustScore: 'High'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.j@gmail.com',
      status: 'active',
      joinedDate: '1 week ago',
      avatar: '👨‍💻',
      trustScore: 'High'
    },
    {
      id: 3,
      name: 'Lisa Wang',
      email: 'lisa.wang@gmail.com',
      status: 'active',
      joinedDate: '5 days ago',
      avatar: '👩‍🎨',
      trustScore: 'Medium'
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.chen@gmail.com',
      status: 'pending',
      joinedDate: 'Invited 2 days ago',
      avatar: '👨‍🔬',
      trustScore: 'New'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      email: 'emma.wilson@gmail.com',
      status: 'active',
      joinedDate: '3 days ago',
      avatar: '👩‍🏫',
      trustScore: 'High'
    }
  ];

  const activeGuardians = guardians.filter(g => g.status === 'active').length;
  const pendingGuardians = guardians.filter(g => g.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-full mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="screen-title text-xl">Guardian Management</h1>
        </div>
        
        {/* Status Overview */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-200" />
              <div>
                <h3 className="card-header text-lg">Wallet Protected</h3>
                <p className="small-text text-green-200">
                  {activeGuardians} active guardians • {pendingGuardians} pending
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">{activeGuardians}/5</div>
              <div className="small-text text-green-200">Active</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">{activeGuardians}</div>
            <div className="small-text text-gray-600">Active</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">{pendingGuardians}</div>
            <div className="small-text text-gray-600">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">3</div>
            <div className="small-text text-gray-600">Needed</div>
          </Card>
        </div>

        {/* Add Guardian Button */}
        <Button 
          onClick={() => onNavigate('add-guardians')}
          className="w-full mb-6 bg-blue-600 hover:bg-blue-700 h-12"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add More Guardians
        </Button>

        {/* Guardians List */}
        <div>
          <h3 className="card-header mb-4">Your Guardians</h3>
          <div className="space-y-3">
            {guardians.map((guardian) => (
              <Card key={guardian.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{guardian.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="small-text">{guardian.name}</p>
                        {guardian.status === 'active' ? (
                          <UserCheck className="w-4 h-4 text-green-500" />
                        ) : (
                          <UserX className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <p className="tiny-text text-gray-500">{guardian.email}</p>
                      <p className="tiny-text text-gray-400">{guardian.joinedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={guardian.status === 'active' ? 'default' : 'secondary'}
                      className={guardian.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {guardian.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {guardian.trustScore}
                    </Badge>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Info */}
        <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="card-header text-lg mb-2 text-blue-900">Recovery Requirements</h3>
            <p className="body-text text-blue-700 text-sm leading-relaxed mb-4">
              You need approval from 3 out of {activeGuardians} guardians to recover your wallet. 
              This ensures your funds stay secure even if some guardians are unavailable.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-blue-600">
              <div>✓ Minimum 3 guardians</div>
              <div>✓ Majority approval required</div>
            </div>
          </div>
        </Card>

        {/* Test Recovery */}
        <Card className="p-4 mt-6 border-orange-200 bg-orange-50">
          <div className="text-center">
            <p className="body-text text-orange-800 mb-3">Want to test your recovery process?</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('guardian-notification')}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              View Guardian Experience
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
