// Byimaan
// left at: 2:10:27

import React from 'react';
import { UserButton } from '@clerk/nextjs';
import MainNavbar from './MainNavbar';
import StoreSwitcher from '@/components/store/store-switcher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

async function DashNavbar() {

  const {userId} = auth();

  if (!userId) redirect('/sign-in');

  const stores = await prismadb.store.findMany(
    {
      where: {
        userId: userId
      }
    }
  );

  return (
    <div className="dash-navbar border-b">
        <div className="flex h-16 items-center px-4">

          <StoreSwitcher className='' items={stores}/>
          <MainNavbar className={''} />
          
        <div className="ml-auto flex-items-center space-x-4">
          <UserButton afterSignOutUrl='/'/>
        </div>
        
        </div>
    </div>
  )
}

export default DashNavbar