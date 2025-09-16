"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ArrowLeft, UserPlus, Send, Shield, Users } from 'lucide-react';

interface AddGuardiansScreenProps {
  onNavigate: (screen: string) => void;
}

export function AddGuardiansScreen({ onNavigate }: AddGuardiansScreenProps) {
  const [email, setEmail] = useState('');
  const [sentInvites, setSentInvites] = useState<string[]>([]);

  const handleSendInvite = () => {
    if (email && !sentInvites.includes(email)) {
      setSentInvites([...sentInvites, email]);
      setEmail('');
    }
  };

  const suggestedContacts = [
    { name: 'Sarah Kim', email: 'sarah.kim@gmail.com', avatar: '👩‍💼' },
    { name: 'Mike Johnson', email: 'mike.j@gmail.com', avatar: '👨‍💻' },
    { name: 'Lisa Wang', email: 'lisa.wang@gmail.com', avatar: '👩‍🎨' },
    { name: 'David Chen', email: 'david.chen@gmail.com', avatar: '👨‍🔬' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-full mr-3 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="screen-title text-xl">Add Guardians</h1>
        </div>
        
        <div className="bg-primary-800/50 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary-200" />
            <div>
              <h3 className="card-header text-lg">Protect Your Wallet</h3>
              <p className="small-text text-primary-200">Add trusted friends as guardians</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Info Card */}
        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="card-header text-lg mb-3 text-gray-900">How it works</h3>
            <p className="body-text text-gray-700 text-sm leading-relaxed">
              Choose <span className="text-primary-600 font-medium">3-7 trusted friends or family members</span>. If you ever lose access to your wallet, 
              <span className="text-primary-600 font-medium"> 3 of them can help you recover it</span>. They can't access your funds - <span className="text-primary-600 font-medium">only help you regain access</span>.
            </p>
          </div>
        </Card>

        {/* Add Guardian Form */}
        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <h3 className="card-header mb-4 text-gray-900">Invite a Guardian</h3>
          <div className="space-y-4">
            <div>
              <label className="block small-text mb-2 text-gray-700">Email address</label>
              <Input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <Button 
              onClick={handleSendInvite}
              disabled={!email}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </Card>

        {/* Sent Invites */}
        {sentInvites.length > 0 && (
          <Card className="p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="card-header mb-4 text-gray-900">Pending Invitations ({sentInvites.length})</h3>
            <div className="space-y-3">
              {sentInvites.map((email, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-warning-50 rounded-lg border border-warning-200">
                  <div>
                    <p className="small-text text-gray-900">{email}</p>
                    <p className="tiny-text text-warning-700">Invitation sent</p>
                  </div>
                  <div className="w-3 h-3 bg-warning-400 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Suggested Contacts */}
        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <h3 className="card-header mb-4 text-gray-900">Suggested from your contacts</h3>
          <div className="space-y-3">
            {suggestedContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{contact.avatar}</span>
                  </div>
                  <div>
                    <p className="small-text text-gray-900 font-medium">{contact.name}</p>
                    <p className="tiny-text text-gray-500">{contact.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (!sentInvites.includes(contact.email)) {
                      setSentInvites([...sentInvites, contact.email]);
                    }
                  }}
                  disabled={sentInvites.includes(contact.email)}
                  className="w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-600 hover:text-gray-700 disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Continue Button */}
        {sentInvites.length >= 3 && (
          <div className="mt-6">
            <Button 
              onClick={() => onNavigate('guardian-management')}
              className="w-full bg-success-500 hover:bg-success-600 text-white h-12 rounded-lg font-medium transition-colors"
            >
              Continue to Guardian Management
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
