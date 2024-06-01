// Byimaan

import { NextResponse } from "next/server";
import { CheckoutProductTS, ParamsArgsTS } from "@/types/objects/objs";
import prismadb from "@/lib/prismadb";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";


export const corsHeaders = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function OPTIONS(){
    return NextResponse.json({}, {
        headers: corsHeaders
    })
};

export async function POST(req: Request, paramArgs: ParamsArgsTS){

    const {params: {storeId}} = paramArgs;
    const data: CheckoutProductTS[] = await req.json();

    try{
        if (!data || data?.length === 0){
            return new NextResponse("Product items are required to request an order", {status: 400});
        };

        const products = await prismadb.product.findMany(
            {
                where: {
                    id: {
                        in: data.map(item => item.id)
                    }
                }
            }
        );

        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach(
            product => {
                const count = data.find(i => i.id === product.id)?.count;
                if (!count) return;
                line_items.push(
                    {
                        quantity: count,
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name: product.name
                            },
                            unit_amount: product.price.toNumber()*100,
                        }
                    }
                )
            }
        );

        const order = await prismadb.order.create(
            {
                data: {
                    storeId: storeId,
                    isPaid: false,
                    orderItems: {
                        create: data.map(
                            item => ({
                                product: {
                                    connect: {
                                        id: item.id
                                    }
                                },
                            })
                        )
                    }
                }
            }
        );

        const session = await stripe.checkout.sessions.create(
            {
                line_items,
                mode: 'payment',
                billing_address_collection: 'required',
                phone_number_collection: {
                    enabled: true
                },
                success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
                cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
                metadata: {
                    orderId: order.id
                }
            }
        );


        return NextResponse.json(
            {
                url: session.url
            },
            {
                headers: corsHeaders
            }
        )

    } catch(err){
        console.log("[CHECKOUT-POST]: Error occured during the payment of orders", err);
        return new NextResponse("Something unexpected happened.", {status: 500 })
    }
}