// Byimaan

import prismadb from '@/lib/prismadb';
import {p} from '@/utils/functions/func'
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


// api end-point to create a store
export async function POST(req: Request){

    try{
        // let's check the user who wants to create store.
        const {userId} = auth();
        const body = await req.json();
        const {name} = body;

        if (!userId) return new NextResponse("Unauthorized", {status: 401});
        if (!name) return new NextResponse("Name is required", {status: 400});

        const store = await prismadb.store.create(
            {
                data: {
                    name: name,
                    userId: userId
                }
            }
        );

        return NextResponse.json(store);
    } catch (error) {
        p(`Error raised at 'api/stores'`, error);
        return new NextResponse("Internal Error", { status: 500 })
    }
};
