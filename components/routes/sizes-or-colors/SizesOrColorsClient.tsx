// Byimaan

'use client';

import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import { capitalize, copyToClipboard, singularize } from "@/utils/functions/func";
import RouteAction from "../route-page/RouteAction";

import { OnDeleteArgsTS } from "../route-page/RouteAction";
import { SizesOrColorsColumnTS } from "@/types/objects/objs";
import { ColumnDef } from "@tanstack/react-table";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";


interface SizesOrColorsTS<T=SizesOrColorsColumnTS> {
    endpointName: string;
    data : T
};

function SizesOrColorsAction({endpointName, data}: SizesOrColorsTS){
    endpointName = endpointName.toLowerCase();
    const router = useRouter();
    const {storeId} = useParams();

    const onCopy = () => {
        copyToClipboard(data.id);
        toast.success(`${singularize(capitalize(endpointName))} ID copied to the clipboard`);
    };

    const onUpdate = () => {
        router.push(`/${storeId}/${endpointName}/${data.id}`);
    };
    const onDelete = async({setOpen, setLoading}: OnDeleteArgsTS) => {
        try {
            setLoading(true);
            await axios.delete(`/api/${storeId}/${endpointName}/${data.id}`);
            router.refresh();
            router.push(`/${storeId}/${endpointName}/`);
            toast.success(`${singularize(capitalize(endpointName))} got deleted.`);
        } catch (err){
            toast.error("Deletion Failed! something went wrong.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return <RouteAction onDelete={onDelete} onUpdate={onUpdate} onCopy={onCopy}/>
};

const columns = (endpointName: string): ColumnDef<SizesOrColorsColumnTS>[] => [
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
        cell: ({row}) => <SizesOrColorsAction endpointName={endpointName} data={row.original}/>
    },
];

function SizesOrColorsClient({endpointName, data}: SizesOrColorsTS<SizesOrColorsColumnTS[]> ){
    
    endpointName = endpointName.toLowerCase();
    const router = useRouter();
    const {storeId} = useParams();
    
    const justCaptializeEndpoint = capitalize(endpointName);
    const justSingularizeEndpoint = singularize(endpointName)

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`${justCaptializeEndpoint} (${data.length})`}
                description={`Manage ${endpointName} for your store`}
            />
            <Button onClick={() => router.push(`/${storeId}/${endpointName}/new`)}>
                <Plus className='mr-2 h-4 w-4'/>
                Add New
            </Button>
        </div>

        <Separator />

        <DataTable columns={columns(endpointName)} data={data} searchKey='name'/>

        <Heading title='API' description={`API calls for ${endpointName}.`} />

        <Separator className='h-[.5px] bg-zinc-600'/>

        <ApiList entityIdName={`${justSingularizeEndpoint}Id`} entityName={`${endpointName}`}/>
    </>
    )
}


export default SizesOrColorsClient;