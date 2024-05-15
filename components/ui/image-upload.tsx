// Byimaan

'use client';

import FixHydration from "../utils/FixHydration";
import { ImageUploadPropTS } from "@/types/components/components";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from 'next-cloudinary'

const ImageUpload = ({disabled, onChange, onRemove, value}: ImageUploadPropTS) => {

    const onUpload = (res: any) => {
        res?.info?.secure_url && onChange(res.info.secure_url)
    }

    return (
        <FixHydration>
            <div className="image-upload">
                <div className="mb-4 flex items-center gap-4">
                    {
                        value.map( 
                            (url, ind) => (
                                <div key={`${url}-${ind}`} className="relative h-[200px] w-[200px] rounded-md overflow-hidden">
                                    <div className="absolute top-2 right-2 z-10">
                                        <Button type="button" onClick={() => onRemove(url)} variant={'destructive'} size={'icon'}>
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </div>

                                    <Image fill className="object-cover" alt='Image' src={url} />
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
};

export default ImageUpload;