// Byimaan

"use client";
import React from "react";

export const useOrigin = () => {

    const [origin, setOrigin] = React.useState('')

    React.useEffect(
        () => {
            if (window?.location?.origin) setOrigin(window.location.origin)
        }, []
    );
    return origin;
}