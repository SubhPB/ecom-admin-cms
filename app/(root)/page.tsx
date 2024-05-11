// Byimaan

"use client";

import React from 'react';
import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import { UIModal } from '@/components/ui/modal';

// Setup page...
function RootAppPage() {
  return (
    <div className='app-page p-4 h-full'>
        <UIModal 
          title='Test'
          description='Test Desc'
          isOpen 
          onClose={()=>{}}
        > 
          <p>Chidren paragraph</p>
        </UIModal>
    </div>
  )
}

export default RootAppPage;