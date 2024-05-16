// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { p } from "@/utils/functions/func";

// get all the categories to specific storeId
async function GET(req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

            const {userId} = auth();
            if (!userId) return new NextResponse("Unauthenticated", {status: 401});
    
            const categories = await prismadb.category.findMany(
                {
                    where: {
                        storeId: storeId,
                    }
                }
            );
    
            return NextResponse.json(categories);
         

    } catch (error) {
        p('[CATEGORIES_GET]', error);
        return new NextResponse('Internal error', {status: 500})
   
    }
};