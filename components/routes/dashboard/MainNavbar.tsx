// Byimaan
"use client";

import { cn } from '@/lib/utils'
import { EsssentialPropsTS } from '@/types/components/components'
import React from 'react';
import { useParams, usePathname, } from 'next/navigation';
import Link from 'next/link';
import { DashboardStoreRouteTS } from '@/types/objects/objs';

function MainNavbar({className}: EsssentialPropsTS) {

  const pathname = usePathname();
  const params = useParams();

  const routes: DashboardStoreRouteTS[] = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    }
  ];

  return (
    <nav className={cn('flex items-center pl-2 space-x-4 lg:space-x-6', className)}>
      {
        routes.map( (route, index) => (

          <Link 
            key={index} 
            href={route.href} 
            className={
              cn(
                'text-sm font-medium transition-colors hover:text-primary ',
                route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )
            }
          >
            {route.label} 
          </Link>
        ))
      }
    </nav>
  )
}

export default MainNavbar