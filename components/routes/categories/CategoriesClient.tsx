// Byimaan

'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-separator';


import { ComponentCarryingPropDataTS } from '@/types/components/components';
import {  CatgoriesColumnTS } from '@/types/objects/objs';

import ApiList from '@/components/ui/api-list';
import { ColumnDef } from '@tanstack/react-table';
import RouteAction from '../route-page/RouteAction';
import { copyToClipboard } from '@/utils/functions/func';
import { OnDeleteArgsTS } from '../route-page/RouteAction';


function CategoryAction({data}: ComponentCarryingPropDataTS<CatgoriesColumnTS>){
    
    const router = useRouter();
    const {storeId} = useParams();
    
    const onCopy = ( ) => {
        copyToClipboard(data.id);
        toast.success("Category ID copied to the clipboard.")
    };
    
    const onUpdate = () => {
        router.push(`/${storeId}/categories/${data.id}`)
    };
    
    const onDelete = async({setOpen, setLoading}: OnDeleteArgsTS) => {
        try {
            setLoading(true);
            await axios.delete(`/api/${storeId}/categories/${data.id}`);
            router.refresh();
            router.push(`/${storeId}/categories/`);
            toast.success('Category deleted!');
        } catch (err){
            toast.error("Make sure you removed all categories subjective to this billboard before deletion.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return <RouteAction onCopy={onCopy} onDelete={onDelete} onUpdate={onUpdate}/>
}

const columns: ColumnDef<CatgoriesColumnTS>[] = [
    {
        accessorKey: "name",
        header: 'Name'
    },
    {
        accessorKey: "billboard",
        header: 'Billboard',
        cell: ({row}) => row.original.billboardLabel
    },
    {
        accessorKey: "createdAt",
        header: 'Date'
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({row}) => <CategoryAction data={row.original}/>
    }
];

function CategoriesClient({data}: ComponentCarryingPropDataTS<CatgoriesColumnTS[]>) {

    const router = useRouter();
    const {storeId} = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Categories (${data.length})`}
                    description='Manage categories for your store'
                />
                <Button onClick={() => router.push(`/${storeId}/categories/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey='name'/>

            <Heading title='API' description={'API calls for Categories.'} />

            <Separator className='h-[.5px] bg-zinc-600'/>

            <ApiList entityIdName='categoryId' entityName='categories'/>
        </>
    );
};

export default CategoriesClient;