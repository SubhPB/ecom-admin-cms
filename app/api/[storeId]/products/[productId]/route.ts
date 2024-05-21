// Byimaan

import { ProductApiManager } from "@/utils/api/product-api-manager";
import { ParamsArgsTS } from "@/types/objects/objs";

export async function POST(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ProductApiManager(req, paramsArgs);
    return await apiManager.POST();
};

export async function PATCH(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ProductApiManager(req, paramsArgs);
    return await apiManager.PATCH();
};
export async function GET(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ProductApiManager(req, paramsArgs);
    return await apiManager.GET();
};

export async function DELETE(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ProductApiManager(req, paramsArgs);
    return await apiManager.DELETE();
};
