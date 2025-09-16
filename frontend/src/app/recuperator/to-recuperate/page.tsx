"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
// import navBar from '@/components/navBar'; // Using global navbar now

// Mock data for accounts to recover
const mockAccounts = [
  {
    id: 1,
    publicKey: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    newAdmin: 'newadmin@example.com',
    oldAdmin: 'oldadmin@example.com',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    publicKey: 'GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
    newAdmin: 'user2@example.com',
    oldAdmin: 'previous@example.com',
    status: 'pending',
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: 3,
    publicKey: 'GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
    newAdmin: 'recovery@example.com',
    oldAdmin: 'lost@example.com',
    status: 'approved',
    createdAt: '2024-01-13T09:20:00Z'
  }
];

export default function ToRecuperatePage() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('recuperatorAuth');
    if (!authToken) {
      router.push('/recuperator');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleViewAccount = (accountId: number) => {
    router.push(`/recuperator/account/${accountId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('recuperatorAuth');
    localStorage.removeItem('recuperatorEmail');
    router.push('/recuperator');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'rejected':
        return 'Rechazado';
      default:
        return 'Pendiente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!isAuthenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar is now global */}
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/recuperator')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cuentas a Recuperar</h1>
                <p className="text-gray-600">Gestiona las solicitudes de recuperación de cuentas</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cuenta #{account.id}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(account.status)}`}>
                      {getStatusText(account.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Nuevo Admin:</p>
                      <p className="font-medium text-gray-900">{account.newAdmin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Admin Anterior:</p>
                      <p className="font-medium text-gray-900">{account.oldAdmin}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Dirección Pública:</p>
                    <p className="font-mono text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded">
                      {account.publicKey.slice(0, 20)}...{account.publicKey.slice(-20)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Creado: {new Date(account.createdAt).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusIcon(account.status)}
                  <Button
                    onClick={() => handleViewAccount(account.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {accounts.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cuentas pendientes</h3>
            <p className="text-gray-600">No hay solicitudes de recuperación en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
