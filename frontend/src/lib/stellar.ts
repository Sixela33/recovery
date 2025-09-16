import { Horizon } from '@stellar/stellar-sdk';

// Initialize Stellar server for testnet
const server = new Horizon.Server('https://horizon-testnet.stellar.org');

export interface StellarBalance {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
}

export interface StellarAccount {
  account_id: string;
  balances: StellarBalance[];
  sequence: string;
  subentry_count: number;
}

export async function getStellarAccountBalance(publicKey: string): Promise<StellarAccount | null> {
  try {
    if (!publicKey) {
      throw new Error('Public key is required');
    }

    const account = await server.loadAccount(publicKey);
    
    return {
      account_id: account.accountId(),
      balances: account.balances,
      sequence: account.sequenceNumber(),
      subentry_count: account.subentry_count
    };
  } catch (error) {
    console.error('Error fetching Stellar account balance:', error);
    return null;
  }
}

export function formatStellarBalance(balance: string): string {
  const numBalance = parseFloat(balance);
  return numBalance.toFixed(2);
}

export function getNativeBalance(account: StellarAccount | null): string {
  if (!account) return '0.00';
  
  const nativeBalance = account.balances.find(balance => balance.asset_type === 'native');
  return nativeBalance ? formatStellarBalance(nativeBalance.balance) : '0.00';
}

export function getAssetBalances(account: StellarAccount | null): StellarBalance[] {
  if (!account) return [];
  
  return account.balances.filter(balance => balance.asset_type !== 'native');
}
