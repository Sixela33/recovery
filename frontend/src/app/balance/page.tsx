"use client";

import { useState, useEffect } from 'react';
import { BalancePage } from '@/components/BalancePage';

export default function Balance() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check wallet connection status
  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
      setIsConnected(true);
    } else {
      setWalletAddress('');
      setIsConnected(false);
    }
    setIsLoading(false);
  }, []);

  // Listen for wallet connection events
  useEffect(() => {
    const handleWalletConnected = (event: CustomEvent) => {
      const address = event.detail.address;
      setWalletAddress(address);
      setIsConnected(true);
    };

    const handleWalletDisconnected = () => {
      setWalletAddress('');
      setIsConnected(false);
    };

    window.addEventListener('walletConnected', handleWalletConnected as EventListener);
    window.addEventListener('walletDisconnected', handleWalletDisconnected);

    return () => {
      window.removeEventListener('walletConnected', handleWalletConnected as EventListener);
      window.removeEventListener('walletDisconnected', handleWalletDisconnected);
    };
  }, []);

  // Redirect to home if not connected (only after loading is complete)
  useEffect(() => {
    if (!isLoading && !isConnected) {
      window.location.href = '/';
    }
  }, [isConnected, isLoading]);

  // Show loading while checking wallet status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show redirecting message if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <BalancePage />;
}
