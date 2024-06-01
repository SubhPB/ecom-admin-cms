// Byimaan

// Webhook to handle the events sent by stripe. 

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request){

    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;
    let event: Stripe.Event;

    try{ 
        event = Stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY!
        );
    } catch (error: any){
        return new NextResponse("WEBHOOK ERROR", {status: 500})
    };

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session.customer_details?.address;

    const addressComponent = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponent.filter(
        c => c !== null && c!==undefined
    ).join(', ');

    if (event.type === 'payment_intent.succeeded'){
        const order = await prismadb.order.update(
            {
                where: {
                    id: session?.metadata?.orderId
                },
                data: {
                    isPaid: true,
                    address: addressString,
                    phone: session?.customer_details?.phone || '',
                },
                include: {
                    orderItems: true
                }
            }
        );
        const productIds = order.orderItems.map(item => item.id);

        await prismadb.product.updateMany(
            {
                where: {
                    id: {
                        in: productIds
                    }
                },
                data: {
                    isArchieved: true
                }
            }
        );
    };

    return NextResponse.json({
        received: true,
    },{status: 200})

}