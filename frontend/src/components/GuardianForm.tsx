"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, Trash2, Shield, Users, ArrowLeft } from 'lucide-react';

// Validation schema for form input (simplified version of Guardian)
const guardianSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phrase: z.string().min(1, 'Phrase is required'),
});

const galaxySchema = z.object({
  recoveryAddress: z.string().min(1, 'Recovery address is required'),
  guardians: z.array(guardianSchema).min(1, 'At least one guardian is required'),
});

export type GalaxyFormData = z.infer<typeof galaxySchema>;

interface GuardianFormProps {
  walletAddress: string;
  isConnected: boolean;
  onSubmit: (data: GalaxyFormData) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function GuardianForm({ 
  walletAddress, 
  isConnected, 
  onSubmit, 
  onBack,
  isLoading = false 
}: GuardianFormProps) {
  const form = useForm<GalaxyFormData>({
    resolver: zodResolver(galaxySchema),
    defaultValues: {
      recoveryAddress: walletAddress,
      guardians: [{ email: '', phrase: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'guardians',
  });

  const handleSubmit = (data: GalaxyFormData) => {
    onSubmit(data);
  };

  const addGuardian = () => {
    append({ email: '', phrase: '' });
  };

  const removeGuardian = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mr-3">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Create Your Galaxy</h1>
        </div>
        <p className="text-muted-foreground">
          Set up guardians to protect your wallet and enable recovery
        </p>
      </div>

      {/* Wallet Connection Status */}
      {isConnected ? (
        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Wallet Connected: {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Please connect your wallet to create a galaxy
            </span>
          </div>
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Recovery Address */}
          <FormField
            control={form.control}
            name="recoveryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recovery Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the wallet address to be recovered"
                    {...field}
                    disabled={isConnected || isLoading}
                  />
                </FormControl>
                <FormMessage />
                {isConnected && (
                  <p className="text-sm text-muted-foreground">
                    This is automatically set to your connected wallet address
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Guardians Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Guardians</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGuardian}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Guardian
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-border rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Guardian {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGuardian(index)}
                      className="text-destructive hover:text-destructive"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`guardians.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="guardian@example.com"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`guardians.${index}.phrase`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recovery Phrase</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter recovery phrase or instructions"
                            className="min-h-[80px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={!isConnected || isLoading}
            >
              {isLoading ? (
                'Creating Galaxy...'
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Create Galaxy
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
