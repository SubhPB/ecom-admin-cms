// Byimaan

"use client";

import React from "react";
import { ModalPropTS } from "@/types/components/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export function UIModal({title, description, isOpen, onClose, children}: ModalPropTS) {

    const onChange = (open: boolean)  => {
        if (!open) onClose();
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle> {title} </DialogTitle>
                    <DialogDescription> {description} </DialogDescription>
                </DialogHeader>

                <div className="modal-content">
                    {children}
                </div>

            </DialogContent>
        </Dialog>    
    );
};