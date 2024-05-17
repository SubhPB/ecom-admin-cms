// Byimaan

'use client';

import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-separator';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import RouteAction, { OnDeleteArgsTS } from '../route-page/RouteAction';


import { ComponentCarryingPropDataTS } from '@/types/components/components';
import { BillboardColumnTS } from '@/types/objects/objs';
import { ColumnDef } from '@tanstack/react-table';

import ApiList from '@/components/ui/api-list';
import { copyToClipboard } from '@/utils/functions/func';


function BillboardCellAction({data}: ComponentCarryingPropDataTS<BillboardColumnTS>){

    const router = useRouter();
    const {storeId} = useParams();

    const onCopy = () => {
        copyToClipboard(data.id);
        toast.success("Billboard Id copied to the clipboard.")
    };
    
      const onUpdate = () => {
        router.push(`/${storeId}/billboards/${data.id}`)
    };
    
    const onDelete = async({setOpen, setLoading}: OnDeleteArgsTS) => {
        try{
            setLoading(true);
            await axios.delete(`/api/${storeId}/billboards/${data.id}`);
            router.refresh();
            router.push(`/${storeId}/billboards/`);
            toast.success('Billboard deleted!');
        } catch (err){
            toast.error("Make sure you removed all categories subjective to this billboard before deletion.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return <RouteAction onCopy={onCopy} onDelete={onDelete} onUpdate={onUpdate}/>
};

const columns: ColumnDef<BillboardColumnTS>[] = [
    {
      accessorKey: "label",
      header: "Label",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      id: 'actions',
      header: "Actions",
      cell: ({row}) => <BillboardCellAction data={row.original}/>
    }
]

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