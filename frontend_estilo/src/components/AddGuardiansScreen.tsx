import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, UserPlus, Send, Shield, Users } from 'lucide-react';
import type { Screen } from '../App';

interface AddGuardiansScreenProps {
  onNavigate: (screen: Screen) => void;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-white/10 rounded-full mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Add Guardians</h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-6 h-6 text-blue-200" />
            <div>
              <h3 className="text-lg">Protect Your Wallet</h3>
              <p className="text-blue-200 text-sm">Add trusted friends as guardians</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Info Card */}
        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <div className="text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg mb-2 text-blue-900">How it works</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Choose 3-7 trusted friends or family members. If you ever lose access to your wallet, 
              3 of them can help you recover it. They can't access your funds - only help you regain access.
            </p>
          </div>
        </Card>

        {/* Add Guardian Form */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4">Invite a Guardian</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Email address</label>
              <Input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleSendInvite}
              disabled={!email}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </Card>

        {/* Sent Invites */}
        {sentInvites.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="mb-4">Pending Invitations ({sentInvites.length})</h3>
            <div className="space-y-3">
              {sentInvites.map((email, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="text-sm">{email}</p>
                    <p className="text-xs text-yellow-700">Invitation sent</p>
                  </div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Suggested Contacts */}
        <Card className="p-6">
          <h3 className="mb-4">Suggested from your contacts</h3>
          <div className="space-y-3">
            {suggestedContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{contact.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.email}</p>
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
              className="w-full bg-green-600 hover:bg-green-700 h-12"
            >
              Continue to Guardian Management
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}