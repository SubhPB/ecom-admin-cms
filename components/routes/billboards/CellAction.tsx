// Byimaan

'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import { ComponentCarryingPropDataTS } from '@/types/components/components';
import { BillboardColumnTS } from '@/types/objects/objs';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import { copyToClipboard } from '@/utils/functions/func';
import { AlertModal } from '@/components/modals/alert-modal';

function CellAction({data}: ComponentCarryingPropDataTS<BillboardColumnTS>) {

  const router = useRouter();
  const {storeId} = useParams();

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onCopy = () => {
    copyToClipboard(data.id);
    toast.success("Billboard Id copied to the clipboard.")
  };

  const onUpdate = () => {
    router.push(`/${storeId}/billboards/${data.id}`)
  };

  const onDelete = async() => {
    try{
      setLoading(true);
      await axios.delete(`/api/${storeId}/billboards/${data.id}`);
      router.refresh();
      router.push(`/${storeId}/billboards/`);
      toast.success('Billboard deleted!');
    } catch (err){
      toast.error("Make sure you removed all categories subjective to this billboard before deletion.")
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
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
}

export default CellAction

