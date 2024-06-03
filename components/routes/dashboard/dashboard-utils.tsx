// Byimaan

import React from "react";

type DataBoxTS = {
    title: string;
    data: string
}

export const DataBox = ({title, data}: DataBoxTS) => {

    return (
        <div className="data-box w-[45%] flex-shrink-0 md:w-[40%] lg:w-[30%] p-3  space-y-1 border-black border-[1px] rounded-lg">
            <h2 className="font-semibold line-clamp-1 text-ellipsis">{title}</h2>
            <h2 className="text-lg font-bold line-clamp-2 text-ellipsis">{data}</h2>
        </div>
    )
};