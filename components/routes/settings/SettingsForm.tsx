// Byimaan

"use client";

import { SettingsFormPropsTS } from '@/types/components/components';
import * as z from 'zod';
import React from 'react';
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

const formSchema = z.object(
  {
    name: z.string().min(1),
  }
);
type SettingsFormValuesTS = z.infer<typeof formSchema>;

function SettingsForm({initialData}: SettingsFormPropsTS) {

  const [[open, setOpen], [loading, setLoading]] = [React.useState(false), React.useState(false)];
  const {storeId} = useParams();
  const router = useRouter();

  const form = useForm<SettingsFormValuesTS>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? ''
    }
  });

  const onSubmit = async (values: SettingsFormValuesTS) => {
    try{
      await axios.patch(`/api/store/${storeId}`, values);
      router.refresh();
      toast.success('Store has updated!')
    } catch (err) {
      toast.error('Something went wrong!')
    } finally{
      setLoading(false);
    }
  };

  const handleDelete = async() => {
    try {
      setLoading(true);
      await axios.delete(`/api/store/${storeId}`);
      router.refresh();
      router.push('/');
      toast.success("Store successfullly deleted");
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
          title='Settings'
          description='Manage store preferences'
        />
        <Button
          variant={'destructive'}
          size={'sm'}
          onClick={() => setOpen(true)}
          >
          <Trash className='h-4 w-4' onClick={() => setOpen(true)}/>
        </Button>

      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full mt-1'>
          <div className="grid grid-cols-3 gap-6">
            <FormField 
            control={form.control}
            name={'name'}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Store name' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            />
          </div>

          <Button disabled={loading} className='ml-auto' type='submit'> Save Changes </Button>
        </form>
      </Form>
    </>
  )
}

export default SettingsForm