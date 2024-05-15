// Byimaan

import React from 'react'
import {format} from 'date-fns';

import BillboardClient from '@/components/routes/billboards/BillboardClient'
import FixHydration from '@/components/utils/FixHydration'
import prismadb from '@/lib/prismadb'

import { LayoutParamsPropTS } from '@/types/components/components'
import { BillboardColumnTS } from '@/types/objects/objs'

export default async function BillboardsPage({params: {storeId}}: LayoutParamsPropTS) {

  const billboards = await prismadb.billboard.findMany(
    {
      where: {
        storeId,
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    }
  );

  const formattedBillboards: BillboardColumnTS[] = billboards.map(
    (billboard) => {
      return {
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMMM do, yyyy")
      }
    }
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FixHydration>
          <BillboardClient data={formattedBillboards}/>
        </FixHydration>
      </div>
    </div>
  )
}
