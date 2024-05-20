// Byimaan

import React from 'react'
import prismadb from '@/lib/prismadb'

import { LayoutParamsPropTS } from '@/types/components/components'
import ProductForm from '@/components/products/ProductForm'; 

 
async function ProductIdPage({ params: {storeId, productId}}: LayoutParamsPropTS) {

  const product = await prismadb.product.findUnique(
    {
      where: {
        id: productId,
      }, include : {
        images: true
      }
    }
  );

  const sizes = await prismadb.size.findMany(
    {
      where: {
        storeId: storeId,
      }
    }
  );
  const colors = await prismadb.color.findMany(
    {
      where: {
        storeId: storeId
      }
    }
  );
  const categories = await prismadb.category.findMany(
    {
      where: {
        storeId: storeId,
      }
    }
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} options={{sizes, colors, categories}}/>
      </div>
    </div>
   )
 }
 
 export default ProductIdPage