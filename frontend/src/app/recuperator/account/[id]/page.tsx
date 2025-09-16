"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User, Mail, Key, CheckCircle, XCircle, Clock } from 'lucide-react';
// import navBar from '@/components/navBar'; // Using global navbar now

// Mock data for account details
const mockAccountDetails = {
  1: {
    id: 1,
    publicKey: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    newAdmin: 'newadmin@example.com',
    oldAdmin: 'oldadmin@example.com',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    guardians: ['guardian1@example.com', 'guardian2@example.com', 'guardian3@example.com'],
    recoveryReason: 'Usuario perdió acceso a su cuenta principal',
    additionalInfo: 'Solicitud de recuperación urgente por pérdida de credenciales'
  },
  2: {
    id: 2,
    publicKey: 'GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
    newAdmin: 'user2@example.com',
    oldAdmin: 'previous@example.com',
    status: 'pending',
    createdAt: '2024-01-14T15:45:00Z',
    guardians: ['guardian4@example.com', 'guardian5@example.com'],
    recoveryReason: 'Cambio de administrador autorizado',
    additionalInfo: 'Transferencia legítima de administración'
  },
  3: {
    id: 3,
    publicKey: 'GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
    newAdmin: 'recovery@example.com',
    oldAdmin: 'lost@example.com',
    status: 'approved',
    createdAt: '2024-01-13T09:20:00Z',
    guardians: ['guardian6@example.com', 'guardian7@example.com', 'guardian8@example.com'],
    recoveryReason: 'Recuperación de cuenta comprometida',
    additionalInfo: 'Aprobado por consenso de guardianes'
  }
};

export default function AccountDetailPage() {
  const [account, setAccount] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const params = useParams();
  const accountId = parseInt(params.id as string);

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('recuperatorAuth');
    if (!authToken) {
      router.push('/recuperator');
      return;
    }
    setIsAuthenticated(true);

    // Load account details
    const accountData = mockAccountDetails[accountId as keyof typeof mockAccountDetails];
    if (accountData) {
      setAccount(accountData);
    } else {
      router.push('/recuperator/to-recuperate');
    }
  }, [accountId, router]);

  const handleApprove = async () => {
    setIsProcessing(true);
    // Simulate approval process
    setTimeout(() => {
      alert('Cuenta aprobada exitosamente');
      router.push('/recuperator/to-recuperate');
    }, 1500);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    // Simulate rejection process
    setTimeout(() => {
      alert('Cuenta rechazada');
      router.push('/recuperator/to-recuperate');
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-500" />;
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

  if (!isAuthenticated || !account) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar is now global */}
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/recuperator/to-recuperate')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalle de Cuenta #{account.id}</h1>
              <p className="text-gray-600">Revisa y aprueba la solicitud de recuperación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Status */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Estado de la Solicitud</h2>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(account.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(account.status)}`}>
                    {getStatusText(account.status)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Creado: {new Date(account.createdAt).toLocaleString('es-ES')}</p>
              </div>
            </Card>

            {/* Admin Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Administradores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Nuevo Admin</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{account.newAdmin}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">Admin Anterior</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{account.oldAdmin}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Public Key */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Key className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Dirección Pública</h2>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-mono text-sm text-gray-700 break-all">{account.publicKey}</p>
              </div>
            </Card>

            {/* Recovery Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles de Recuperación</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Motivo de Recuperación:</h3>
                  <p className="text-gray-700">{account.recoveryReason}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Información Adicional:</h3>
                  <p className="text-gray-700">{account.additionalInfo}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guardians */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Guardianes</h2>
              <div className="space-y-3">
                {account.guardians.map((guardian: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{guardian}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            {account.status === 'pending' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones</h2>
                <div className="space-y-3">
                  <Button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aprobar Recuperación
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={isProcessing}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rechazar Solicitud
                  </Button>
                </div>
                {isProcessing && (
                  <p className="text-sm text-gray-600 mt-3 text-center">Procesando...</p>
                )}
              </Card>
            )}

            {/* Status Info */}
            {account.status !== 'pending' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado Final</h2>
                <div className="text-center">
                  {getStatusIcon(account.status)}
                  <p className="mt-2 font-medium text-gray-900">{getStatusText(account.status)}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Esta solicitud ya ha sido procesada
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
