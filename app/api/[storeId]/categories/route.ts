// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { CategoryApiManager } from "@/utils/api/category-api-manager";

export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new CategoryApiManager(req, paramsArgs);
    return await apiManager.GETALL();
}