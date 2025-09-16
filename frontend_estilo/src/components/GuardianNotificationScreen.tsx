import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Shield, User, AlertTriangle, CheckCircle, X, ArrowLeft } from 'lucide-react';
import type { Screen } from '../App';

interface GuardianNotificationScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function GuardianNotificationScreen({ onNavigate }: GuardianNotificationScreenProps) {
  const [step, setStep] = useState(1);
  const [securityAnswers, setSecurityAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });
  const [approved, setApproved] = useState(false);

  const requestDetails = {
    requester: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: '👨‍💼',
    requestTime: '3 minutes ago',
    location: 'San Francisco, CA',
    device: 'iPhone 14 Pro'
  };

  const securityQuestions = [
    { id: 'question1', question: "What's John's favorite coffee shop?", hint: 'Where you met for lunch last week' },
    { id: 'question2', question: "What's the name of John's pet?", hint: 'The golden retriever' },
    { id: 'question3', question: "What city did John grow up in?", hint: 'Where his parents still live' }
  ];

  const handleSecurityAnswer = (questionId: string, answer: string) => {
    setSecurityAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleApprove = () => {
    setApproved(true);
    setStep(3);
  };

  const handleDeny = () => {
    setApproved(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('guardian-management')}
            className="p-2 hover:bg-white/10 rounded-full mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Guardian Request</h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-200" />
            <div>
              <h3 className="text-lg">Recovery Help Needed</h3>
              <p className="text-orange-200 text-sm">Someone is asking for your help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {step === 1 && (
          <>
            {/* Alert Banner */}
            <Card className="p-4 mb-6 bg-red-50 border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-900 text-sm mb-1">Important Security Alert</p>
                  <p className="text-red-700 text-xs leading-relaxed">
                    Only approve this request if you're certain this person is who they claim to be. 
                    When in doubt, contact them directly before approving.
                  </p>
                </div>
              </div>
            </Card>

            {/* Request Details */}
            <Card className="p-6 mb-6">
              <h3 className="mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Recovery Request Details
              </h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{requestDetails.avatar}</span>
                </div>
                <div>
                  <h4 className="text-lg">{requestDetails.requester}</h4>
                  <p className="text-gray-600 text-sm">{requestDetails.email}</p>
                  <Badge variant="outline" className="mt-1">
                    Wallet Owner
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Request time:</span>
                  <span>{requestDetails.requestTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span>{requestDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Device:</span>
                  <span>{requestDetails.device}</span>
                </div>
              </div>
            </Card>

            {/* What This Means */}
            <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
              <h3 className="mb-3 text-blue-900">What this means</h3>
              <p className="text-blue-700 text-sm leading-relaxed mb-3">
                {requestDetails.requester} has lost access to their SafeWallet and needs your help to recover it. 
                As their guardian, you can help verify their identity.
              </p>
              <div className="space-y-2 text-xs text-blue-600">
                <div>✓ You cannot access their funds</div>
                <div>✓ You're only helping them regain access</div>
                <div>✓ 3 guardians must approve for recovery</div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12"
              >
                <Shield className="w-5 h-5 mr-2" />
                Help Verify Identity
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
                onClick={handleDeny}
              >
                <X className="w-5 h-5 mr-2" />
                This doesn't seem right
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Security Questions */}
            <Card className="p-6 mb-6">
              <h3 className="mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Security Verification
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Please answer these questions to help verify {requestDetails.requester}'s identity. 
                Only answer if you're confident in your responses.
              </p>
              
              <div className="space-y-6">
                {securityQuestions.map((q, index) => (
                  <div key={q.id}>
                    <label className="block text-sm mb-2">
                      Question {index + 1}: {q.question}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">{q.hint}</p>
                    <Input
                      type="text"
                      placeholder="Your answer..."
                      value={securityAnswers[q.id as keyof typeof securityAnswers]}
                      onChange={(e) => handleSecurityAnswer(q.id, e.target.value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Confidence Check */}
            <Card className="p-4 mb-6 bg-green-50 border-green-200">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-900 text-sm mb-1">Ready to approve?</p>
                <p className="text-green-700 text-xs">
                  Only approve if you're confident this is really {requestDetails.requester}
                </p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleApprove}
                disabled={!securityAnswers.question1 || !securityAnswers.question2 || !securityAnswers.question3}
                className="w-full bg-green-600 hover:bg-green-700 h-12"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Approve Recovery Request
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back to Review
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
                onClick={handleDeny}
              >
                <X className="w-5 h-5 mr-2" />
                Deny Request
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* Confirmation */}
            <Card className={`p-8 mb-6 text-center ${
              approved 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                approved 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                {approved ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <X className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h2 className={`text-xl mb-3 ${
                approved ? 'text-green-900' : 'text-red-900'
              }`}>
                {approved ? 'Request Approved!' : 'Request Denied'}
              </h2>
              <p className={`text-sm leading-relaxed ${
                approved ? 'text-green-700' : 'text-red-700'
              }`}>
                {approved 
                  ? `You've successfully approved ${requestDetails.requester}'s recovery request. They'll be notified of your approval.`
                  : `You've denied the recovery request. ${requestDetails.requester} will be notified and may try to contact you directly.`
                }
              </p>
            </Card>

            {/* Next Steps */}
            <Card className="p-6 mb-6">
              <h3 className="mb-3">What happens next?</h3>
              <div className="space-y-3 text-sm">
                {approved ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <p>Your approval has been recorded securely</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <p>2 more guardians need to approve for recovery</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <p>{requestDetails.requester} will regain access once approved</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <p>Your denial has been recorded</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <p>{requestDetails.requester} may contact you directly</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <p>They can still recover with other guardians</p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Action Button */}
            <Button 
              onClick={() => onNavigate('guardian-management')}
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            >
              Done
            </Button>
          </>
        )}

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Questions about being a guardian? Contact SafeWallet support
          </p>
        </div>
      </div>
    </div>
  );
}