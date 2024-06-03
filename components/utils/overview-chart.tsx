// Byimaan

'use client';

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

interface OverviewPropsTS {
    data: any[]
};

export const Overview: React.FC<OverviewPropsTS> = ({data}) => {

    return (
        <ResponsiveContainer width={'80%'} height={350}>

            <BarChart data={data}>
                <XAxis
                    dataKey={'name'}
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    dataKey={'total'}
                    axisLine={false}
                    tickFormatter={value => `$${value}`}
                />
                <Bar 
                    dataKey={'total'}
                    fill='#3498db'
                    radius={[4, 4, 0, 0]}
                    
                />
            </BarChart>

        </ResponsiveContainer>
    )
}