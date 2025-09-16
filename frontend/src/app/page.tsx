"use client";

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';
import { GuardianList } from '@/components/GuardianList';
import { GalaxyFormData, GuardianForm } from '@/components/GuardianForm';
import { createGalaxy, fetchGalaxy, updateGalaxy } from '@/lib/api';
import { Galaxy, Guardian } from '@/types/guardian';
import { updateSigners } from '@/lib/updateSigners';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentGalaxy, setCurrentGalaxy] = useState<Galaxy | null>(null);
  const [editingGuardian, setEditingGuardian] = useState<{ guardian: any; index: number } | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch galaxy for the connected wallet
  const { data: galaxy, isLoading: galaxyLoading, refetch: refetchGalaxy } = useQuery({
    queryKey: ['galaxy', walletAddress],
    queryFn: () => fetchGalaxy(walletAddress),
    enabled: isConnected && !!walletAddress,
  });

  // React Query mutation for creating galaxy
  const createGalaxyMutation = useMutation({
    mutationFn: createGalaxy,
    onSuccess: (data) => {
      toast.success('Galaxy created successfully!');
      console.log('Galaxy created:', data);
      setCurrentGalaxy(data);
      setShowForm(false);
      refetchGalaxy();
    },
    onError: (error) => {
      console.error('Error creating galaxy:', error);
      toast.error('Failed to create galaxy. Please try again.');
    },
  });

  // React Query mutation for updating galaxy
  const updateGalaxyMutation = useMutation({
    mutationFn: ({ walletAddress, data }: { walletAddress: string; data: any }) => updateGalaxy(walletAddress, data),
    onSuccess: (data) => {
      toast.success('Galaxy updated successfully!');
      console.log('Galaxy updated:', data);
      setCurrentGalaxy(data);
      setShowForm(false);
      setIsEditMode(false);
      setEditingGuardian(null);
      refetchGalaxy();
    },
    onError: (error) => {
      console.error('Error updating galaxy:', error);
      toast.error('Failed to update galaxy. Please try again.');
    },
  });

  // Check wallet connection status
  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
      setIsConnected(true);
    } else {
      setWalletAddress('');
      setIsConnected(false);
    }
  }, []);

  // Listen for wallet connection events
  useEffect(() => {
    const handleWalletConnected = (event: CustomEvent) => {
      const address = event.detail.address;
      setWalletAddress(address);
      setIsConnected(true);
    };

    const handleWalletDisconnected = () => {
      setWalletAddress('');
      setIsConnected(false);
      setCurrentGalaxy(null);
    };

    window.addEventListener('walletConnected', handleWalletConnected as EventListener);
    window.addEventListener('walletDisconnected', handleWalletDisconnected);

    return () => {
      window.removeEventListener('walletConnected', handleWalletConnected as EventListener);
      window.removeEventListener('walletDisconnected', handleWalletDisconnected);
    };
  }, []);

  // Set current galaxy when galaxy is loaded
  useEffect(() => {
    if (galaxy) {
      setCurrentGalaxy(galaxy);
    } else {
      setCurrentGalaxy(null);
    }
  }, [galaxy]);

  const handleFormSubmit = async (data: GalaxyFormData) => {
    if (isEditMode && currentGalaxy) {
      // Update existing galaxy
      updateGalaxyMutation.mutate({ walletAddress: currentGalaxy.recoveryAddress, data });
    } else {
      // Create new galaxy
      createGalaxyMutation.mutate(data);
    }

    const transaction = await updateSigners(data.guardians.map(guardian => guardian.phrase), 5);

  };

  const handleAddGuardian = () => {
    setIsEditMode(false);
    setEditingGuardian(null);
    setShowForm(true);
  };

  const handleEditGuardian = (guardian: any, index: number) => {
    setEditingGuardian({ guardian, index });
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDeleteGuardian = (index: number) => {
    // TODO: Implement delete functionality
    console.log('Delete guardian:', index);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingGuardian(null);
  };

  // Show loading state while checking for existing galaxy
  if (galaxyLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your galaxy...</p>
        </div>
      </div>
    );
  }

  // Show connection screen if wallet is not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Welcome to Recovery</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Connect your wallet to create your galaxy and set up guardians for wallet recovery
              </p>
              <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-md mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Wallet Not Connected
                  </span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please connect your wallet using the button in the top right corner to get started.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentGalaxy && currentGalaxy.guardians.length > 0 && !showForm ? (
            // Show guardian list if user has guardians
            <GuardianList
              guardians={currentGalaxy.guardians}
              onAddGuardian={handleAddGuardian}
              onEditGuardian={handleEditGuardian}
              onDeleteGuardian={handleDeleteGuardian}
              isLoading={createGalaxyMutation.isPending}
            />
          ) : (
            // Show form if user has no guardians or wants to add more
            <GuardianForm
              walletAddress={walletAddress}
              isConnected={isConnected}
              onSubmit={handleFormSubmit}
              onBack={currentGalaxy && currentGalaxy.guardians.length > 0 ? handleBackToList : undefined}
              isLoading={createGalaxyMutation.isPending || updateGalaxyMutation.isPending}
              galaxy={isEditMode && currentGalaxy ? currentGalaxy : undefined}
              isEditMode={isEditMode}
            />
          )}
        </div>
      </main>
    </div>
  );
}
