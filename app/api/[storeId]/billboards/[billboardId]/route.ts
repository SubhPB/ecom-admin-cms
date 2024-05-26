// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";

import { BillboardApiManager } from "@/utils/api/billboard-api-manager";

export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new BillboardApiManager(req, paramsArgs);
    return await apiManager.GET();
};

export async function DELETE(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new BillboardApiManager(req, paramsArgs);
    return await apiManager.DELETE();
};

export async function POST(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new BillboardApiManager(req, paramsArgs);
    return await apiManager.POST();
};

export async function PATCH(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new BillboardApiManager(req, paramsArgs);
    return await apiManager.PATCH();
}