"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createButton } from './kit';
import { ShieldIcon, User, LogOut } from 'lucide-react';

export default function navBar() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecuperatorLoggedIn, setIsRecuperatorLoggedIn] = useState(false);
  const [recuperatorEmail, setRecuperatorEmail] = useState('');

  useEffect(() => {
    // Check initial wallet connection status
    const address = localStorage.getItem('walletAddress');
    setIsConnected(!!address);

    // Check initial recuperator login status
    const recuperatorAuth = localStorage.getItem('recuperatorAuth');
    const email = localStorage.getItem('recuperatorEmail');
    setIsRecuperatorLoggedIn(!!recuperatorAuth);
    setRecuperatorEmail(email || '');

    // Only create wallet button if not logged in as recuperator
    if (!recuperatorAuth) {
      createButton();
    }

    // Listen for wallet connection events
    const handleWalletConnected = () => {
      setIsConnected(true);
    };

    const handleWalletDisconnected = () => {
      setIsConnected(false);
    };

    // Listen for storage changes (for recuperator login/logout)
    const handleStorageChange = (e: StorageEvent) => {
      // Only handle changes to our specific keys
      if (e.key === 'recuperatorAuth' || e.key === 'recuperatorEmail') {
        const newRecuperatorAuth = localStorage.getItem('recuperatorAuth');
        const newEmail = localStorage.getItem('recuperatorEmail');
        setIsRecuperatorLoggedIn(!!newRecuperatorAuth);
        setRecuperatorEmail(newEmail || '');
        
        // Create or remove wallet button based on recuperator status
        if (newRecuperatorAuth) {
          // Remove wallet button if recuperator is logged in
          const container = document.querySelector('#containerDiv') as HTMLElement;
          if (container) {
            container.innerHTML = '';
          }
        } else {
          // Create wallet button if recuperator is not logged in
          createButton();
        }
      }
    };

    window.addEventListener('walletConnected', handleWalletConnected);
    window.addEventListener('walletDisconnected', handleWalletDisconnected);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('walletConnected', handleWalletConnected);
      window.removeEventListener('walletDisconnected', handleWalletDisconnected);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Determine the link destination based on connection status
  const getLinkDestination = () => {
    if (isRecuperatorLoggedIn) {
      return '/recuperator/to-recuperate';
    }
    return isConnected ? '/balance' : '/';
  };

  const handleRecuperatorLogout = () => {
    localStorage.removeItem('recuperatorAuth');
    localStorage.removeItem('recuperatorEmail');
    setIsRecuperatorLoggedIn(false);
    setRecuperatorEmail('');
    // Trigger storage event to update other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'recuperatorAuth',
      newValue: null,
      oldValue: 'true'
    }));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href={getLinkDestination()} className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center shadow-sm">
                <ShieldIcon className="w-5 h-5 text-white" />
              </div>
              <span className="app-title text-white text-xl">Recovery</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Recuperator Login Button - only show when not logged in as recuperator */}
            {!isRecuperatorLoggedIn && (
              <Link
                href="/recuperator"
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Iniciar sesión como recuperador</span>
              </Link>
            )}

            {/* Recuperator Logout - only show when logged in as recuperator */}
            {isRecuperatorLoggedIn && (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">
                  Recuperador: {recuperatorEmail}
                </span>
                <button
                  onClick={handleRecuperatorLogout}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Cerrar sesión</span>
                </button>
              </div>
            )}

            {/* Wallet Button Container - only show when not logged in as recuperator */}
            {!isRecuperatorLoggedIn && <div id="containerDiv" />}
          </div>
        </div>
      </div>
    </nav>
  )
}
