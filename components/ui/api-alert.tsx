// Byimaan
// 3:23:05 okay!

import React from 'react';
import { ApiAlertPropTS } from '@/types/components/components';

const textApp: Record<ApiAlertPropTS['variant'], string> = {
    public: "Public",
    admin: "Admin"
};

const variantName: Record<ApiAlertPropTS['variant'], string> = {
    public: 'secondary',
    admin: 'destructive',
}

function ApiAlert() {
  return (
    <div>ApiAlert</div>
  )
}

export default ApiAlert