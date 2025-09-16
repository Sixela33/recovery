import { useWallet } from '@crossmint/client-sdk-react-ui';
import { 
  StellarTransactionParams, 
  TransactionResult, 
  StellarWalletInfo,
  ActionResponse 
} from './types';
import { CROSSMINT_CONFIG, STELLAR_ASSETS } from './config';

/**
 * Hook for Stellar-specific wallet actions
 */
export function useStellarActions() {
  const { wallet, getOrCreateWallet } = useWallet();

  /**
   * Sign and send a Stellar transaction
   */
  const signTransaction = async (params: StellarTransactionParams): Promise<ActionResponse<TransactionResult>> => {
    try {
      if (!wallet) {
        return {
          success: false,
          error: 'Wallet not connected'
        };
      }

      // Validate Stellar address format (Stellar public keys start with G)
      if (!params.to.startsWith('G')) {
        return {
          success: false,
          error: 'Invalid Stellar address format'
        };
      }

      // Use the default asset if not specified
      const asset = params.asset || STELLAR_ASSETS.XLM;
      
      // Send transaction using Crossmint SDK
      const result = await wallet.send(
        params.to,
        asset,
        params.amount
      );

      return {
        success: true,
        data: {
          success: true,
          transactionHash: result.transactionId || result.hash,
          explorerLink: result.explorerLink
        }
      };

    } catch (error) {
      console.error('Stellar transaction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed'
      };
    }
  };

  /**
   * Get Stellar wallet information
   */
  const getWalletInfo = async (): Promise<ActionResponse<StellarWalletInfo>> => {
    try {
      if (!wallet) {
        return {
          success: false,
          error: 'Wallet not connected'
        };
      }

      const address = wallet.address;
      const balances = await wallet.balances();

      return {
        success: true,
        data: {
          publicKey: address,
          network: CROSSMINT_CONFIG.network as 'testnet' | 'mainnet',
          balance: Array.isArray(balances) ? balances.map((balance: any) => ({
            asset: balance.asset || 'XLM',
            amount: balance.amount || '0',
            assetType: balance.asset === 'XLM' ? 'native' : 'credit_alphanum4',
            assetCode: balance.asset !== 'XLM' ? balance.asset : undefined
          })) : []
        }
      };

    } catch (error) {
      console.error('Get wallet info error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get wallet info'
      };
    }
  };

  /**
   * Get balance for a specific Stellar asset
   */
  const getBalance = async (asset: string = STELLAR_ASSETS.XLM): Promise<ActionResponse<string>> => {
    try {
      if (!wallet) {
        return {
          success: false,
          error: 'Wallet not connected'
        };
      }

      const balances = await wallet.balances();
      const assetBalance = Array.isArray(balances) ? balances.find((balance: any) => 
        balance.asset === asset || (asset === STELLAR_ASSETS.XLM && !balance.asset)
      ) : null;

      return {
        success: true,
        data: assetBalance?.amount || '0'
      };

    } catch (error) {
      console.error('Get balance error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get balance'
      };
    }
  };

  /**
   * Create a new Stellar wallet
   */
  const createWallet = async (): Promise<ActionResponse<StellarWalletInfo>> => {
    try {
      const newWallet = await getOrCreateWallet({
        chain: CROSSMINT_CONFIG.defaultChain,
        signer: { 
          type: CROSSMINT_CONFIG.signerType as any
        }
      });

      if (!newWallet) {
        return {
          success: false,
          error: 'Failed to create wallet'
        };
      }

      return {
        success: true,
        data: {
          publicKey: newWallet.address,
          network: CROSSMINT_CONFIG.network as 'testnet' | 'mainnet'
        }
      };

    } catch (error) {
      console.error('Create wallet error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create wallet'
      };
    }
  };

  /**
   * Validate Stellar address
   */
  const validateAddress = (address: string): boolean => {
    // Stellar addresses are 56 characters long and start with 'G'
    return address.length === 56 && address.startsWith('G');
  };

  return {
    signTransaction,
    getWalletInfo,
    getBalance,
    createWallet,
    validateAddress,
    isConnected: !!wallet
  };
}
