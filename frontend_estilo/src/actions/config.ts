// Crossmint SDK Configuration for Stellar
export const CROSSMINT_CONFIG = {
  apiKey: (import.meta as any).env?.VITE_CROSSMINT_API_KEY || 'ck_production_5enPa5vs26qjWSUeU1uKJZUbSqKoSdxP8QjMjrmmxGZsxSGjeTeXUV3zN73zMqb8XKVqxA8s9P96noABY9tNmsaGxRMUXxKsAw1FKp8yUwBNJT8kz1WwVLKGYk6BRAsKEJquMYnimT2S7geCtRL2UG4Nnyq8wCLKDvcjxCTzy7H8eoM2Qfiodeubq7raCQ3U8dfHWagm4EQJy7ia8qcWU5GG',
  defaultChain: (import.meta as any).env?.VITE_CHAIN || (import.meta as any).env?.VITE_DEFAULT_CHAIN || 'stellar',
  signerType: (import.meta as any).env?.VITE_WALLET_SIGNER_TYPE || 'email',
  environment: (import.meta as any).env?.VITE_ENVIRONMENT || 'development',
  network: (import.meta as any).env?.VITE_STELLAR_NETWORK || 'mainnet', // testnet or mainnet
} as const;

// Debug: Log configuration in development
if (CROSSMINT_CONFIG.environment === 'development') {
  console.log('🔧 Crossmint Configuration:', {
    apiKey: CROSSMINT_CONFIG.apiKey.substring(0, 20) + '...',
    defaultChain: CROSSMINT_CONFIG.defaultChain,
    signerType: CROSSMINT_CONFIG.signerType,
    environment: CROSSMINT_CONFIG.environment,
    network: CROSSMINT_CONFIG.network
  });
}

// Supported chains - Only Stellar
export const SUPPORTED_CHAINS = {
  STELLAR: 'stellar',
  STELLAR_TESTNET: 'stellar-testnet',
  STELLAR_MAINNET: 'stellar-mainnet',
} as const;

// Supported signer types
export const SIGNER_TYPES = {
  EMAIL: 'email',
  API_KEY: 'api-key',
  PASSKEY: 'passkey',
  EXTERNAL_WALLET: 'external-wallet',
} as const;

// Stellar-specific transaction types
export const STELLAR_TRANSACTION_TYPES = {
  PAYMENT: 'payment',
  PATH_PAYMENT: 'path_payment',
  MANAGE_OFFER: 'manage_offer',
  CREATE_ACCOUNT: 'create_account',
  ACCOUNT_MERGE: 'account_merge',
  INFLATION: 'inflation',
  MANAGE_DATA: 'manage_data',
  BUMP_SEQUENCE: 'bump_sequence',
} as const;

// Stellar asset types
export const STELLAR_ASSETS = {
  XLM: 'XLM',
  USDC: 'USDC',
  USDT: 'USDT',
  BTC: 'BTC',
} as const;

export type Chain = typeof SUPPORTED_CHAINS[keyof typeof SUPPORTED_CHAINS];
export type SignerType = typeof SIGNER_TYPES[keyof typeof SIGNER_TYPES];
export type StellarTransactionType = typeof STELLAR_TRANSACTION_TYPES[keyof typeof STELLAR_TRANSACTION_TYPES];
export type StellarAsset = typeof STELLAR_ASSETS[keyof typeof STELLAR_ASSETS];
