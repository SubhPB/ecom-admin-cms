// byimaan

import prismadb from '@/lib/prismadb';
import React from 'react';
import { LayoutParamsPropTS } from '@/types/components/components';
import BillboardForm from '@/components/routes/billboards/BillboardForm';

async function BillBoardWithIdPage({params: {billboardId}}: LayoutParamsPropTS) {

    const billboard = await prismadb.billboard.findUnique(
        {
            where: {
                id: billboardId
            }
        }
    )

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard}/>
            </div>
        </div>
    );
}

export default BillBoardWithIdPage