// Byimaan

// 3: 57: 55

"use client";

import React from 'react';
import { Category, Size, Color } from '@prisma/client';
import { ProductFormPropTS } from '@/types/components/components';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { capitalize } from '@/utils/functions/func';

const formSchema = z.object(
  {
    name: z.string().min(1),
    price: z.number().min(1),
    isFeatured:  z.boolean(),
    isArchieved: z.boolean(),
    images: z.object({url:z.string()}).array(),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
  }
);
type ProductFormValuesTS = z.infer<typeof formSchema>;

type AttrNameTypeTS = 'colorId' | 'categoryId' | 'sizeId';

const attrs: AttrNameTypeTS[] = ['colorId' , 'categoryId' , 'sizeId']
interface OptionsFieldsPropTS {
  attrName: AttrNameTypeTS,
  name: string,
  dataList: Size[] | Category[] | Color[]
}

function getAtrributes(initialData: any){
    return {
        title: initialData ? "Edit Product" : "Create Product",
        description: initialData ? 'Edit a Product' : 'Add a new Product',
        toastMsg: initialData ? 'Product updated': 'Product created',
        action: initialData ? 'Edit Product': 'Create Product',

    }
};

function ProductForm({initialData, options}: ProductFormPropTS) {

  const [[open, setOpen], [loading, setLoading]] = [React.useState(false), React.useState(false)];
  const {storeId, productId} = useParams();
  const router = useRouter();

  const {title, description, toastMsg, action} = getAtrributes(initialData);

  const form = useForm<ProductFormValuesTS>({
    resolver: zodResolver(formSchema),
    defaultValues: 
        initialData ?  {
            ...initialData,
            price: parseFloat(String(initialData?.price))
        } : {
 
    }
  });

  const onSubmit = async (values: ProductFormValuesTS) => {
    try{

      if (initialData){
        await axios.patch(`/api/${storeId}/products/${productId}`, values);
        toast.success('Product has updated!');
      } else {
        await axios.post(`/api/${storeId}/products/${productId}`, values);
        toast.success('Product has created!');
      }
      router.refresh();
      router.push(`/${storeId}/products`);
    } catch (err) {
      toast.error('Something went wrong!')
    } finally{
      setLoading(false);
    }
  };

  const handleDelete = async() => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/products/${productId}`);
      router.refresh();
      router.push('/');
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Deletion Failed! Something went wrong.");

    } finally {
      setLoading(false);
    }
  };

  const OptionsFields = ({attrName, name, dataList}: OptionsFieldsPropTS) => {
    name = capitalize(name)
    return (
      <FormField 
        control={form.control}
        name={attrName}
        render={
        ({field}) => (
            <FormItem>
                <FormLabel> {name} </FormLabel>
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
                                  `Select a ${name}` 
                                }
                            />
                        </SelectTrigger>
                    </FormControl>
                      <SelectContent>
                        {
                            dataList && dataList.map(
                                (data) => (
                                  <SelectItem key={data.id} value={data.id}>
                                    {data.name}
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
    )
  }


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
            name={'images'}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel> Background image </FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field?.value ? field.value.map(f => f.url) : []}
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
            name={'name'}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel> Label </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Product name' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            />

            {
              attrs.map(
                (d) => 
                  <OptionsFields 
                    key={d}
                    attrName={d} 
                    dataList={options[d === 'sizeId' ? 'sizes' : (d === 'categoryId' ? 'categories' : 'colors')]}
                    name={d === 'sizeId' ? 'Size' : (d === 'categoryId' ? 'Category' : 'Color')} 
                  />
              )
            }

            
          </div>

          <Button disabled={loading} className='ml-auto' type='submit'> {action} </Button>
        </form>
      </Form>
    </>
  )
}

export default ProductForm;