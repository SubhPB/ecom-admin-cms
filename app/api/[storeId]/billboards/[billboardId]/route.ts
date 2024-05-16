// Byimaan

import prismadb from "@/lib/prismadb";
import { ParamsArgsTS } from "@/types/objects/objs";
import { p } from "@/utils/functions/func";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST( req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});
        
        const {label, imageUrl} = await req.json();
        if (!label) return new NextResponse("Label is required", {status: 400});

        if (!imageUrl) return new NextResponse("Image url is required", {status: 400});

        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: storeId,
                    userId: userId,
                }
            }
        );

        if (!storeByUserId) return new NextResponse("Unauthorized", {status: 403});

        const billboard = await prismadb.billboard.create(
            {
                data: {
                    label: label,
                    imageUrl: imageUrl,
                    storeId: storeId
                }
            }
        )

        return NextResponse.json(billboard);

    } catch (err){
        p('[BILLBOARD_POST]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};

export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const {params: {storeId, billboardId}} = paramsArgs;

    try {

        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        const billboard = await prismadb.billboard.findUnique(
            {
                where: {
                    id: billboardId
                }
            }
        );

        return NextResponse.json(billboard);

    } catch (err) {
        p('[BILLBOARD_GET]', err)
        return new NextResponse('Internal error', {status: 500})

    }
};

export async function PATCH( req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId, billboardId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        if (!billboardId) return new NextResponse("Billboard Id is required", {status: 400})
        
        const {label, imageUrl} = await req.json();
        // if (!label) return new NextResponse("Name is required", {status: 400});

        
        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: storeId,
                    userId: userId,
                }
            }
        );

        if (!storeByUserId) return new NextResponse("Unauthorized", {status: 403});

        const billboard = await prismadb.billboard.updateMany(
            {
                where: {
                    id: billboardId,
                },
                data: {
                    label, 
                    imageUrl
                }
            }
        );

        return NextResponse.json(billboard)

    } catch (err){
        p('[BILLBOARD_PATCH]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};

export async function DELETE( req: Request, paramsArgs: ParamsArgsTS){
    const {params: {storeId, billboardId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        
        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: storeId,
                    userId: userId,
                }
            }
        );

        if (!storeByUserId) return new NextResponse("Unauthorized", {status: 403});

        const billboard = await prismadb.billboard.deleteMany(
            {
                where: {
                    id: billboardId
                }
            }
        );

        return NextResponse.json(billboard)

    } catch (err){
        p('[BILLBOARD_DELETE]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};

