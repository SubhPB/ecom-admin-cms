// Byimaan

'use client';

import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import { copyToClipboard } from "@/utils/functions/func";
import RouteAction from "../route-page/RouteAction";

import { OnDeleteArgsTS } from "../route-page/RouteAction";
import { ComponentCarryingPropDataTS } from "@/types/components/components";
import { SizesColumnTS } from "@/types/objects/objs";
import { ColumnDef } from "@tanstack/react-table";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

function SizeAction({data}: ComponentCarryingPropDataTS<SizesColumnTS>){

    const router = useRouter();
    const {storeId} = useParams();

    const onCopy = () => {
        copyToClipboard(data.id);
        toast.success("Size ID copied to the clipboard");
    };

    const onUpdate = () => {
        router.push(`/${storeId}/sizes/${data.id}`);
    };
    const onDelete = async({setOpen, setLoading}: OnDeleteArgsTS) => {
        try {
            setLoading(true);
            await axios.delete(`/api/${storeId}/sizes/${data.id}`);
            router.refresh();
            router.push(`/${storeId}/sizes/`);
            toast.success('Size deleted!');
        } catch (err){
            toast.error("Deletion Failed! something went wrong.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return <RouteAction onCopy={onCopy} onUpdate={onUpdate} onDelete={onDelete}/>
};


const columns: ColumnDef<SizesColumnTS>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: "value",
        header: 'Value',
    },
    {
        accessorKey: "store",
        header: 'Store',
        cell: ({row}) => row.original.storeName
    },
    {
        accessorKey: "createdAt",
        header: 'Date',
    },
    {
        accessorKey: "actions",
        header: 'Actions',
        cell: ({row}) => <SizeAction data={row.original}/>
    },
];

function SizesClient({data}: ComponentCarryingPropDataTS<SizesColumnTS[]>){
    const router = useRouter();
    const {storeId} = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Sizes (${data.length})`}
                description='Manage sizes for your store'
            />
            <Button onClick={() => router.push(`/${storeId}/sizes/new`)}>
                <Plus className='mr-2 h-4 w-4'/>
                Add New
            </Button>
        </div>

        <Separator />

        <DataTable columns={columns} data={data} searchKey='name'/>

        <Heading title='API' description={'API calls for sizes.'} />

        <Separator className='h-[.5px] bg-zinc-600'/>

        <ApiList entityIdName='sizeId' entityName='sizes'/>
    </>
    )
};

export default SizesClient;