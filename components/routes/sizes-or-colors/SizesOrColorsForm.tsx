// Byimaan
'use client';

import React from 'react';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Size } from '@prisma/client';
import { Color } from '@prisma/client';

import {  SizeOrColorFormPropsTS } from '@/types/components/components';
import { zodResolver } from '@hookform/resolvers/zod';

import { AlertModal } from '@/components/modals/alert-modal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
    Form, FormField, FormLabel, FormControl, FormMessage, FormItem
} from '@/components/ui/form';
 

import { Trash } from 'lucide-react';
import { capitalize, singularize } from '@/utils/functions/func';


const formSchema = z.object(
    {
        name: z.string().min(1),
        value: z.string().min(1),  
    }
);
type FormValuesTS = z.infer<typeof formSchema>;

const getAtrributes = (initialData: Size | Color |null, attr: string) => {

    attr = capitalize(singularize(attr))
    return {   
        title: initialData ? `Edit ${attr}` : `Create ${attr}`,
        description: initialData ? `Edit a ${attr}` : `Add a new ${attr}`,
        toastMsg: initialData ? `${attr} updated`: `${attr} created`,
        action: initialData ? `Edit ${attr}`: `Create ${attr}`,
    }
};

export function SizeOrColorForm ({endpointName, initialData}: SizeOrColorFormPropsTS) {

    const idAttribute =`${singularize(endpointName)}Id`

    const [
        [open, setOpen], [loading, setLoading]
    ] = Array.from({length:2}, () => React.useState(false));

    const {storeId} = useParams();
    const Idvalue = useParams()?.[idAttribute];
    const router = useRouter();

    const {title, description, toastMsg, action} = getAtrributes(initialData,endpointName);

    const form = useForm<FormValuesTS>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name ?? '',
            value: initialData?.value ?? '',
        }
    });

    const onSubmit = async (values: FormValuesTS) => {
        try{
          if (initialData){
            await axios.patch(`/api/${storeId}/${endpointName}/${Idvalue}`, values);
            toast.success(`${singularize(capitalize(endpointName))} has updated!`);
          } else {
            await axios.post(`/api/${storeId}/${endpointName}/${Idvalue}`, values);
            toast.success(`${singularize(capitalize(endpointName))} has created!`);
          }
          router.refresh();
          router.push(`/${storeId}/${endpointName}`);
        } catch (err) {
          toast.error('Something went wrong!')
        } finally{
          setLoading(false);
        }
    };

    const handleDelete = async() => {
        try {
            setLoading(true);
            await axios.delete(`/api/${storeId}/${endpointName}/${Idvalue}`);
            router.refresh();
            router.push('/');
            toast.success(`${capitalize(singularize(endpointName))} deleted`);
          } catch (err) {
            toast.error("Deletion failed! Something went wrong.");
    
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

          <div className="grid grid-cols-3 gap-6">
              <FormField 
              control={form.control}
              name={'name'}
              render={
                  ({field}) => (
                  <FormItem>
                      <FormLabel> Name </FormLabel>
                      <FormControl>
                      <Input disabled={loading} placeholder={`${capitalize(singularize(endpointName))} name`} {...field}/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )
              }
              />

              <FormField 
              control={form.control}
              name={'value'}
              render={
                  ({field}) => (
                  <FormItem>
                      <FormLabel> Value </FormLabel>
                      <FormControl>
                      <Input disabled={loading} placeholder={`${capitalize(singularize(endpointName))} value`} {...field}/>
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