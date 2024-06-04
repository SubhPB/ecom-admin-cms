// Byimaan

import React from 'react';
import DashboardComp from './dashboard';
import { LayoutParamsPropTS } from '@/types/components/components';

function AdminMainPage({params: {storeId}}: LayoutParamsPropTS) {

  return (
    <DashboardComp storeId={storeId || null}/>
  )
};

export default AdminMainPage