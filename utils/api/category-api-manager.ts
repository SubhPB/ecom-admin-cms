// Byimaan

import { ApiManager } from "./api-manager";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import { ParamsArgsTS } from "@/types/objects/objs";

export class CategoryApiManager {
    public apiManager: ApiManager = new ApiManager('category');
    public storeId;
    public categoryId; 
    constructor(public req: Request, public args: ParamsArgsTS){
       this.req= req;
       this.args = args;
       this.categoryId = args?.params?.categoryId;
       this.storeId= args?.params?.storeId;
    };

    async GET(){
        
        if (!this.categoryId){
            return new NextResponse("Category Id is required", {status: 400})
        };

        const callbackFuncUponSuccess = async () => {
            return await prismadb.category.findUnique(
                {
                    where: {
                        id: this.categoryId, 
                        storeId: this.storeId
                    }, 
                    include: {
                        billboard: true,
                        products: {
                            include: {
                                images: true
                            }
                        }
                    }
                }
            )
        }
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    };

    async GETALL(){
        
        const callbackFuncUponSuccess = async () => {
            return await prismadb.category.findMany(
                {
                    where: {
                        storeId: this.storeId
                    }, include: {
                        billboard: true,
                        products: {
                            include: {
                                images: true
                            }
                        }
                    }
                }
            )
        }
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    }

    async DELETE(){
        if (!this.categoryId){
            return new NextResponse("Category Id is required", {status: 400})
        };

        const callbackFuncUponSuccess = async() => {
            return await prismadb.category.deleteMany(
                {
                    where: {
                        id: this.categoryId,
                    }
                }
            )
        };

        return await this.apiManager.DELETE(this.args, callbackFuncUponSuccess);
    };

    async POST(){
        const {name, billboardId} = await this.req.json();

        if (!name || name?.trim()?.length === 0) return new NextResponse("Name field is required", {status: 400});
        if (!billboardId) return new NextResponse("Billboard id is required", {status: 400});

        const callbackFuncUponSuccess = async() => {
            const category =  await prismadb.category.create(
                {
                    data: {
                        name: name,
                        billboardId: billboardId,
                        storeId: this.storeId
                    }
                }
            );
            return NextResponse.json(category);
        };
        return await this.apiManager.POST(this.args, callbackFuncUponSuccess);
    };
    
    async PATCH(){
        if (!this.categoryId){
            return new NextResponse("Category Id is required", {status: 400})
        };

        const {name, billboardId} = await this.req.json();

        if (!name || name?.trim()?.length === 0) return new NextResponse("Name field is required", {status: 400});
        if (!billboardId) return new NextResponse("Billboard id is required", {status: 400});

        const callbackFuncUponSuccess = async() => {
            const upadtedCategory = await prismadb.category.updateMany(
                {
                    where: {
                        id: this.categoryId
                    },
                    data: {
                        name: name,
                        billboardId: billboardId
                    }
                }
            );
            return NextResponse.json(upadtedCategory);
        };

        return await this.apiManager.PATCH(this.args, callbackFuncUponSuccess)
    }



};