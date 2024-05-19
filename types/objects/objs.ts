// Byimaan

export interface DashboardStoreItemTS {
    label: string;
    value: string;
}

export interface DashboardStoreRouteTS {
    href: string;
    label: string;
    active: boolean;
}

export interface ParamsTS {
    [paramId: string]: string
};

export interface ParamsArgsTS {
    [param: string]: ParamsTS
};


// ui


export type BillboardColumnTS = {
    id: string
    label: string
    createdAt: string
};

export type CatgoriesColumnTS = {
    id: string;
    name: string;
    billboardId: string;
    billboardLabel: string;
    createdAt: string;
};

export type SizesColumnTS = {
    id: string;
    name: string;
    value: string;
    storeId: string;
    storeName: string;
    createdAt: string   
}

export type ProductsColumnTS = {
    id: string;
    name: string;
    price: string;
    isFeatured: boolean;
    isArchieved: boolean;
    categoryId: string;
    categoryName: string;
    sizeId: string;
    sizeName: string;
    colorId: string;
    colorName: string;
    storeId: string;
    storeName: string;
    createdAt: string 
}

export type SizesOrColorsColumnTS = {
    id: string;
    name: string;
    value: string;
    storeId: string;
    storeName: string;
    createdAt: string   
}
  