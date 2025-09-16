import React from 'react';
import {
  CrossmintProvider,
  CrossmintAuthProvider,
  CrossmintWalletProvider,
} from '@crossmint/client-sdk-react-ui';
import { CROSSMINT_CONFIG } from './config';

interface CrossmintProvidersProps {
  children: React.ReactNode;
}

export function CrossmintProviders({ children }: CrossmintProvidersProps) {
  return (
    <CrossmintProvider apiKey={CROSSMINT_CONFIG.apiKey}>
      <CrossmintAuthProvider 
        authModalTitle="Sign in to Recovery App"
        loginMethods={['google', 'email']}
        appearance={{
          borderRadius: '12px',
          colors: {
            background: '#ffffff',
            textPrimary: '#000000',
            accent: '#6366f1'
          }
        }}
      >
        <CrossmintWalletProvider
          createOnLogin={{
            chain: CROSSMINT_CONFIG.defaultChain,
            signer: { 
              type: CROSSMINT_CONFIG.signerType as any
            }
          }}
        >
          {children}
        </CrossmintWalletProvider>
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
}
