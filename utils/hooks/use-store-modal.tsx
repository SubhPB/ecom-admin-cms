// Byimaan

import { create } from "zustand";
import { UseModalStorePropTS } from "@/types/components/components";

export const useStoreModal = create<UseModalStorePropTS>(
    set => ({
        isOpen: false,
        onOpen: () => set({
            isOpen: true
        }),
        onClose: () => set({
            isOpen: false
        })
    })
)