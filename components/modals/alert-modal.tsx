// Byimaan

"use client";

import { AlertModalPropTS } from "@/types/components/components";
import FixHydration from "../utils/FixHydration";
import {UIModal} from '@/components/ui/modal';
import { Button } from "../ui/button";

export const AlertModal = ({isOpen, loading, onClose, onConfirm}: AlertModalPropTS) => {

    return (
        <FixHydration>
            <UIModal
                title="Are you sure?"
                description="This action cannot be undone"
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant={'outline'} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
            </UIModal>
        </FixHydration>
    )
}