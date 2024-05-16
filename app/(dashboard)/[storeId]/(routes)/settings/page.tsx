// Byimaan

import { SettingsPagePropsTS } from '@/types/components/components';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import prismadb from '@/lib/prismadb';
import SettingsForm from '@/components/routes/settings/SettingsForm';
import ApiAlert from '@/components/ui/api-alert';

async function SettingsPage({params: {storeId}}: SettingsPagePropsTS) {

    const {userId} = auth();

    if (!userId) redirect('/sign-in');

    if (!storeId) redirect('/');

    const store = await prismadb.store.findFirst(
        {
            where: {
                id: storeId,
                userId: userId
            }
        }
    );
    
    return (
        <div className="flex flex-col p-4">
            <div className="flex-1">
                <SettingsForm initialData={store}/>
            </div>
            <ApiAlert
                title='NEXT_PUBLIC_API_URL'
                description={`/api/${storeId}`}
                variant='public'
            />
        </div>
    )
}

export default SettingsPage;