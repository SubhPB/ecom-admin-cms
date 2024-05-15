// Byimaan

'use client';
import React from 'react';
import { BillboardColumnTS } from '@/types/objects/objs';
import { ColumnDef } from "@tanstack/react-table";
import CellAction from './CellAction';

export const columns: ColumnDef<BillboardColumnTS>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: 'actions',
    header: "Actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]


function Columns() {
  return (
    <div>columns</div>
  )
}

export default Columns