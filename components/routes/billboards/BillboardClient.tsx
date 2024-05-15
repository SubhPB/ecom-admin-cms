// Byimaan

'use client';

import React from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-separator';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { ComponentCarryingPropDataTS } from '@/types/components/components';
import { BillboardColumnTS } from '@/types/objects/objs';

import {columns} from './Columns';
import ApiList from '@/components/ui/api-list';

function BillboardClient({data}: ComponentCarryingPropDataTS<BillboardColumnTS[]>) {

    const router = useRouter();
    const {storeId} = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Billboards (${data.length})`}
                    description='Manage billboards for your store'
                />
                <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey='label'/>

            <Heading title='API' description={'API calls for Billboards.'} />

            <Separator className='h-[.5px] bg-zinc-600'/>

            <ApiList entityIdName='billboardId' entityName='billboards'/>
        </>
    );
}

export default BillboardClient