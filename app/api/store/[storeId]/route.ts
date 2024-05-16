// Byimaan

import prismadb from "@/lib/prismadb";
import { ParamsArgsTS } from "@/types/objects/objs";
import { p } from "@/utils/functions/func";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
/* 
    Tasks:
        1. Patch to update the existing store
        2. to delete a store
*/

export async function PATCH( req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});
        
        const {name} = await req.json();
        if (!name) return new NextResponse("Name is required", {status: 400});

        const store = await prismadb.store.updateMany(
            {
                where: {
                    id: storeId,
                    userId: userId,
                },
                data: {
                    name: name
                }
            }
        );

        return NextResponse.json(store)

    } catch (err){
        p('[STORE_PATCH]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};


export async function DELETE( req: Request, paramsArgs: ParamsArgsTS){
    const {params: {storeId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        const store = await prismadb.store.deleteMany(
            {
                where: {
                    id: storeId,
                    userId: userId,
                }
            }
        );

        return NextResponse.json(store)

    } catch (err){
        p('[STORE_DELETE]', err);
        return new NextResponse("Internal error", {status: 500})
    }

}