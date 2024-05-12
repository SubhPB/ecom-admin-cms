// Byimaan - 1:19:28

"use client";

import { useStoreModal } from "@/utils/hooks/use-store-modal";
import { UIModal } from "../ui/modal";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

import {p} from '@/utils/functions/func';
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object(
    {
        name: z.string().min(1),
    }
);

type formStateTypeTS = z.infer<typeof formSchema>

export const StoreModal = () => {

    const {isOpen, onOpen} = useStoreModal();
    const form = useForm<formStateTypeTS>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values: formStateTypeTS) => {
        p("Form submitted!...")
        p(values);
    };

    return (
        <UIModal
            title="Create store"
            description="Add new store to manage products and categories"
            isOpen={isOpen}
            onClose={onOpen}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="name" 
                            render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="E-Commerce" {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end">
                            <Button variant={"outline"} onClick={ useStoreModal().onClose }>
                                Cancel
                            </Button>

                            {/* This button will run the onSubmit prop that was given above! */}
                            <Button type='submit'>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </UIModal>
    )
}