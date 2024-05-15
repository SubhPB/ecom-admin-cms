// Byimaan
"use client";
import React, {useEffect, useState} from 'react';
import { FixHydrationPropTS } from '@/types/components/components';

function FixHydration({children}:FixHydrationPropTS) {

    const [serverRendering, setServerRendering] = useState(true);

    useEffect(
        () => {
            setServerRendering(false);
        }, []
    );

    if (serverRendering) return null;

    return (
        <>
        {children}
        </>
    )
};

export default FixHydration;