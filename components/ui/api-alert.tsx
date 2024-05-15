// Byimaan

"use client";

import React from 'react';
import { ApiAlertPropTS } from '@/types/components/components';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import toast from 'react-hot-toast';
import { Separator } from '@radix-ui/react-separator';
import { useOrigin } from '@/utils/hooks/use-origin';

const textMap: Record<ApiAlertPropTS['variant'], string> = {
    public: "Public",
    admin: "Admin"
};

const variantMap: Record<ApiAlertPropTS['variant'], BadgeProps['variant']> = {
    public: 'secondary',
    admin: 'destructive',
}

function ApiAlert({title, description, variant='public'}: ApiAlertPropTS){

  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route copied to the clipboard.")
  };

  return (
    <>
    <Separator />
    <Alert>
      <Server className='h-4 w-4'/>

      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className='flex justify-between'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {description}
        </code>
        <Button variant={'outline'} size={'icon'} onClick={onCopy}>
          <Copy className='h-4 w-4'/>
        </Button>
      </AlertDescription>
    </Alert>
    </>
  )
}

export default ApiAlert