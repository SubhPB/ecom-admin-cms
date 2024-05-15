// Byimaan

// 3: 57: 55

"use client";

import React from 'react';
import { BillboardFormPropsTS } from '@/types/components/components';
import * as z from 'zod';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';

const formSchema = z.object(
  {
    label: z.string().min(1),
    imageUrl: z.string(),
  }
);
type BillboardFormValuesTS = z.infer<typeof formSchema>;

function getAtrributes(initialData: any){
    return {
        title: initialData ? "Edit billboard" : "Create billboard",
        description: initialData ? 'Edit a billboard' : 'Add a new billboard',
        toastMsg: initialData ? 'Billboard updated': 'Billboard cretaed',
        action: initialData ? 'Edit Billboard': 'Create Billboard',

    }
}

function BillboardForm({initialData}: BillboardFormPropsTS) {

  const [[open, setOpen], [loading, setLoading]] = [React.useState(false), React.useState(false)];
  const {storeId, billboardId} = useParams();
  const router = useRouter();

  const {title, description, toastMsg, action} = getAtrributes(initialData);

  const form = useForm<BillboardFormValuesTS>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData
    }
  });

  const onSubmit = async (values: BillboardFormValuesTS) => {
    try{

      if (initialData){
        await axios.patch(`/api/${storeId}/billboards/${billboardId}`, values);
        toast.success('Billboard has updated!');
      } else {
        await axios.post(`/api/${storeId}/billboards/${billboardId}`, values);
        toast.success('Billboard has created!');
      }
      router.refresh();
      router.push(`/${storeId}/billboards`);
    } catch (err) {
      toast.error('Something went wrong!')
    } finally{
      setLoading(false);
    }
  };

  const handleDelete = async() => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/billboards/${billboardId}`);
      router.refresh();
      router.push('/');
      toast.success("Billboard deleted");
    } catch (err) {
      toast.error("Make sure you removed all products and categories first.");

    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={handleDelete} loading={loading}/>
      <div className="flex items-center justify-between mt-2">

        <Heading 
          title={title}
          description={description}
        />
        {
            initialData && 
            <Button
                variant={'destructive'}
                size={'sm'}
                onClick={() => setOpen(true)}
                >
                <Trash className='h-4 w-4' onClick={() => setOpen(true)}/>
            </Button>
        }

      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full mt-1'>

        <FormField 
            control={form.control}
            name={'imageUrl'}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel> Background image </FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field?.value ? [field.value] : [] }
                      disabled={loading}
                      onChange={url => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            />

          <div className="grid grid-cols-3 gap-6">
            <FormField 
            control={form.control}
            name={'label'}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel> Label </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Billboard label' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            />
          </div>

          <Button disabled={loading} className='ml-auto' type='submit'> {action} </Button>
        </form>
      </Form>
    </>
  )
}

export default BillboardForm;