"use client";

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
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
    }
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
