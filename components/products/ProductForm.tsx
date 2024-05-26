// Byimaan

// 3: 57: 55

"use client";

import React, { FormEvent } from 'react';
import { Category, Size, Color } from '@prisma/client';
import { ImagesUploadPropTS, ProductFormPropTS, ProductToImagesTS } from '@/types/components/components';
import * as z from 'zod';
import Heading from '@/components/ui/heading';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { AlertModal } from '@/components/modals/alert-modal';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { capitalize } from '@/utils/functions/func';
import FixHydration from '../utils/FixHydration';
import { CldUploadWidget } from 'next-cloudinary';
import { Checkbox } from '../ui/checkbox';

const formSchema = z.object(
  {
    name: z.string().min(1),
    price: z.number(),
    isFeatured:  z.boolean(),
    isArchieved: z.boolean(),
    images: z.array(z.object({url: z.string()})),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
  }
);
type ProductFormValuesTS = z.infer<typeof formSchema>;

type AttrNameTypeTS = 'colorId' | 'categoryId' | 'sizeId';

const attrs: AttrNameTypeTS[] = ['colorId' , 'categoryId' , 'sizeId'];

interface OptionsFieldsPropTS {
  attrName: AttrNameTypeTS,
  name: string,
  dataList: Size[] | Category[] | Color[]
}

function getAtrributes(initialData: ProductToImagesTS | null){
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
          name: '',
          price: 10,
          isFeatured: true,
          isArchieved: true,
          images: [],
          colorId: '',
          sizeId: '',
          categoryId: ''
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
  };


  const IsFeaturedAndArchieved = () => {

    return (
      <>

      <Controller 
        name={'isFeatured'}
        control={form.control}
        render={
          ({field}) => (
            <FormItem className='flex items-center text-lg'>
              <FormLabel className='flex items-center gap-2'>
                <Checkbox checked={field.value} disabled={loading} onClick={(e)=> field.onChange(!field.value)}/>
                Featured
              </FormLabel>
            <FormMessage />
          </FormItem>
          )
        }
      />

      <Controller 
          name={'isArchieved'}
          control={form.control}
          render={
            ({field}) => (
              <FormItem className='flex items-center text-lg'>
                <FormLabel className='flex items-center gap-2'>
                  <Checkbox checked={field.value} disabled={loading} onClick={(e)=> field.onChange(!field.value)}/>
                  Archieved
                </FormLabel>
                <FormMessage />
              </FormItem>
            )
          }
      />

      </>
    )

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
            name={'images'}
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel> Background image </FormLabel>
                  <FormControl>
                    <ImagesUpload
                      
                      value={field?.value ? field.value : []}
                      disabled={loading}
                      onChange={items => field.onChange(items)}
                      onRemove={() => field.onChange([])}
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
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Product name' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> $ </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Product price"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <IsFeaturedAndArchieved />

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

          <button disabled={loading} type='submit' className='bg-zinc-700 rounded-xl p-2 text-sm font-semibold text-white '>{action}</button>
          {/* <Button disabled={loading} className='ml-auto' type='submit'> {action} </Button> */}
        </form>
      </Form>
    </>
  )
};

function ImagesUpload({disabled, onChange, onRemove, value}: ImagesUploadPropTS){

  const onUpload = (res: any) => {
    res?.info?.secure_url && onChange([...value, {url: res.info.secure_url}])
  };

  return (
    <FixHydration>
      <div className="image-upload">

        <div className="mb-4 flex items-center gap-4">
            {
                value.map( 
                    (item, ind) => (
                        <div key={`${item.url}-${ind}`} className="relative h-[200px] w-[200px] rounded-md overflow-hidden">
                            <div className="absolute top-2 right-2 z-10">
                                <Button type="button" onClick={() => onRemove(item.url)} variant={'destructive'} size={'icon'}>
                                    <Trash className="h-4 w-4"/>
                                </Button>
                            </div>

                            <Image fill className="object-cover" alt='Image' src={item.url} />
                        </div>
                    )
                )
            }
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='e9frcehh'>
          {
              ({open}: any) => {
                  const onClick = () => {
                      open()
                  };

                  return <Button type="button" disabled={disabled} variant={"secondary"} onClick={onClick}>
                      <ImagePlus className="h-4 w-4"/>
                      Upload an Image
                  </Button>
              }
          }
        </CldUploadWidget>
      </div>
    </FixHydration>
  )
}

export default ProductForm;