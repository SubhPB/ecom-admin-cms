// Byimaan

import React from 'react';
import { LayoutPropTS } from '@/types/components/components';

function AuthLayout({children}: LayoutPropTS) {
  return (
    <div className="auth-layout h-full grid place-items-center">
        {children}
    </div>
  )
}

export default AuthLayout;