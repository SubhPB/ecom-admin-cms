// Byimaan
import { PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { Category, Store } from "@prisma/client";
import { Billboard } from "@prisma/client";
import { ParamsTS } from "../objects/objs";

export interface LayoutPropTS {
    children: Readonly<React.ReactNode>
};

export interface LayoutParamsPropTS extends LayoutPropTS {
    params : ParamsTS
};

export interface EsssentialPropsTS {
    className ?: string;
};

export interface ComponentCarryingPropDataTS<T>{
    data : T,
}

// fix hydration

export interface FixHydrationPropTS extends LayoutPropTS {
}


// store related prop interfaces
type PopoverTriggerPropsTS = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

export interface StoreSwitcherPropsTS extends PopoverTriggerPropsTS{
    items: Store[]
}

// settingspage
export interface SettingsPagePropsTS extends LayoutParamsPropTS {}

export interface EndpointFormPropsTS<T> {
    initialData: T
}

export interface SettingsFormPropsTS extends EndpointFormPropsTS<null | Store>{}

export interface BillboardFormPropsTS extends EndpointFormPropsTS<null | Billboard>{};

export interface CategoryFormPropsTS extends EndpointFormPropsTS<null | Category>{
    billboards: Billboard[]
};

// ui components

export interface BaseModalPropTS {
    onClose: () => void;
    isOpen: boolean;
}

export interface ModalPropTS extends BaseModalPropTS {
    title: string;
    description: string;
    children?:  Readonly<React.ReactNode>
}

export interface UseModalStorePropTS extends BaseModalPropTS {
    onOpen: () => void;
};

export interface AlertModalPropTS extends BaseModalPropTS {
    onConfirm: () => void;
    loading: boolean;
}

// cstm-ui components

export interface ApiAlertPropTS {
    title: string;
    description: string;
    variant: 'public' | 'admin';
}

export interface HeadingPropTS{
    title: string;
    description: string;
}

export interface ImageUploadPropTS {
    onChange: (val: string) => void;
    onRemove: (val: string) => void;
    value: string[];
    disabled ?: boolean;
}

export interface ApiListPropTS {
    entityName: string;
    entityIdName: string;
}