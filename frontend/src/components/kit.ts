"use client";
import {
    StellarWalletsKit,
    WalletNetwork,
    allowAllModules,
    XBULL_ID
} from '@creit.tech/stellar-wallets-kit';

let kit: StellarWalletsKit | null = null;

export const getKit = (): StellarWalletsKit => {
    if (typeof window === 'undefined') {
        throw new Error('StellarWalletsKit can only be used on the client side');
    }
    
    if (!kit) {
        kit = new StellarWalletsKit({
            network: WalletNetwork.TESTNET,
            selectedWalletId: XBULL_ID,
            modules: allowAllModules(),
        });
    }
    
    return kit;
};

export const createButton = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        throw new Error('createButton can only be used on the client side');
    }
    
    const stellarKit = getKit();
    stellarKit.createButton({
        container: document.querySelector('#containerDiv') as HTMLElement,
        onConnect: ({ address}) => {
            // Storing the address in the local storage
            localStorage.setItem('walletAddress', address);
        },
        onDisconnect: () => {
          // Clearing the address from the local storage
          localStorage.removeItem('walletAddress');
        }
    });
};