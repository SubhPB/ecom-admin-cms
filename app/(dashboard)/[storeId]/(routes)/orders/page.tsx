// Byimaan

import React from 'react';
import prismadb from '@/lib/prismadb';
import {format} from 'date-fns';

import { OrdersColumnTS } from '@/types/objects/objs';
import { LayoutParamsPropTS } from '@/types/components/components';
import { formatter } from '@/utils/functions/func';
import FixHydration from '@/components/utils/FixHydration';
import OrdersClient from '@/components/routes/orders/OrdersClient';

async function OrdersPage({params: {storeId}}: LayoutParamsPropTS) {

    const orders = await prismadb.order.findMany(
        {
            where: {
                storeId: storeId
            }, include : {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }, 
            orderBy: {
                createdAt: 'desc'
            }
        }
    );

    const formattedOrders: OrdersColumnTS[] = orders.map(
        order => ({
            id: order.id,
            phone: order.phone,
            address: order.address,
            products: order.orderItems.map(orderItem => orderItem.product.name).join(', '),
            createdAt: format(order.createdAt, 'MMMM do, yyyy'),
            totalPrice: formatter.format(
                order.orderItems.reduce(
                    (acc, curr) => acc+ Number(curr.product.price), 0
                )
            ),
            isPaid: order.isPaid
        })
    )

    return (
         <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FixHydration>
                    <OrdersClient data={formattedOrders}/>
                </FixHydration>
            </div>
         </div>
    );

}

export default OrdersPage