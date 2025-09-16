import { axiosClient } from './axios';
import { Galaxy, Guardian } from '@/types/guardian';

// API function for creating galaxy
export const createGalaxy = async (data: {
  name: string;
  recoveryAddress: string;
  guardians: Guardian[];
}) => {
  const response = await axiosClient.post('/recovery/create-galaxy', data);
  return response.data;
};

// API function for fetching galaxy by wallet address
export const fetchGalaxy = async (walletAddress: string): Promise<Galaxy | null> => {
  try {
    const response = await axiosClient.get(`/recovery/get-galaxy/${walletAddress}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null; // Galaxy not found
    }
    throw error;
  }
};

// API function for updating guardian (placeholder - would need backend implementation)
export const updateGuardian = async (
  walletAddress: string,
  guardianIndex: number,
  data: Guardian
) => {
  // This would need to be implemented in the backend
  throw new Error('Update guardian functionality not yet implemented');
};

// API function for deleting guardian (placeholder - would need backend implementation)
export const deleteGuardian = async (walletAddress: string, guardianIndex: number) => {
  // This would need to be implemented in the backend
  throw new Error('Delete guardian functionality not yet implemented');
};
