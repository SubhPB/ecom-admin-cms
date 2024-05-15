// Byimaan
"use client";

import React from "react";
import { StoreSwitcherPropsTS } from "@/types/components/components";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Store as LucideStore, PlusCircle } from "lucide-react";

import { useStoreModal } from "@/utils/hooks/use-store-modal";
import { DashboardStoreItemTS } from "@/types/objects/objs";
import { onStoreSelectTS } from "@/types/functions/funcs";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { CommandSeparator } from "cmdk";


export default function StoreSwitcher(
    {
        className,
        items,
    }: StoreSwitcherPropsTS
){

    const [storeModal, params, router, [open, setOpen]] = [useStoreModal(), useParams(),  useRouter(), React.useState(false)];
    const formattedItems: DashboardStoreItemTS[] = items.map(
        (item) => ({
            label: item.name,
            value: item.id,
        })
    );

    const currentStore = formattedItems.find(
        item => item.value === params.storeId
    );
    const onStoreSelect: onStoreSelectTS = (store) => {
        setOpen(false);
        router.push(`/${store.value}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant={'outline'}
                    size={'sm'} 
                    role={"combobox"} 
                    aria-expanded={open}
                    aria-label={'Select a store'}
                    className={
                        cn(
                            'w-[200px] justify-between ', className
                        )
                    }
                >
                    <LucideStore className="mr-2 h-4 w-4"/>
                    {currentStore?.label ?? 'Current Store'}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            
            <PopoverContent className="w-[200px] p-0">

                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..."/>
                        <CommandEmpty> No Store found. </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {
                                formattedItems.map(
                                  (store) => (
                                    <CommandItem key={`${store.value}`} onSelect={() => onStoreSelect(store)}>
                                        <LucideStore className="mr-2 h-4 w-4"/>
                                        {store.label}
                                        <Check 
                                            className={
                                                cn(
                                                    'ml-auto h-4 w-4',
                                                    currentStore?.value === store.value ? 'opacity-100': 'opacity-0'
                                                )
                                            }
                                        />
                                    </CommandItem>
                                  )  
                                )
                            }
                        </CommandGroup>    
                    </CommandList>

                    <CommandSeparator />

                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => {
                                setOpen(false);
                                storeModal.onOpen();
                            }}>
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>

            </PopoverContent>
        </Popover>
    );
}