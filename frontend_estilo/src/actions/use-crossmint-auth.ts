import { useAuth as useCrossmintAuth } from '@crossmint/client-sdk-react-ui';
import { useAuth as useAppAuth } from '../contexts/AuthContext';
import { useStellarActions } from './stellar-actions';

/**
 * Custom hook that integrates Crossmint authentication with our app authentication
 */
export function useCrossmintIntegration() {
  const crossmintAuth = useCrossmintAuth();
  const appAuth = useAppAuth();
  const stellarActions = useStellarActions();

  // Sync Crossmint auth with our app auth
  const handleCrossmintLogin = async () => {
    try {
      // Use the correct method to open the auth modal
      await crossmintAuth.login();
      // Once Crossmint login is successful, update our app auth
      appAuth.login();
    } catch (error) {
      console.error('Crossmint login error:', error);
      throw error;
    }
  };

  const handleCrossmintLogout = async () => {
    try {
      await crossmintAuth.logout();
      // Update our app auth
      appAuth.logout();
    } catch (error) {
      console.error('Crossmint logout error:', error);
      throw error;
    }
  };

  // Check if user is authenticated in both systems
  const isFullyAuthenticated = crossmintAuth.status === 'logged-in' && appAuth.isAuthenticated;

  return {
    // Auth status
    isAuthenticated: isFullyAuthenticated,
    isLoading: crossmintAuth.status === 'loading' || appAuth.isLoading,
    user: crossmintAuth.user,
    
    // Auth actions
    login: handleCrossmintLogin,
    logout: handleCrossmintLogout,
    
    // Stellar actions
    ...stellarActions,
    
    // Raw Crossmint auth for advanced usage
    crossmintAuth,
    appAuth
  };
}
