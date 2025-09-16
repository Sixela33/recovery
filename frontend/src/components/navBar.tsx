"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { getKit } from './kit';
import { ShieldIcon } from 'lucide-react';

export default function navBar() {
    useEffect(() => {
        getKit().createButton({
          container: document.querySelector('#containerDiv') as HTMLElement,
          onConnect: () => {},
          onDisconnect: () => {}
        })
    }, [])

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center shadow-sm">
                <ShieldIcon className="w-5 h-5 text-white" />
              </div>
              <span className="app-title text-white text-xl">Guardians</span>
            </Link>
          </div>

          <div id="containerDiv" />
        </div>
      </div>
    </nav>
  )
}
