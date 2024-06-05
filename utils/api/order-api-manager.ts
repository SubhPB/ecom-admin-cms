// Byimaan

import { ApiManager } from "./api-manager";
import prismadb from "@/lib/prismadb";

import { ParamsArgsTS } from "@/types/objects/objs";

export class OrderApiManager {
    public apiManager: ApiManager = new ApiManager('order');
    public storeId;
    public orderId; 
    constructor(public req: Request, public args: ParamsArgsTS){
       this.req= req;
       this.args = args;
       this.orderId = args?.params?.orderId;
       this.storeId= args?.params?.storeId;
    };

    async GETALL(){
        
        const callbackFuncUponSuccess = async () => {
            return await prismadb.order.findMany(
                {
                    where: {
                        storeId: this.storeId
                    }, include: {
                        orderItems: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            )
        }
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    };

};