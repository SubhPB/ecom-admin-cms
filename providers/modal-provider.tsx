// Byimaan

"use client";
import { StoreModal } from "@/components/modals/store-modal";
import FixHydration from "@/components/utils/FixHydration";

export const ModalProvider = () => {
    
    return (
        <FixHydration>
            <StoreModal />
        </FixHydration>
    )
    
};