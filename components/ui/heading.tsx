// Byimaan

import { HeadingPropTS } from "@/types/components/components";

import React from 'react'

function Heading({title, description}: HeadingPropTS) {
  return (
    <div>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">
            {description}
        </p>
    </div>
  )
}

export default Heading