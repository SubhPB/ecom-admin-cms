// Byimaan

import { ApiManager } from "./api-manager";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import { ParamsArgsTS } from "@/types/objects/objs";

// export class HandleImageApi {
    
//     constructor(public req: Request, public args: ParamsArgsTS, public imageId :string, public productId: string){
//         this.imageId = imageId,
//         this.productId = productId;
//     };

//     async getProduct(includeImgs=true){

//         const product = await prismadb.product.findUnique(
//             {
//                 where: {
//                     id: this.productId
//                 }, include: {
//                     images: includeImgs,
//                 }
//             }
//         );

//         return product;
//     }

//     async GETALL(){
//         const product = await this.getProduct();
        
//         if (product){
//             return product.images
//         };

//         return new NextResponse("Product does not exists", {status: 400})
//     };

//     async GET(){
//         if (!this.imageId) return new NextResponse("Image Id is reuired", {status: 400});

//         return await prismadb.image.findUnique(
//             {
//                 where: {
//                     id: this.imageId
//                 }
//             }
//         );
//     }

//     async POST(){
//         // url
//     }

//     async PATCH(){
//         // imageId, url, productId
//     }

// }

export class ProductApiManager {
    public apiManager: ApiManager = new ApiManager('product');
    public storeId;
    public productId; 
    constructor(public req: Request, public args: ParamsArgsTS){
       this.req= req;
       this.args = args;
       this.productId = args?.params?.productId;
       this.storeId= args?.params?.storeId;
    };

    async GET(){

        if (!this.productId) return new NextResponse("Product Id is required", {status: 400});

        const callbackFuncUponSuccess = async () => {
            return await prismadb.product.findUnique(
                {
                    where: {
                        id: this.productId,
                        storeId: this.storeId
                    }, include: {
                        images: true,
                    }
                }
            )
        };
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess);
    };

    async GETALL(){
        const callbackFuncUponSuccess = async () => {
            return await prismadb.product.findMany(
                {
                    where: {
                        storeId: this.storeId,
                    }, include: {
                        images: true,
                        category: true
                    }
                },
            )
        };
        return await this.apiManager.GET(this.args, callbackFuncUponSuccess)
    };

    async POST(){

        const {
            name,
            price,
            isFeatured=false,
            isArchieved=false,
            categoryId,
            sizeId,
            colorId, 
            images
        } = await this.req.json();

        const returnRequiredErr = (text: string) => new NextResponse(`${text} is required`, {status: 400})
        if (!name) return returnRequiredErr('Name');
        if (!price) return returnRequiredErr('Price')
        if (!categoryId) return returnRequiredErr('Category Id')
        if (!sizeId) return returnRequiredErr('Size Id')
        if (!colorId) return returnRequiredErr('Color Id')
        if (!images || images?.length === 0) return returnRequiredErr("Image")
        
        const callbackFuncUponSuccess = async () => {
            const product = await prismadb.product.create(
            {
                data: {
                    name,
                    price,
                    isArchieved,
                    isFeatured,
                    categoryId,
                    sizeId,
                    colorId,
                    images: {
                        create: images.map( (img: any) => ({
                            url: img.url
                        }))
                    },
                    storeId: this.storeId
                }
            });
            return NextResponse.json(product)
        };
        return await this.apiManager.POST(this.args, callbackFuncUponSuccess)

    };

    async PATCH(){
        if (!this.productId) return new NextResponse("Product Id is required", {status: 400});

        const {
            name,
            price,
            isFeatured=false,
            isArchieved=false,
            categoryId,
            sizeId,
            colorId, 
            images=[]
        } = await this.req.json();

        const returnRequiredErr = (text: string) => new NextResponse(`${text} is required`, {status: 400})

        if (!name) return returnRequiredErr('Name');
        if (!price) return returnRequiredErr('Price')
        if (!categoryId) return returnRequiredErr('Category Id')
        if (!sizeId) return returnRequiredErr('Size Id')
        if (!colorId) return returnRequiredErr('Color Id')
        if (!images || images?.length === 0) return returnRequiredErr("Image")
    
        const callbackFuncUponSuccess = async() => {
            const updatedProduct = await prismadb.product.update(
                {
                    where: {
                        id: this.productId
                    }, 
                    data: {
                        name,
                        price,
                        isArchieved,
                        isFeatured,
                        categoryId,
                        sizeId,
                        colorId
                    }
                }
            )
            
            if (images && images.length > 0){
                await prismadb.image.deleteMany({
                    where: {
                        productId: this.productId
                    }
                });
                await prismadb.image.createMany(
                    {
                        data: images.map(
                            (img: {url:string}) => ({
                                url: img.url,
                                productId: this.productId,
                            })
                        )
                    }
                )
            };

            return NextResponse.json(updatedProduct)
        };
        return await this.apiManager.PATCH(this.args, callbackFuncUponSuccess)
    };

    async DELETE(){
        if (!this.productId) return new NextResponse("Product Id is required", {status: 400});

        const callbackFuncUponSuccess = async() => {
            return await prismadb.product.delete(
                {
                    where: {
                        id: this.productId
                    }
                }
            )
        };
        return await this.apiManager.DELETE(this.args, callbackFuncUponSuccess)
    }
}