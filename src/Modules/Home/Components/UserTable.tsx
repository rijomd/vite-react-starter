
import { useMemo, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';

import { Table } from 'Components/Table/Table';
import { TypeActions } from 'Components/Table/Components/TableActions';

import { Employee } from '../Types/Types';
import { data } from '../Components/makeData';

export const UserTable = () => {
    const [tableData, setTableData] = useState<Employee[]>([]);
    const actions: TypeActions[] = [
        { name: 'Copy', onClick: () => { console.log("copy"); } },
        { name: 'Save' },
        { name: 'Print' },
        { name: 'Share' },
    ];

    const rowSelectionAction: TypeActions[] = [
        { name: 'Delete', color: 'error' }
    ];

    const columns = useMemo<MRT_ColumnDef<Employee>[]>(
        () => [
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                id: 'name',
                header: 'Name',
                size: 250,
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt="avatar"
                            height={30}
                            src={row.original.avatar}
                            loading="lazy"
                            style={{ borderRadius: '50%' }}
                        />
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: 'email',
                enableClickToCopy: true,
                filterVariant: 'autocomplete',
                header: 'Email',
                size: 300,
            },
            {
                accessorKey: 'salary',
                filterFn: 'between',
                header: 'Salary',
                size: 200,
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={(theme) => ({
                            backgroundColor:
                                cell.getValue<number>() < 50_000
                                    ? theme.palette.error.dark
                                    : cell.getValue<number>() >= 50_000 &&
                                        cell.getValue<number>() < 75_000
                                        ? theme.palette.warning.dark
                                        : theme.palette.success.dark,
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue<number>()?.toLocaleString?.('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>
                ),
            },
            {
                accessorKey: 'jobTitle',
                header: 'Job Title',
                size: 350,
            },
            {
                accessorFn: (row) => new Date(row.startDate),
                id: 'startDate',
                header: 'Start Date',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
                Header: ({ column }) => <em>{column.columnDef.header}</em>,
                muiFilterTextFieldProps: {
                    sx: {
                        minWidth: '250px',
                    },
                },
            },
        ],
        [],);

    useEffect(() => {
        setTableData(data);
        return () => { }
    }, [data])

    const getRowSelected = (name: string, data: any[]) => {
        console.log(name, data);
    }

    const renderDetailPanel = (row: any) => {
        return <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-around',
                left: '30px',
                maxWidth: '1000px',
                position: 'sticky',
                width: '100%',
            }}
        >
            <img
                alt="avatar"
                height={100}
                src={row.avatar}
                loading="lazy"
                style={{ borderRadius: '50%' }}
            />
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">Signature Catch Phrase:</Typography>
                <Typography variant="h1">&quot;{row.signatureCatchPhrase}&quot;</Typography>
            </Box>
        </Box>
    }

    return (
        <>
            <Table
                columns={columns}
                data={tableData}
                actions={actions}
                rowSelectionAction={rowSelectionAction}
                enableRowSelection={false}
                enableExpanding={true}
                getRowSelected={getRowSelected}
                renderDetailPanel={renderDetailPanel}
            />
        </>
    )
}


