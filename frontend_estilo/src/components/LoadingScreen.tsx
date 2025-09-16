import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { Screen } from '../App';

interface LoadingScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LoadingScreen({ onNavigate }: LoadingScreenProps) {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onNavigate('dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white px-6">
      <div className="text-center">
        {/* Google Logo */}
        <div className="bg-white rounded-full p-4 mb-8 inline-block">
          <svg className="w-12 h-12" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        
        {/* Loading Animation */}
        <div className="mb-6">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-white" />
        </div>
        
        <h2 className="text-xl mb-2">Signing you in...</h2>
        <p className="text-blue-200">Setting up your secure wallet</p>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/50 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}