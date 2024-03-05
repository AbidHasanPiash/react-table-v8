import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
import { useEffect, useRef } from "react";

export const COLUMN = [
    {
        accessorKey: 'firstName',
        header: ({ table }) => (
            <div className="flex items-center space-x-2 h-8">
                <IndeterminateCheckbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
                <button onClick={table.getToggleAllRowsExpandedHandler()}>
                    {table.getIsAllRowsExpanded() 
                    ? <span className="p-0.5 rounded-full h-5 w-5 flex items-center justify-center hover:bg-blue-300"><HiOutlineChevronDown/></span> 
                    : <span className="p-0.5 rounded-full h-5 w-5 flex items-center justify-center hover:bg-blue-300"><HiOutlineChevronRight/></span> }
                </button>
                <span>First Name</span>
            </div>
        ),
        cell: ({ row, getValue }) => (
            <div
                className="flex items-center space-x-2 h-6"
                style={{
                // Since rows are flattened by default,
                // we can use the row.depth property
                // and paddingLeft to visually indicate the depth
                // of the row
                paddingLeft: `${row.depth * 2}rem`,
                }}
            >
                <IndeterminateCheckbox
                    checked={row.getIsSelected()}
                    indeterminate={row.getIsSomeSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
                {row.getCanExpand() ? (
                    <button onClick={row.getToggleExpandedHandler()} className="">
                        {row.getIsExpanded() 
                        ? <span className="p-0.5 rounded-full h-5 w-5 flex items-center justify-center hover:bg-blue-100"><HiOutlineChevronDown/></span> 
                        : <span className="p-0.5 rounded-full h-5 w-5 flex items-center justify-center hover:bg-blue-100"><HiOutlineChevronRight/></span> }
                    </button>
                ) : (
                    <span>🔵</span>
                )}
                <span>{getValue()}</span>
            </div>
        ),
        footer: (props) => props.column.id,
    },
    {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
    },
    {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
    },
    {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
    },
]

export const GROUPED_COLUMN = [
    {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: 'firstName',
                header: ({ table }) => (
                    <>
                        <IndeterminateCheckbox
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                        />{' '}
                        <button
                            onClick={table.getToggleAllRowsExpandedHandler()}
                        >
                            {table.getIsAllRowsExpanded() ? '👇' : '👉'}
                        </button>{' '}
                        First Name
                    </>
                ),
                cell: ({ row, getValue }) => (
                    <div>
                        <>
                            <IndeterminateCheckbox
                                checked={row.getIsSelected()}
                                indeterminate={row.getIsSomeSelected()}
                                onChange={row.getToggleSelectedHandler()}
                            />{' '}
                            {row.getCanExpand() ? (
                                <button onClick={row.getToggleExpandedHandler()}>
                                    {row.getIsExpanded() ? '👇' : '👉'}
                                </button>
                            ) : (
                                '🔵'
                            )}{' '}
                            {getValue()}
                        </>
                    </div>
                ),
                footer: (props) => props.column.id,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id,
            },
        ],
    },
    {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: 'age',
                header: () => 'Age',
                footer: (props) => props.column.id,
            },
            {
                header: 'More Info',
                columns: [
                    {
                        accessorKey: 'visits',
                        header: () => <span>Visits</span>,
                        footer: (props) => props.column.id,
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        footer: (props) => props.column.id,
                    },
                    {
                        accessorKey: 'progress',
                        header: 'Profile Progress',
                        footer: (props) => props.column.id,
                    },
                ],
            },
        ],
    },
]

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}) {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    );
}
