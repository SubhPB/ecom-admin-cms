// Byimaan

import prismadb from "@/lib/prismadb";

export interface DashboardTS {
totalRevenue: number;
totalSales: number;
graphData: {name: string, total: number}[];
}
  
  
export class Dashboard{
dashboardData: DashboardTS | null = null;
constructor (public storeId: string){
    this.storeId = storeId;
};

async getPaidOrders(){
    return await prismadb.order.findMany(
    {
        where: {
        storeId: this.storeId,
        isPaid: true,
        },
        include: {
        orderItems: {
            include: {
            product: true
            }
        }
        }
    }
    );
}

async initialize(){
    if (this.dashboardData) return this.dashboardData;

    const orders = await this.getPaidOrders();
    
    let totalRevenue = 0;
    let totalSales = 0;
    const monthlyRevenue: {[key: number]: number} = {};
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const graphData = monthsOfYear.map(month => (
    {name: month, total: 0}
    ))

    orders.map((order) => {

        const orderMonth = order.createdAt.getMonth();
        let revenueForThisOrder = 0;

        order.orderItems.forEach(
        orderItem => {
            revenueForThisOrder += orderItem.product.price.toNumber();
        }
        );

        // let's also update that how many products were sold out.
        totalSales += order.orderItems.length;

        // So here we now know that how much revenue does this order has made.
        // now let's add this revenue as contribution to the month in which it was placed at.
        totalRevenue += revenueForThisOrder;
        monthlyRevenue[orderMonth] = (monthlyRevenue[orderMonth] || 0) + revenueForThisOrder;
    });

    // let's update the graphData
    for(let month in monthlyRevenue){
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    };

    this.dashboardData = {
    totalRevenue,
    totalSales,
    graphData,
    };
    return this.dashboardData;
}
}