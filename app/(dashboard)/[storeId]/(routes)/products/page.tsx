// Byimaan

import React from 'react'
import {format} from 'date-fns';

import FixHydration from '@/components/utils/FixHydration'
import prismadb from '@/lib/prismadb'

import { LayoutParamsPropTS } from '@/types/components/components'
import { ProductsColumnTS } from '@/types/objects/objs'

import { formatter } from '@/utils/functions/func';
import ProductClient from '@/components/products/ProductClient';

export default async function ProductsPage({params: {storeId}}: LayoutParamsPropTS) {

  const products = await prismadb.product.findMany(
    {
      where: {
        storeId,
      }, 
      include: {
        category: true,
        size: true,
        color: true,
        store: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  );

  const formattedProducts: ProductsColumnTS[] = products.map(
    (product) => {
        
      return {
        id: product.id,
        name: product.name,
        price: formatter.format(product.price.toNumber()),
        isFeatured: product.isFeatured,
        isArchieved: product.isArchieved,
        categoryId: product.category.id,
        categoryName: product.category.name,
        sizeId: product.size.id,
        sizeName: product.size.name,
        colorId: product.color.id,
        colorName: product.color.name,
        storeId: product.storeId,
        storeName: product.store.name,
        createdAt: format(product.createdAt, "MMMM do, yyyy")
      }
    }
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FixHydration>
          <ProductClient data={formattedProducts}/>
        </FixHydration>
      </div>
    </div>
  )
}
