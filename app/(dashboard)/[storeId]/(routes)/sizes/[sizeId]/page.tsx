// Byimaan

import React from 'react'
import prismadb from '@/lib/prismadb'

import { SizeOrColorForm } from '@/components/routes/sizes-or-colors/SizesOrColorsForm';
import { LayoutParamsPropTS } from '@/types/components/components'

async function SizeIdPage({params: { sizeId}}: LayoutParamsPropTS) {

  const size = await prismadb.size.findUnique(
    {
      where: {
        id: sizeId
      }
    }
  );

 
  
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeOrColorForm endpointName='sizes' initialData={size}/>
        </div>
    </div>
  )
}

export default SizeIdPage