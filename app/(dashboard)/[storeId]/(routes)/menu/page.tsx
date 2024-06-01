// Byimaan
'use client';

import React from 'react';
import Link from 'next/link';

import { Menu, X } from 'lucide-react';

import { DashboardStoreRouteTS } from '@/types/objects/objs';

import { useParams,  usePathname,  useSearchParams } from 'next/navigation';

function MenuPage() {

    const params = useParams();
    const prevUrl = useSearchParams().get('prev_url') || '';

    const routes: DashboardStoreRouteTS[] = [
        {
          href: `/${params.storeId}`,
          label: 'Overview',
          active: prevUrl === `/${params.storeId}`
        },
        {
          href: `/${params.storeId}/billboards`,
          label: 'Billboards',
          active: prevUrl === `/${params.storeId}/billboards`
        },
        {
          href: `/${params.storeId}/products`,
          label: 'Products',
          active: prevUrl === `/${params.storeId}/products`
        },
        {
          href: `/${params.storeId}/categories`,
          label: 'Categories',
          active: prevUrl === `/${params.storeId}/categories`
        },
        {
          href: `/${params.storeId}/sizes`,
          label: 'Sizes',
          active: prevUrl === `/${params.storeId}/sizes`
        },
        {
          href: `/${params.storeId}/colors`,
          label: 'Colors',
          active: prevUrl === `/${params.storeId}/colors`
        },
        {
          href: `/${params.storeId}/orders`,  
          label: 'Orders',
          active: prevUrl === `/${params.storeId}/orders`
        },
        {
          href: `/${params.storeId}/settings`,
          label: 'Settings',
          active: prevUrl === `/${params.storeId}/settings`
        }
      ];

    return (
    <div className="w-full px-5 py-8 h-[100dvh] overflow-y-scroll hide-scrollbar absolute top-0 left-0 z-20 bg-white">

        <div className="menu-header w-full flex justify-center gap-4 text-2xl font-bold relative border-b-[1px] border-black pb-4">
            <Link href={'/'} className="store-logo font-bold text-black text-center text-lg text-wrap flex gap-2">
                Store
            </Link>
            <Link className='absolute z-20 top-0 right-0' href={prevUrl}><X/></Link>
        </div>
        <div className='flex flex-col w-full mt-4 gap-4'>
            {
                routes.map(
                    (route) => <NavbarLink key={route.href} {...route}/>
                )
            }
        </div>
    </div>
    )
};

function NavbarLink({href, label, active}: DashboardStoreRouteTS){


    return (
        <Link 
            href={href}
            className={`text-lg font-semibold text-center flex items-center gap-2 ${ active ? 'text-black' :'text-gray-500'}`}
        >
            {label}
        </Link>
    )
};


export const MenuIcon = () => {
    const prevUrl = usePathname();
    const {storeId} = useParams();

    return (
        <Link href={`/${storeId}/menu?prev_url=${prevUrl || '/'}`} > <Menu className='h-5 w-5 text-bold cursor-pointer'/> </Link>
    )
}

export default MenuPage