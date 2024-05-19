// Byimaan

import React from 'react'
import prismadb from '@/lib/prismadb'

import { SizeOrColorForm } from '@/components/routes/sizes-or-colors/SizesOrColorsForm';
import { LayoutParamsPropTS } from '@/types/components/components'

async function SizeIdPage({params: { colorId}}: LayoutParamsPropTS) {

  const color = await prismadb.color.findUnique(
    {
      where: {
        id: colorId
      }
    }
  );

 
  
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeOrColorForm endpointName='colors' initialData={color}/>
        </div>
    </div>
  )
}

export default SizeIdPage