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
    
    try {
        const stellarKit = getKit();
        const container = document.querySelector('#containerDiv') as HTMLElement;
        
        if (container) {
            // Clear any existing content
            container.innerHTML = '';
            
            // Create custom styled button container
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'wallet-button-container';
            
            // Add custom CSS for the button (only if not already added)
            let existingStyle = document.getElementById('wallet-button-styles');
            if (!existingStyle) {
                const style = document.createElement('style');
                style.id = 'wallet-button-styles';
                style.textContent = `
                .wallet-button-container button {
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                    padding: 12px 20px !important;
                    background-color: #ffffff !important;
                    border: 1px solid #000000 !important;
                    border-radius: 12px !important;
                    color: #000000 !important;
                    font-size: 14px !important;
                    font-weight: 600 !important;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                    transition: all 0.2s ease !important;
                    cursor: pointer !important;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
                    min-width: 140px !important;
                    justify-content: center !important;
                }
                .wallet-button-container button:hover {
                    background-color: #f8f9fa !important;
                    transform: translateY(-1px) !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                }
                .wallet-button-container button:active {
                    transform: translateY(0) !important;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
                }
                .wallet-button-container button svg {
                    width: 18px !important;
                    height: 18px !important;
                    fill: #000000 !important;
                    stroke: #000000 !important;
                }
                .wallet-button-container button .wallet-icon {
                    position: relative !important;
                }
                .wallet-button-container button .wallet-icon::after {
                    content: '' !important;
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    width: 6px !important;
                    height: 6px !important;
                    background-color: #000000 !important;
                    border-radius: 50% !important;
                }
            `;
                document.head.appendChild(style);
            }
            
            stellarKit.createButton({
                container: buttonContainer,
                onConnect: ({ address}) => {
                    // Storing the address in the local storage
                    localStorage.setItem('walletAddress', address);
                    // Trigger a custom event to notify components
                    window.dispatchEvent(new CustomEvent('walletConnected', { detail: { address } }));
                },
                onDisconnect: () => {
                    // Clearing the address from the local storage
                    localStorage.removeItem('walletAddress');
                    // Trigger a custom event to notify components
                    window.dispatchEvent(new CustomEvent('walletDisconnected'));
                }
            });
            
            container.appendChild(buttonContainer);
        }
    } catch (error) {
        console.error('Error creating Stellar wallet button:', error);
    }
};