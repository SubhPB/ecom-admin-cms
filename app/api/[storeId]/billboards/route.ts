// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { p } from "@/utils/functions/func";

export async function GET(req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        const billboards = await prismadb.billboard.findMany(
            {
                where: {
                    storeId: storeId,
                }
            }
        );

        return NextResponse.json(billboards);
        
    } catch (error) {
        p('[BILLBOARDS_GET]', error);
        return new NextResponse('Internal error', {status: 500})
    }
}