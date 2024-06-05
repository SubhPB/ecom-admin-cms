// Byimaan

import React from 'react';

import { Dashboard } from '@/components/utils/dashboard';

import { DataBox } from '@/components/routes/dashboard/dashboard-utils';
import { Overview } from '@/components/utils/overview-chart';


async function DashboardComp({storeId}: {storeId: string | null}) {


  if (!storeId){
    return <DashboardSkeleton />
  }
    
  const dashboard = new Dashboard(storeId);
  const dashboardData = await dashboard.initialize();

  return (
    <div className="dashboard w-full my-2 py-3 px-5">

      <div className="page-title pb-2 border-b-[1px]">
        <h2 className='font-bold text-2xl'> Dashboard </h2>
        <h4 className='text-xs font-light'>Overview of your store.</h4>
      </div>

      <div className="dashboard-data-holder w-full my-4">
        
        <div className="data-boxes w-full flex flex-wrap gap-2">
          <DataBox  title='Total Revenue' data={`$${dashboardData.totalRevenue}`}/>
          <DataBox title='Total Sales' data={`${dashboardData.totalSales}`}/>
        </div>

        <h2 className='pb-2 my-6 font-semibold text-xl border-b-[1px] border-black'>Overview</h2>

        <div className="graph my-4 rounded-lg py-6 lg:py-12">
          <Overview data={dashboardData.graphData}/>
        </div>


      </div>


    </div>
  )
};

function DashboardSkeleton(){

    return (
        <div className="dashboard w-full my-2 text-black py-3 px-5">

        <div className="page-title pb-2 border-b-[1px] border-black">
          <h2 className='font-bold text-2xl'> Dashboard </h2>
          <h4 className='text-xs font-light'>Overview of your store.</h4>
        </div>
  
        <div className="dashboard-data-holder bg-gray-100 rounded-lg h-[45vh] w-full my-4">
        </div>
  
      </div>
    )
}

export default DashboardComp