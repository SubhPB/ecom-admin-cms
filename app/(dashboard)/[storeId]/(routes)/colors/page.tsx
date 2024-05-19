// Byimaan

import React from "react";
import {format} from 'date-fns';

import prismadb from "@/lib/prismadb";
import FixHydration from "@/components/utils/FixHydration";

import { LayoutParamsPropTS } from "@/types/components/components";
import { SizesOrColorsColumnTS } from "@/types/objects/objs";
import SizesOrColorsClient from "@/components/routes/sizes-or-colors/SizesOrColorsClient";

export default async function ColorsPage({params: {storeId}}: LayoutParamsPropTS){

    const colors = await prismadb.color.findMany(
        {
            where: {
                storeId: storeId
            }, include : {
                store: true
            }, orderBy: {
                createdAt: 'desc'
            }
        }
    );


    const formattedSizes: SizesOrColorsColumnTS[] = colors.map(
        color => {
            return {
                id: color.id,
                name: color.name,
                storeId: color.store.id,
                value: color.value,
                createdAt: format(color.createdAt, "MMMM do, yyyy"),
                storeName: color.store.name
            }
        }
    );

    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <FixHydration>
            <SizesOrColorsClient endpointName="colors" data={formattedSizes}/>
          </FixHydration>
        </div>
      </div>
    )
}