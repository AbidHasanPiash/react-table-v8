'use client'
import { useMemo, useState } from 'react';
import PERSON from '@/data/PERSON.json'
import { COLUMN, GROUPED_COLUMN } from './Columns'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function ExpandRowTable() {

    const columns = useMemo(() => COLUMN, []);
    const data = useMemo(() => PERSON, []);

    const [expanded, setExpanded] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        debugTable: true,
    });

    return (
        <div className=''>
            <table className='table-auto border-collapse w-full'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-300/50">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan} className="px-4 py-2 text-left">
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-t border-gray-200 hover:bg-blue-300/30 even:bg-gray-50/30">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 text-left">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2 p-4">
                <button
                    title='Start'
                    className="border rounded-lg px-2 py-1.5 hover:text-sky-400 cursor-pointer bg-gray-200 hover:border-sky-400"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span><HiChevronDoubleLeft /></span>
                </button>
                <button
                    title='Previous'
                    className="border rounded-lg px-2 py-1.5 hover:text-sky-400 cursor-pointer bg-gray-200 hover:border-sky-400"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span><HiChevronLeft/></span>
                </button>
                <button
                    title='Next'
                    className="border rounded-lg px-2 py-1.5 hover:text-sky-400 cursor-pointer bg-gray-200 hover:border-sky-400"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span><HiChevronRight/></span>
                </button>
                <button
                    title='End'
                    className="border rounded-lg px-2 py-1.5 hover:text-sky-400 cursor-pointer bg-gray-200 hover:border-sky-400"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <span><HiChevronDoubleRight/></span>
                </button>
                <span className="flex items-center gap-1 border rounded-lg px-2 py-0.5 bg-gray-200 hover:border-sky-400">
                    <span>Page</span>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                    <span> | Go to page:</span>
                </span>
                <span className="flex items-center gap-1">
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="w-16 border rounded-lg px-2 py-0.5 hover:text-sky-400 cursor-pointer bg-gray-200 hover:border-sky-400"
                    />
                </span>
                <select
                    className='border rounded-lg px-2 py-1 cursor-pointer bg-gray-200 hover:border-sky-400'
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className='p-4 text-white'>
                <div>{table.getRowModel().rows.length} Rows</div>
                <label>Expanded State:</label>
                <pre>{JSON.stringify(expanded, null, 2)}</pre>
                <label>Row Selection State:</label>
                <pre>
                    {JSON.stringify(table.getState().rowSelection, null, 2)}
                </pre>
            </div>
        </div>
    );
}

function Filter({ column, table }) {
    const firstValue =
        table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue || [])[0] ?? ''}
                onChange={(e) =>
                    column.setFilterValue((old) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 text-sm border rounded-lg px-2 py-1 placeholder:font-thin placeholder:text-gray-700 outline-none bg-gray-200/50 hover:border-sky-400"
            />
            <input
                type="number"
                value={(columnFilterValue || [])[1] ?? ''}
                onChange={(e) =>
                    column.setFilterValue((old) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 text-sm border rounded-lg px-2 py-1 placeholder:font-thin placeholder:text-gray-700 outline-none bg-gray-200/50 hover:border-sky-400"
            />
        </div>
    ) : (
        <input
            type="text"
            value={columnFilterValue || ''}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 text-sm border rounded-lg px-2 py-1 placeholder:font-thin placeholder:text-gray-700 outline-none bg-gray-200/50 hover:border-sky-400"
        />
    );
}
