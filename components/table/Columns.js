export const COLUMN = [
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
        disableFilters: true
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Gender',
        Footer: 'Gender',
        accessor: 'gender'
    },
]

export const GROUPED_COLUMN = [
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name'
            },
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Email',
                Footer: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Gender',
                Footer: 'Gender',
                accessor: 'gender'
            },
        ]
    }
]