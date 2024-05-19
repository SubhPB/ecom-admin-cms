// Byimaan

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { LayoutPropTS } from "@/types/components/components";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({children}:LayoutPropTS){
    
    const {userId}= auth();

    if (!userId) redirect('/sign-in');

    const store = await prismadb.store.findFirst(
        {
            where: {
                userId
            }
        }
    );

    if (store) redirect(`${store.id}`);

    return (
        <>
            {children}
        </>
    )
}