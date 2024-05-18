// Byimaan

"use client";

import React from 'react';
import { CategoryFormPropsTS } from '@/types/components/components';
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
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const formSchema = z.object(
  {
    name: z.string().min(1),
    billboardId: z.string().min(1),

  }
);
type CategoryFormValuesTS = z.infer<typeof formSchema>;

function getAtrributes(initialData: any){
    return {
        title: initialData ? "Edit category" : "Create category",
        description: initialData ? 'Edit a category' : 'Add a new category',
        toastMsg: initialData ? 'Category updated': 'Category created',
        action: initialData ? 'Edit category': 'Create category',
    }
}

function CategoryForm({initialData, billboards}: CategoryFormPropsTS) {

  const [[open, setOpen], [loading, setLoading]] = [React.useState(false), React.useState(false)];
  const {storeId, categoryId} = useParams();
  const router = useRouter();

  const {title, description, toastMsg, action} = getAtrributes(initialData);

  const form = useForm<CategoryFormValuesTS>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
        name: '',
        billboardId: ''
    }
  });

  const onSubmit = async (values: CategoryFormValuesTS) => {
    try{

      if (initialData){
        await axios.patch(`/api/${storeId}/categories/${categoryId}`, values);
        toast.success('Category has updated!');
      } else {
        await axios.post(`/api/${storeId}/categories/${categoryId}`, values);
        toast.success('Category has created!');
      }
      router.refresh();
      router.push(`/${storeId}/categories`);
    } catch (err) {
      toast.error('Something went wrong!')
    } finally{
      setLoading(false);
    }
  };

  const handleDelete = async() => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/categories/${categoryId}/`);
      router.refresh();
      router.push('/');
      toast.success("Category deleted");
    } catch (err) {
      toast.error("Something went wrong!. Make sure you removed all products subjective to this category.");

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
                    <Input disabled={loading} placeholder='Category name' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            />

            <FormField 
                control={form.control}
                name={'billboardId'}
                render={
                ({field}) => (
                    <FormItem>
                        <FormLabel> Billboard </FormLabel>
                          <Select
                              disabled={loading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                          >

                            <FormControl>
                                <SelectTrigger >
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder={
                                          initialData ? "Can't change the billboard once product is cretaed" : "Select a billboard" 
                                        }
                                    />
                                </SelectTrigger>
                            </FormControl>
                              <SelectContent>
                                {
                                    billboards && billboards.map(
                                        (billboard) => (
                                          <SelectItem key={billboard.id} value={billboard.id}>
                                            {billboard.label}
                                          </SelectItem>
                                        )
                                    )
                                }
                              </SelectContent>

                        </Select>

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
};

export default CategoryForm;