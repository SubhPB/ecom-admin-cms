// Byimaan

import React from 'react';
import { DataBox } from '@/components/routes/dashboard/dashboard-utils';

function DashboardPage() {
  return (
    <div className="dashboard w-full my-2 text-black py-3 px-5">

      <div className="page-title">
        <h2 className='font-bold text-2xl'> Dashboard </h2>
        <h4 className='text-xs font-light'>Overview of your store.</h4>
      </div>
      
      <div className="dashboard-data-holder w-full my-2">
        
        <div className="data-boxes w-full ">
          <DataBox  title='Total Revenue' data='$39.02'/>
        </div>

      </div>

    </div>
  )
}

export default DashboardPage