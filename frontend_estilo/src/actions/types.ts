// Stellar Transaction types
export interface StellarTransactionParams {
  to: string;
  amount: string;
  asset?: string; // XLM, USDC, etc.
  memo?: string;
  network?: 'testnet' | 'mainnet';
}

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  explorerLink?: string;
  error?: string;
}

// Stellar Wallet types
export interface StellarWalletInfo {
  publicKey: string; // Stellar uses public keys as addresses
  network: 'testnet' | 'mainnet';
  balance?: StellarBalance[];
  sequence?: string;
}

export interface StellarBalance {
  asset: string;
  amount: string;
  assetType: 'native' | 'credit_alphanum4' | 'credit_alphanum12';
  assetCode?: string;
  assetIssuer?: string;
}

export interface BalanceInfo {
  token: string;
  amount: string;
  symbol: string;
}

// Guardian types
export interface GuardianInfo {
  id: string;
  email: string;
  name?: string;
  status: 'pending' | 'active' | 'inactive';
  publicKey?: string;
}

// Recovery types
export interface RecoveryRequest {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  guardians: GuardianInfo[];
  createdAt: string;
  expiresAt: string;
}

// Action response types
export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
