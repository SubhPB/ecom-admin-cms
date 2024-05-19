// Byimaan

import React from 'react'
import {format} from 'date-fns';

import CategoriesClient from '@/components/routes/categories/CategoriesClient';
import FixHydration from '@/components/utils/FixHydration'
import prismadb from '@/lib/prismadb';

import { LayoutParamsPropTS } from '@/types/components/components'
import { CatgoriesColumnTS } from '@/types/objects/objs'

export default async function CategoriesPage({params: {storeId}}: LayoutParamsPropTS) {

  const categories = await prismadb.category.findMany(
    {
      where: {
        storeId: storeId
      },
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  );

  const formattedCategories: CatgoriesColumnTS[] = categories.map(
    (category) => {
      return {
        id: category.id,
        name: category.name,
        billboardId: category.billboard.id,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMMM do, yyyy")
      }
    }
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FixHydration>
          <CategoriesClient data={formattedCategories}/>
        </FixHydration>
      </div>
    </div>
  )
}
