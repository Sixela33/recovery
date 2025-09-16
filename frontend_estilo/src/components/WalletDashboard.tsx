import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Users, Settings, ArrowUpRight, ArrowDownLeft, MoreHorizontal, LogOut, Copy, Check } from 'lucide-react';
import { useCrossmintIntegration } from '../actions/use-crossmint-auth';
import { STELLAR_ASSETS } from '../actions/config';
import type { Screen } from '../App';

interface WalletDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function WalletDashboard({ onNavigate }: WalletDashboardProps) {
  const { logout, getWalletInfo, getBalance, user } = useCrossmintIntegration();
  const navigate = useNavigate();
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [xlmBalance, setXlmBalance] = useState<string>('0');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        const [walletResult, balanceResult] = await Promise.all([
          getWalletInfo(),
          getBalance(STELLAR_ASSETS.XLM)
        ]);

        if (walletResult.success) {
          setWalletInfo(walletResult.data);
        }

        if (balanceResult.success) {
          setXlmBalance(balanceResult.data || '0');
        }
      } catch (error) {
        console.error('Failed to load wallet data:', error);
      }
    };

    loadWalletData();
  }, [getWalletInfo, getBalance]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCopyPublicKey = async () => {
    if (walletInfo?.publicKey) {
      try {
        await navigator.clipboard.writeText(walletInfo.publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy public key:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = walletInfo.publicKey;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };
  const transactions = [
    { id: 1, type: 'received', amount: '+0.25 ETH', from: 'Alex Chen', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'sent', amount: '-0.1 ETH', to: 'Coffee Shop', time: '1 day ago', status: 'completed' },
    { id: 3, type: 'received', amount: '+50 USDC', from: 'Sarah Kim', time: '3 days ago', status: 'completed' },
    { id: 4, type: 'sent', amount: '-0.05 ETH', to: 'Gas Fee', time: '1 week ago', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 pt-12 pb-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Welcome back!</h1>
            <p className="text-blue-200">{user?.email || 'Stellar Wallet'}</p>
            {walletInfo && (
              <div className="flex items-center space-x-2">
                <p className="text-blue-300 text-sm">
                  {walletInfo.publicKey?.slice(0, 8)}...{walletInfo.publicKey?.slice(-8)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPublicKey}
                  className="text-blue-300 hover:bg-white/20 p-1 h-6 w-6"
                  title="Copy public key"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <button className="p-2">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
          <div className="text-center">
            <p className="text-blue-200 mb-2">Stellar Balance</p>
            <h2 className="text-4xl font-bold mb-4">{xlmBalance} XLM</h2>
            <div className="flex justify-center space-x-4 text-sm mb-4">
              <span>Stellar Network</span>
              <span>•</span>
              <span>Mainnet</span>
            </div>
            {walletInfo?.publicKey && (
              <div className="flex items-center justify-center space-x-2">
                <p className="text-blue-200 text-xs font-mono">
                  {walletInfo.publicKey}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPublicKey}
                  className="text-blue-200 hover:bg-white/20 p-1 h-6 w-6"
                  title="Copy full public key"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Protection Status */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-green-800 mb-1">Protected by 5 guardians</p>
              <p className="text-green-600 text-sm">Your wallet is fully secured</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('guardian-management')}
              className="text-green-700 hover:bg-green-100"
            >
              Manage
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="h-16 flex flex-col space-y-1">
            <ArrowUpRight className="w-5 h-5" />
            <span className="text-sm">Send</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col space-y-1">
            <ArrowDownLeft className="w-5 h-5" />
            <span className="text-sm">Receive</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col space-y-1"
            onClick={() => onNavigate('add-guardians')}
          >
            <Users className="w-5 h-5" />
            <span className="text-sm">Guardians</span>
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-2 ${
                    tx.type === 'received' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {tx.type === 'received' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`}</p>
                    <p className="text-xs text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${
                    tx.type === 'received' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {tx.amount}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Access */}
      <div className="px-6 py-8">
        <Card className="p-4 border-orange-200 bg-orange-50">
          <div className="text-center">
            <p className="text-orange-800 mb-2">Lost access to your wallet?</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('lost-access')}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              Get help from guardians
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}