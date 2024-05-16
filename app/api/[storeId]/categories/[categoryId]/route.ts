// Byimaan

import prismadb from "@/lib/prismadb";
import { ParamsArgsTS } from "@/types/objects/objs";
import { p } from "@/utils/functions/func";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// to create a new category
export async function POST( req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});
        
        const {name, billboardId} = await req.json();
        if (!name) return new NextResponse("Category name is required", {status: 400});

        if (!billboardId) return new NextResponse("Billboard id is required", {status: 400});

        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: storeId,
                    userId: userId,
                }
            }
        );
        if (!storeByUserId) return new NextResponse("Unauthorized", {status: 403});

        const billboardByStoreId = await prismadb.billboard.findFirst(
            {
                where: {
                    id: billboardId,
                    storeId: storeId
                }
            }
        );
        if (!billboardByStoreId) return new NextResponse("Unauthorized", {status: 403})


        const category = await prismadb.category.create(
            {
                data: {
                    name: name,
                    billboardId: billboardId,
                    storeId: storeId, 
                }
            }
        )

        return NextResponse.json(category);

    } catch (err){
        p('[CATEGORY_POST]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};

// get specific category by categoryId 
export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const {params: {storeId, categoryId}} = paramsArgs;

    try {

        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        const category = await prismadb.category.findUnique(
            {
                where: {
                    id: categoryId,
                    storeId: storeId
                }
            }
        );

        return NextResponse.json(category);

    } catch (err) {
        p('[CATEGORY_GET]', err)
        return new NextResponse('Internal error', {status: 500})

    }
};

// update the specific category by categoryId
export async function PATCH( req: Request, paramsArgs: ParamsArgsTS){

    const {params: {storeId, categoryId}} = paramsArgs;

    try {
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        const {userId} = auth();
        if (!userId) return new NextResponse("Unauthenticated", {status: 401});

        const {name, billboardId} = await req.json();
        if (!billboardId) return new NextResponse("Billboard Id is required", {status: 400})
        
        
        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: storeId,
                    userId: userId,
                }
            }
        );

        if (!storeByUserId) return new NextResponse("Unauthorized", {status: 403});

        
        const billboardByStoreId = await prismadb.billboard.findFirst(
            {
                where: {
                    id: billboardId,
                    storeId: storeId
                }
            }
        );
        if (!billboardByStoreId) return new NextResponse("Unauthorized", {status: 403})

        const category = await prismadb.category.updateMany(
            {
                where: {
                    id: categoryId,
                },
                data: {
                    name
                }
            }
        );

        return NextResponse.json(category)

    } catch (err){
        p('[CATEGORY_PATCH]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};

// delete the category
export async function DELETE( req: Request, paramsArgs: ParamsArgsTS){
    const {params: {storeId, categoryId}} = paramsArgs;

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

        const category = await prismadb.category.deleteMany(
            {
                where: {
                    id: categoryId
                }
            }
        );

        return NextResponse.json(category)

    } catch (err){
        p('[CATEGORY_DELETE]', err);
        return new NextResponse("Internal error", {status: 500})
    }

};

