// Byimaan

import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

import { ApiManager } from "./api-manager";
import { ParamsArgsTS } from "@/types/objects/objs";
import { capitalize, singularize } from "../functions/func";


export class SizesOrColorsApiManager{
    public apiManager;
    public name;
    public storeId;
    public idValue; 
    constructor(endpoint: 'sizes' | 'colors' ,public req: Request, public args: ParamsArgsTS){
       this.name = endpoint;
       this.req= req;
       this.args = args;
       this.idValue = args?.params?.[`${singularize(this.name)}Id`];
       this.storeId= args?.params?.storeId;
       this.apiManager = new ApiManager(this.name);
    };
    
    async GET(){
        if (!this.idValue){
            return new NextResponse(`${capitalize(this.name)} Id is required`, {status: 400})
        };

        const callbackFuncUponSuccess = async () => {

            if (this.name === 'sizes') {
                return await prismadb.size.findUnique(
                    {
                        where: {
                            id: this.idValue, 
                            storeId: this.storeId
                        }
                    }
                )
            };
            return await prismadb.color.findUnique({
                where: {
                    id: this.idValue,
                    storeId: this.storeId
                }
            });
        }
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    };

    async GETALL(){
        const callbackFuncUponSuccess = async () => {

            if (this.name === 'sizes'){
                return await prismadb.size.findMany(
                    {
                        where: {
                            storeId: this.storeId
                        }
                    }
                )
            };
            return await prismadb.color.findMany(
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
        if (!this.idValue){
            return new NextResponse(`${capitalize(this.name)} is required`, {status: 400})
        };

        const callbackFuncUponSuccess = async() => {

            if (this.name === 'sizes') {
    
                return await prismadb.size.deleteMany(
                    {
                        where: {
                            id: this.idValue,
                        }
                    }
                )
            };
            return await prismadb.color.deleteMany(
                {
                    where: {
                        id: this.idValue,
                    }
                }
            )
        }

        

        return await this.apiManager.DELETE(this.args, callbackFuncUponSuccess);
    };

    async POST(){
        const {name, value} = await this.req.json();

        if (!name || name?.trim()?.length === 0) return new NextResponse("Name field is required", {status: 400});
        if (!value || value?.trim()?.length === 0) return new NextResponse("Value field is required", {status: 400});

        const callbackFuncUponSuccess = async() => {
            let data;
            if (this.name === 'sizes') {
                data =  await prismadb.size.create(
                    {
                        data: {
                            name: name,
                            value: value,
                            storeId: this.storeId
                        }
                    }
                );
            } else {
                data = await prismadb.color.create(
                    {
                        data: {
                            name: name,
                            value: value,
                            storeId: this.storeId
                        }
                    }
                )
            }
            return NextResponse.json(data);
        };
        return await this.apiManager.POST(this.args, callbackFuncUponSuccess);
    };

    async PATCH(){
        if (!this.idValue){
            return new NextResponse(`${capitalize(this.name)} Id is required`, {status: 400})
        };

        const {name , value} = await this.req.json();

        const callbackFuncUponSuccess = async() => {

            let data;

            if (this.name === 'sizes'){

                data = await prismadb.size.updateMany(
                    {
                        where: {
                            id: this.idValue
                        },
                        data: {
                            name: name,
                            value: value,
                        }
                    }
                );
            } else {
                data = await prismadb.color.updateMany(
                    {
                        where: {
                            id: this.idValue
                        },
                        data: {
                            name: name,
                            value: value,
                        }
                    }
                );
            }
            return NextResponse.json(data);
        };

        return await this.apiManager.PATCH(this.args, callbackFuncUponSuccess)
    }
}