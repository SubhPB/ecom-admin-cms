// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { SizesOrColorsApiManager as ColorsApiManager } from "@/utils/api/sizes-or-colors-api-manager";

export async function POST(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ColorsApiManager('colors', req, paramsArgs);
    return await apiManager.POST();
};

export async function PATCH(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ColorsApiManager('colors', req, paramsArgs);
    return await apiManager.PATCH();
};
export async function GET(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ColorsApiManager('colors', req, paramsArgs);
    return await apiManager.GET();
};

export async function DELETE(req: Request,paramsArgs: ParamsArgsTS){
    const apiManager = new ColorsApiManager('colors', req, paramsArgs);
    return await apiManager.DELETE();
};