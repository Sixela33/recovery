"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { createButton } from './kit';
import { ShieldIcon } from 'lucide-react';

export default function navBar() {
    useEffect(() => {
        createButton()
    }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg"><ShieldIcon /></span>
              </div>
              <span className="font-bold text-xl">Guardians</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">

            <div onClick={() => {localStorage.removeItem('walletAddress'); window.location.reload();}}>|</div>
            <div id="containerDiv" />
          </div>
        </div>
      </div>
    </nav>
  )
}
