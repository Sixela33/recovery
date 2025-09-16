"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { Guardian } from '@/types/guardian';

interface GuardianListProps {
  guardians: Guardian[];
  onAddGuardian: () => void;
  onEditGuardian: (guardian: Guardian, index: number) => void;
  onDeleteGuardian: (index: number) => void;
  isLoading?: boolean;
}

export function GuardianList({ 
  guardians, 
  onEditGuardian, 
  onDeleteGuardian,
  isLoading = false 
}: GuardianListProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Your Guardians</h2>
        </div>
      </div>

      {/* Guardians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guardians.map((guardian, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Guardian {index + 1}</CardTitle>
                    <CardDescription className="text-sm">
                      {guardian.email}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Recovery Phrase:
                  </p>
                  <p className="text-sm bg-muted/50 p-2 rounded-md font-mono text-xs break-all">
                    {guardian.phrase}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Guardian Account:
                  </p>
                  <p className="text-sm bg-muted/50 p-2 rounded-md font-mono text-xs break-all">
                    {guardian.account}
                  </p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditGuardian(guardian, index)}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteGuardian(index)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {guardians.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No Guardians Yet</h3>
                <p className="text-muted-foreground">
                  Add guardians to protect your wallet and enable recovery
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
