"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { axiosClient } from '@/lib/axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function page() {

    const [inputedValue, setInputedValue] = useState('')
    
    const handleBeginRecovery = () => {
        if (!inputedValue) {
            toast.error('Please enter an email or wallet address')
            return
        }
        
        if (inputedValue) {
            console.log('Email:', inputedValue)
        }

        axiosClient.post('/recovery/begin-recovery', {
            key: inputedValue
        })
    }

  return (
    <div>
        <h1>Start your recovery process</h1>
        <p>Enter your email or wallet address to begin the recovery process</p>
        <Input  value={inputedValue} onChange={(e) => setInputedValue(e.target.value)} />
        <Button onClick={handleBeginRecovery}>Begin recovery</Button>
    </div>
  )
}
