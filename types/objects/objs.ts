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
    billboardLabel: string;
    createdAt: string;
}
  