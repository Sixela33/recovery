"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowUpRight, ArrowDownLeft, Users, Settings, Copy, Check, Loader2, X, Send } from 'lucide-react';
import { getStellarAccountBalance, getNativeBalance, getAssetBalances, StellarAccount } from '@/lib/stellar';
import { useRouter } from 'next/navigation';

export function BalancePage() {
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [stellarAccount, setStellarAccount] = useState<StellarAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendForm, setSendForm] = useState({
    recipient: '',
    amount: '',
    asset: 'XLM',
    memo: ''
  });
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  
  // Get wallet address from localStorage
  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
    }
  }, []);

  // Fetch Stellar account balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const account = await getStellarAccountBalance(walletAddress);
        setStellarAccount(account);
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Failed to load account balance');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  // Calculate balances
  const nativeBalance = getNativeBalance(stellarAccount);
  const assetBalances = getAssetBalances(stellarAccount);
  
  const user = { email: 'user@example.com' };
  const walletInfo = { publicKey: walletAddress || '' };

  const handleCopyPublicKey = async () => {
    if (walletInfo?.publicKey) {
      try {
        await navigator.clipboard.writeText(walletInfo.publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy public key:', error);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleGoToGuardians = () => {
    router.push('/guardians');
  };

  const handleSendMoney = () => {
    setShowSendModal(true);
  };

  const handleCloseSendModal = () => {
    setShowSendModal(false);
    setSendForm({
      recipient: '',
      amount: '',
      asset: 'XLM',
      memo: ''
    });
    setIsSending(false);
  };

  const handleSendFormChange = (field: string, value: string) => {
    setSendForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitSend = async () => {
    if (!sendForm.recipient || !sendForm.amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSending(true);
    
    // Simulate sending process
    setTimeout(() => {
      setIsSending(false);
      alert(`¡Transacción simulada exitosa!\n\nEnviado: ${sendForm.amount} ${sendForm.asset}\nA: ${sendForm.recipient}\nMemo: ${sendForm.memo || 'Sin memo'}`);
      handleCloseSendModal();
    }, 2000);
  };

  const handleReceiveMoney = async () => {
    // Copy public key to clipboard for receiving money
    if (walletInfo?.publicKey) {
      try {
        await navigator.clipboard.writeText(walletInfo.publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        alert('Clave pública copiada al portapapeles. Comparte esta dirección para recibir pagos.');
      } catch (error) {
        console.error('Failed to copy public key:', error);
        alert('Error al copiar la clave pública');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back!</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <button className="p-2">
            <Settings className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Balance Card */}
        <Card className="bg-gray-50 border-gray-200 p-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Stellar Balance</p>
            {isLoading ? (
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
              </div>
            ) : error ? (
              <div className="text-red-500 mb-4">
                <p className="text-sm">{error}</p>
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-4 text-gray-900">{nativeBalance} XLM</h2>
                {assetBalances.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 text-sm mb-4">
                    {assetBalances.slice(0, 3).map((asset, index) => (
                      <span key={index} className="text-gray-600">
                        {parseFloat(asset.balance).toFixed(2)} {asset.asset_code || 'Unknown'}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
            {walletInfo?.publicKey && (
              <div className="flex items-center justify-center space-x-2">
                <p className="text-sm text-gray-500 font-mono">
                  {walletInfo.publicKey.slice(0, 8)}...{walletInfo.publicKey.slice(-8)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPublicKey}
                  className="text-gray-500 hover:bg-gray-100 p-1 h-6 w-6"
                  title="Copy public key"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-16 flex flex-col space-y-1 bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            onClick={handleSendMoney}
          >
            <ArrowUpRight className="w-5 h-5" />
            <span className="text-sm">Send</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col space-y-1 bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            onClick={handleReceiveMoney}
          >
            <ArrowDownLeft className="w-5 h-5" />
            <span className="text-sm">Receive</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col space-y-1 bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            onClick={handleGoToGuardians}
          >
            <Users className="w-5 h-5" />
            <span className="text-sm">Guardians</span>
          </Button>
        </div>
      </div>

      {/* Account Info */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
        </div>

        <div className="space-y-3">
          <Card className="p-4 bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Account Type</p>
                  <p className="text-xs text-gray-500">Stellar Testnet</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">Active</p>
                <span className="text-xs text-green-600">Connected</span>
              </div>
            </div>
          </Card>

          {stellarAccount && (
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full p-2 bg-purple-100 text-purple-600">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Sequence Number</p>
                    <p className="text-xs text-gray-500">Account Sequence</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{stellarAccount.sequence}</p>
                  <span className="text-xs text-gray-500">Current</span>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full p-2 bg-green-100 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Subentry Count</p>
                  <p className="text-xs text-gray-500">Account Entries</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{stellarAccount?.subentry_count || 0}</p>
                <span className="text-xs text-gray-500">Entries</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Send Money Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Enviar Fondos</h2>
              <button
                onClick={handleCloseSendModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección del destinatario *
                </label>
                <input
                  type="text"
                  value={sendForm.recipient}
                  onChange={(e) => handleSendFormChange('recipient', e.target.value)}
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Amount and Asset */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    step="0.0000001"
                    value={sendForm.amount}
                    onChange={(e) => handleSendFormChange('amount', e.target.value)}
                    placeholder="0.0000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activo
                  </label>
                  <select
                    value={sendForm.asset}
                    onChange={(e) => handleSendFormChange('asset', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="XLM">XLM</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>

              {/* Memo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memo (opcional)
                </label>
                <input
                  type="text"
                  value={sendForm.memo}
                  onChange={(e) => handleSendFormChange('memo', e.target.value)}
                  placeholder="Mensaje opcional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Balance Info */}
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">
                  Balance disponible: <span className="font-medium">{nativeBalance} XLM</span>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleCloseSendModal}
                disabled={isSending}
                className="px-4 py-2"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitSend}
                disabled={isSending}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
