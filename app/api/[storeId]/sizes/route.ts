// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { SizesOrColorsApiManager } from "@/utils/api/sizes-or-colors-api-manager";

export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const apiManager = new SizesOrColorsApiManager('sizes', req, paramsArgs);
    return await apiManager.GETALL();
}