// Byimaan

"use client";

import React, { useEffect } from 'react';

import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import { useStoreModal } from '@/utils/hooks/use-store-modal';
import { StoreModal } from '@/components/modals/store-modal';

// Setup page...
function RootAppPage() {

  const {isOpen, onClose, onOpen} = useStoreModal();

  useEffect(
    () => {
      if(!isOpen) onOpen();
    }, [isOpen, onOpen]
  )
  return (
    <div className='app-page p-4 h-full'>
      <StoreModal />
    </div>
  )
}

export default RootAppPage;