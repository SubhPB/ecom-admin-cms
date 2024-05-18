// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { CategoryApiManager } from "@/utils/api/category-api-manager";


export async function POST(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new CategoryApiManager(req, paramsArgs);
    return await apiManager.POST();
};

export async function PATCH(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new CategoryApiManager(req, paramsArgs);
    return await apiManager.PATCH();
};
export async function GET(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new CategoryApiManager(req, paramsArgs);
    return await apiManager.GET();
};

export async function DELETE(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new CategoryApiManager(req, paramsArgs);
    return await apiManager.DELETE();
};

