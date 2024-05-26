// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";

import { BillboardApiManager } from "@/utils/api/billboard-api-manager";


export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new BillboardApiManager(req, paramsArgs);
    return await apiManager.GETALL();
}