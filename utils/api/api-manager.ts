// Byimaan

import { ParamsArgsTS } from "@/types/objects/objs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export class ApiManager {
    public userId;
    constructor (public name:string){
        this.name = name
        this.userId = auth().userId;
    };

    getStoreId(args:  ParamsArgsTS){
        const {params: {storeId}} = args;
        return storeId;
    };

    async getBillboardId(req: Request, args: ParamsArgsTS){
        let billboardId = args?.params?.billboardId;

        if (!billboardId){
            billboardId = await req.json();
        };
        return billboardId;

    };

    inspectUserAndStoreID(args: ParamsArgsTS){
        const storeId = this.getStoreId(args);
        if (!storeId) return new NextResponse("Store ID is required", {status: 400})

        if (!this.userId) return new NextResponse("Unauthenticated", {status: 401});
        return null;
    };

    async isStoreOwnedByUserId(args: ParamsArgsTS){
        const storeId = this.getStoreId(args);
        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: storeId,
                    userId: this.userId ?? undefined,
                }
            }
        );

        if (storeByUserId) return true;
        return false;
    };

    async inspectBillboardBelongsToStore(req: Request, args: ParamsArgsTS){
        const billboardId = await this.getBillboardId(req, args);
        return new NextResponse()
    };

    returnApiInternalError(err: unknown, methodName: string){
        console.log(`[${this.name.toUpperCase()}_${methodName.toUpperCase()}]`, err);
        return new NextResponse('Internal error', {status: 500})
    };

    returnApiUnAuthorizedError(){
        return new NextResponse("Unauthorized", {status: 403});
    };

    async GET( args: ParamsArgsTS, callbackFunc: Function){
        try {
            const idInspectionFailed = this.inspectUserAndStoreID(args);
            if (idInspectionFailed) return idInspectionFailed;

            const queryResult = await callbackFunc();
            return NextResponse.json(queryResult);
        } catch(err) {
            return this.returnApiInternalError(err, 'get');
        }
    };

    async DELETE( args: ParamsArgsTS, callbackFunc: Function){
        try {
            const idInspectionFailed = this.inspectUserAndStoreID(args);
            if (idInspectionFailed) return idInspectionFailed;

            const userIsStoreOwner = this.isStoreOwnedByUserId(args);
            if (!userIsStoreOwner) return this.returnApiUnAuthorizedError();

            const result = await callbackFunc();
            return NextResponse.json(result);
        } catch(err) {
            return this.returnApiInternalError(err, 'delete');
        }
    };
    
    async POST( args: ParamsArgsTS, postCallbackFunc: Function,){
        try {
            const idInspectionFailed = this.inspectUserAndStoreID(args);
            if (idInspectionFailed) return idInspectionFailed;

            const userIsStoreOwner = this.isStoreOwnedByUserId(args);
            if (!userIsStoreOwner) return this.returnApiUnAuthorizedError();

            return await postCallbackFunc();
        } catch(err) {
            return this.returnApiInternalError(err, 'post');
        }
    };

    async PATCH(args: ParamsArgsTS, patchCallbackFunc: Function){
        try {
            const idInspectionFailed = this.inspectUserAndStoreID(args);
            if (idInspectionFailed) return idInspectionFailed;

            const userIsStoreOwner = this.isStoreOwnedByUserId(args);
            if (!userIsStoreOwner) return this.returnApiUnAuthorizedError();

            return await patchCallbackFunc();
        } catch(err) {
            return this.returnApiInternalError(err, 'patch');
        }
    }
};


