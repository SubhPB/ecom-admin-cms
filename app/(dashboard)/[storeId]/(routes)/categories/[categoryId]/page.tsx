// Byimaan

import React from 'react';
import { LayoutParamsPropTS } from '@/types/components/components';
import prismadb from '@/lib/prismadb';
import CategoryForm from '@/components/routes/categories/CategoryForm';

async function CategoryIdPage({params: {storeId, categoryId}}: LayoutParamsPropTS) {

  const category = await prismadb.category.findUnique(
    {
      where: {
        id: categoryId
      }
    }
  );
  const billboards = await prismadb.billboard.findMany(
    {
      where: {
        storeId: storeId
      }
    }
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards}/>
      </div>
    </div>
  )
}

export default CategoryIdPage;