// Byimaan

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

import { ApiManager } from "./api-manager";
import { ParamsArgsTS } from "@/types/objects/objs";

export class BillboardApiManager {
    public apiManager: ApiManager = new ApiManager('billboard');
    public storeId;
    public billboardId; 
    constructor(public req: Request, public args: ParamsArgsTS){
       this.req= req;
       this.args = args;
       this.billboardId = args?.params?.billboardId;
       this.storeId= args?.params?.storeId;
    };

    async GET(){
        
        if (!this.billboardId){
            return new NextResponse("Billboard Id is required", {status: 400})
        };

        const callbackFuncUponSuccess = async () => {
            return await prismadb.billboard.findUnique(
                {
                    where: {
                        id: this.billboardId, 
                        storeId: this.storeId
                    }
                }
            )
        }
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    };

    async GETALL(){
        
        const callbackFuncUponSuccess = async () => {
            return await prismadb.billboard.findMany(
                {
                    where: {
                        storeId: this.storeId
                    }
                }
            )
        }
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    };

    async DELETE(){
        if (!this.billboardId){
            return new NextResponse("Billboard Id is required", {status: 400})
        };

        const callbackFuncUponSuccess = async() => {
            return await prismadb.billboard.deleteMany(
                {
                    where: {
                        id: this.billboardId,
                    }
                }
            )
        };

        return await this.apiManager.DELETE(this.args, callbackFuncUponSuccess);
    };

    async POST(){
        const {label, imageUrl} = await this.req.json();

        if (!label || label?.trim()?.length === 0) return new NextResponse("Label field is required", {status: 400});

        const callbackFuncUponSuccess = async() => {
            const billboard =  await prismadb.billboard.create(
                {
                    data: {
                        label: label,
                        imageUrl: imageUrl,
                        storeId: this.storeId
                    }
                }
            );
            return NextResponse.json(billboard);
        };
        return await this.apiManager.POST(this.args, callbackFuncUponSuccess);
    };

    async PATCH(){
        if (!this.billboardId){
            return new NextResponse("Billboard Id is required", {status: 400})
        };

        const {label , imageUrl} = await this.req.json();

        const callbackFuncUponSuccess = async() => {
            const upadtedBillboard = await prismadb.billboard.updateMany(
                {
                    where: {
                        id: this.billboardId
                    },
                    data: {
                        label,
                        imageUrl,
                    }
                }
            );
            return NextResponse.json(upadtedBillboard);
        };

        return await this.apiManager.PATCH(this.args, callbackFuncUponSuccess)
    }

}