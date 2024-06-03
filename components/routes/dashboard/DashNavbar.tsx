// Byimaan
// left at: 2:10:27

import React from 'react';
import { UserButton } from '@clerk/nextjs';
import StoreSwitcher from '@/components/store/store-switcher';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { MenuIcon } from '@/app/(dashboard)/[storeId]/(routes)/menu/page';
import FixHydration from '@/components/utils/FixHydration';
import { ModeToggle } from './toggle-btn';

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
          
        <div className="ml-auto flex justify-center items-center space-x-4">
          <UserButton afterSignOutUrl='/'/>
          <ModeToggle />
          <FixHydration>
            <MenuIcon />
          </FixHydration>
        </div>
        
        </div>
    </div>
  )
}

export default DashNavbar