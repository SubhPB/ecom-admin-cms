// Byimaan

'use client';

import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus, Check, Ban } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-separator';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import RouteAction, {OnDeleteArgsTS} from '../routes/route-page/RouteAction';


import { ComponentCarryingPropDataTS } from '@/types/components/components';
import { ProductsColumnTS } from '@/types/objects/objs';
import { ColumnDef } from '@tanstack/react-table';

import ApiList from '@/components/ui/api-list';
import { copyToClipboard } from '@/utils/functions/func';


function ProductCellAction({data}: ComponentCarryingPropDataTS<ProductsColumnTS>) {

    const router = useRouter();
    const {storeId} = useParams();

    const onCopy = () => {
        copyToClipboard(data.id);
        toast.success("Product Id copied to the clipboard.")
    };
    
      const onUpdate = () => {
        router.push(`/${storeId}/products/${data.id}`)
    };
    
    const onDelete = async({setOpen, setLoading}: OnDeleteArgsTS) => {
        try{
            setLoading(true);
            await axios.delete(`/api/${storeId}/products/${data.id}`);
            router.refresh();
            router.push(`/${storeId}/products/`);
            toast.success('Product deleted!');
        } catch (err){
            toast.error("Deletion Failed! Something went wrong.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return <RouteAction onCopy={onCopy} onDelete={onDelete} onUpdate={onUpdate}/>
};

const ColorBox = ({color}: {color: string}) => {
    color = color.toLowerCase();
    return <div className="flex items-center gap-x-2">
        {color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: color}}></div>
    </div>
}

const columns: ColumnDef<ProductsColumnTS>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
        accessorKey: "isArchieved",
        header: "Archieved",
        cell: ({row}) => row.original.isArchieved ? <Check className='h-4 w-4'/> : <Ban  className='h-4 w-4' />
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
        cell: ({row}) => row.original.isFeatured ? <Check className='h-4 w-4'/> : <Ban className='h-4 w-4' />
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "sizeName",
        header: "Size",
        cell: ({row}) => row.original.sizeName
    },
    {
        accessorKey: "categoryName",
        header: "Category",
    },
    {
        accessorKey: "colorName",
        header: "Color",
        cell: ({row}) => <ColorBox color={row.original.colorName}/>
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      id: 'actions',
      header: "Actions",
      cell: ({row}) => <ProductCellAction data={row.original}/>
    }
];

export default function ProductClient({data}: ComponentCarryingPropDataTS<ProductsColumnTS[]>) {

    const router = useRouter();
    const {storeId} = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Products (${data.length})`}
                    description='Manage products for your store'
                />
                <Button onClick={() => router.push(`/${storeId}/products/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey='name'/>

            <Heading title='API' description={'API calls for Products.'} />

            <Separator className='h-[.5px] bg-zinc-600'/>

            <ApiList entityIdName='productId' entityName='products'/>
        </>
    );
}