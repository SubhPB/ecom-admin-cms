// Byimaan 

import prismadb from "@/lib/prismadb";
import { LayoutParamsPropTS } from "@/types/components/components";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashNavbar from "@/components/routes/dashboard/DashNavbar";
import { ThemeProvider } from "@/providers/theme-provider";

export default async function DashboardLayout({ children, params: {storeId}}: LayoutParamsPropTS){

    // let's first check that whether user is logged in.
    const {userId} = auth();
    if (!userId) redirect('/sign-in');

    const store = await prismadb.store.findFirst(
        {
            where: {
                id: storeId,
                userId: userId
            }
        }
    );

    if (!store) redirect('/');

    return (
        <div className="dashboard-layout w-full overflow-hidden">
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <DashNavbar />
                {children}
            </ThemeProvider>
        </div>
    )
};

