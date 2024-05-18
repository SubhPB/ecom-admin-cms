// Byimaan

'use client';

import React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import { AlertModal } from '@/components/modals/alert-modal';

type VoidFuncTS = () => void;
export interface OnDeleteArgsTS {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RouteActionPropTS {
    onCopy: VoidFuncTS;
    onDelete: (obj: OnDeleteArgsTS) => Promise<void>;
    onUpdate: VoidFuncTS
}

function RouteAction({onCopy, onDelete, onUpdate}: RouteActionPropTS){
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    return (
        <>
          <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onDelete({setOpen, setLoading})} loading={loading}/>
          <DropdownMenu>
    
            <DropdownMenuTrigger asChild>
              <Button className='h-8 w-8 p-0' variant={'ghost'}>
                <span className='sr-only'>Open Menu</span>
                <MoreHorizontal className='h-4 w-4'/>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={onCopy}>
                <Copy className='mr-2 h-4 w-4'/>
                Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUpdate} >
                <Edit className='mr-2 h-4 w-4'/>
                Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className='mr-2 h-4 w-4'/>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
    
          </DropdownMenu>
        </>
      )
};

export default RouteAction;

