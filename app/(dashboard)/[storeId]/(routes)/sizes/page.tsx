// Byimaan
// Why not you!

import React from "react";
import {format} from 'date-fns';

import prismadb from "@/lib/prismadb";
import FixHydration from "@/components/utils/FixHydration";

import { LayoutParamsPropTS } from "@/types/components/components";
import { SizesColumnTS } from "@/types/objects/objs";
import SizesOrColorsClient from "@/components/routes/sizes-or-colors/SizesOrColorsClient";

export default async function SizesPage({params: {storeId}}: LayoutParamsPropTS){

    const sizes = await prismadb.size.findMany(
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


    const formattedSizes: SizesColumnTS[] = sizes.map(
        size => {
            return {
                id: size.id,
                name: size.name,
                storeId: size.store.id,
                value: size.value,
                createdAt: format(size.createdAt, "MMMM do, yyyy"),
                storeName: size.store.name
            }
        }
    );

    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <FixHydration>
            {/* <SizesClient data={formattedSizes}/> */}
            <SizesOrColorsClient endpointName="sizes" data={formattedSizes}/>
          </FixHydration>
        </div>
      </div>
    )
}