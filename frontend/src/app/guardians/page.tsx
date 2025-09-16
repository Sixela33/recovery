"use client";

import { useState, useEffect } from 'react';
import { GuardianList } from '@/components/GuardianList';
import { GuardianForm } from '@/components/GuardianForm';
import { createGalaxy, fetchGalaxy, updateGalaxy } from '@/lib/api';
import { Galaxy } from '@/types/guardian';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Guardians() {
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
    mutationFn: ({ galaxyId, data }: { galaxyId: number; data: any }) => updateGalaxy(galaxyId, data),
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

  const handleFormSubmit = (data: any) => {
    if (isEditMode && currentGalaxy) {
      // Update existing galaxy
      updateGalaxyMutation.mutate({ galaxyId: currentGalaxy.id, data });
    } else {
      // Create new galaxy
      createGalaxyMutation.mutate(data);
    }
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your guardians...</p>
        </div>
      </div>
    );
  }

  // Show connection screen if wallet is not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Guardians Panel</h1>
              <p className="text-gray-600 text-lg mb-8">
                Connect your wallet to manage your guardians and set up wallet recovery
              </p>
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-yellow-800">
                    Wallet Not Connected
                  </span>
                </div>
                <p className="text-sm text-yellow-700">
                  Please connect your wallet using the button in the top right corner to access your guardians.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
