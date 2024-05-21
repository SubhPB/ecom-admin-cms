// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { SizesOrColorsApiManager } from "@/utils/api/sizes-or-colors-api-manager";

export async function GET(req: Request, paramsArgs: ParamsArgsTS){
    const apiManger = new SizesOrColorsApiManager('colors', req, paramsArgs);
    return await apiManger.GETALL();
};