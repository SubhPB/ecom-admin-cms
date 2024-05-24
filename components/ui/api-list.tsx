// Byimaan

'use client';

import React from 'react';
// 5:11:33

import { useOrigin } from '@/utils/hooks/use-origin';
import { ApiListPropTS } from '@/types/components/components';
import { useParams } from 'next/navigation';
import ApiAlert from './api-alert';


function ApiList({entityIdName, entityName}: ApiListPropTS) {

    const origin = useOrigin();
    const {storeId} = useParams();

    const baseUrl = `${origin}/api/${storeId}`;
    return (
        <>
        <ApiAlert title={"GET"} description={`${baseUrl}/${entityName}`} variant='public'/>
        <ApiAlert title={"GET"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='public'/>
        <ApiAlert title={"POST"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='admin'/>
        <ApiAlert title={"PATCH"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='admin'/>
        <ApiAlert title={"DELETE"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant='admin'/>
        </>
    )
};

interface CustomApiListTS extends ApiListPropTS{
    title: string,
    variant: 'public' | 'admin',
}

export function CustomApiDisplayer({entityIdName, entityName, title, variant}: CustomApiListTS ){

    const origin = useOrigin();
    const {storeId} = useParams();
    
    const baseUrl = `${origin}/api/${storeId}`;
    const tailUrl = entityIdName.trim().length === 0 ? '' : `/${entityIdName}`
    return (
        <ApiAlert title={title} description={`${baseUrl}/${entityName}`+tailUrl} variant={variant} />
    )
};

export default ApiList