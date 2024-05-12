// Byimaan

import React, {useEffect, useState} from 'react';
import { LayoutPropTS } from '@/types/components/components';

function FixHydration({children}: LayoutPropTS) {

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