// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { OrderApiManager } from "@/utils/api/order-api-manager";

export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new OrderApiManager(req, paramsArgs);
    return await apiManager.GETALL();
}