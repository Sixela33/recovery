import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, Users, Smartphone } from 'lucide-react';
import { useAuth as useCrossmintAuth } from '@crossmint/client-sdk-react-ui';
import { useAuth as useAppAuth } from '../contexts/AuthContext';

interface OnboardingScreenProps {
  onNavigate: (screen: string) => void;
}

export function OnboardingScreen({ onNavigate }: OnboardingScreenProps) {
  const crossmintAuth = useCrossmintAuth();
  const appAuth = useAppAuth();
  const navigate = useNavigate();

  // Redirect to dashboard when authenticated
  useEffect(() => {
    if (crossmintAuth.status === 'logged-in' && appAuth.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [crossmintAuth.status, appAuth.isAuthenticated, navigate]);

  const handleSignIn = async () => {
    try {
      console.log('Opening Crossmint auth modal...');
      console.log('Current auth status:', crossmintAuth.status);
      console.log('Current user:', crossmintAuth.user);
      
      // This will open the Crossmint modal with Google and Email options
      await crossmintAuth.login();
      
      console.log('Crossmint login successful, updating app auth...');
      console.log('New auth status:', crossmintAuth.status);
      console.log('New user:', crossmintAuth.user);
      
      // Update our app auth state
      appAuth.login();
    } catch (error) {
      console.error('Login failed:', error);
      console.error('Error details:', error);
      // Handle login error (show toast, etc.)
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-8 py-8">
        <div className="bg-white/20 rounded-full p-6 mb-8">
          <Shield className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-3xl font-semibold text-center mb-4">SafeWallet</h1>
        <p className="text-center mb-12 leading-relaxed text-lg text-blue-100">
          Your crypto wallet protected by people you trust
        </p>

        {/* Features */}
        <div className="space-y-6 mb-12 w-full max-w-sm lg:max-w-content">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Protected by Friends</h3>
              <p className="text-blue-200 text-sm">Your trusted network keeps you safe</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Social Recovery</h3>
              <p className="text-blue-200 text-sm">Never lose access to your funds</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Simple & Secure</h3>
              <p className="text-blue-200 text-sm">Easy to use, impossible to lose</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 lg:px-8 pb-8">
        <div className="max-w-button mx-auto">
          <Button 
            onClick={handleSignIn}
            disabled={crossmintAuth.status !== 'logged-out'}
            className="w-full max-w-button bg-white text-blue-600 hover:bg-blue-50 h-14 text-lg shadow-lg disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
{crossmintAuth.status !== 'logged-out' ? 'Connecting...' : 'Get Started'}
          </Button>
        </div>
        
        <p className="text-center text-blue-200 text-sm mt-4">
          Sign in with Google or Email to create your Stellar wallet
        </p>
      </div>
    </div>
  );
}