// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
// import { SizesApiManager } from "@/utils/api/sizes-api-manager";
import { SizesOrColorsApiManager as SizesApiManager } from "@/utils/api/sizes-or-colors-api-manager";

export async function POST(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new SizesApiManager('sizes', req, paramsArgs);
    return await apiManager.POST();
};

export async function PATCH(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new SizesApiManager('sizes', req, paramsArgs);
    return await apiManager.PATCH();
};
export async function GET(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new SizesApiManager('sizes', req, paramsArgs);
    return await apiManager.GET();
};

export async function DELETE(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new SizesApiManager('sizes', req, paramsArgs);
    return await apiManager.DELETE();
};
