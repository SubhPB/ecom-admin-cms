// Byimaan

'use client';

import React from 'react';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-separator';

import { Check, Ban } from 'lucide-react';
import { Plus } from 'lucide-react';

import { ComponentCarryingPropDataTS } from '@/types/components/components';
import { OrdersColumnTS } from '@/types/objects/objs';

import ApiList from '@/components/ui/api-list';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<OrdersColumnTS>[] = [
    {
        accessorKey: "products",
        header: 'Products'
    },
    {
        accessorKey: "phone",
        header: 'Phone'
    },
    {
        accessorKey: "address",
        header: 'Address'
    },
    {
        accessorKey: "totalPrice",
        header: 'Total Price'
    },
    {
        accessorKey: "isPaid",
        header: 'Paid',
        cell: ({row}) => row.original.isPaid ? <Check className='h-4 w-4'/> : <Ban  className='h-4 w-4' /> 
    },
]

function OrdersClient({data}: ComponentCarryingPropDataTS<OrdersColumnTS[]>) {
  
    const router = useRouter();
    const {storeId} = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Orders (${data.length})`}
                    description='Manage orders for your store'
                />
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey='name'/>

            <Heading title='API' description={'API calls for Orders.'} />

            <Separator className='h-[.5px] bg-zinc-600'/>

            <ApiList entityIdName='orderId' entityName='orders'/>
        </>
  )
}

export default OrdersClient