// Byimaan

import { ProductApiManager } from "@/utils/api/product-api-manager";
import { ParamsArgsTS } from "@/types/objects/objs";

export async function GET(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ProductApiManager(req, paramsArgs);
    return await apiManager.GETALL();
};
