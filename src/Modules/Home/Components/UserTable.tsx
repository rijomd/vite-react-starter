
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { type MRT_ColumnDef, MRT_RowData } from 'material-react-table';

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

import { Table } from 'Components/Table/Table';
import { TypeActions } from 'Components/Table/Components/TableActions';
import { TypeRowActions } from 'Components/Table/Components/MenuActions';
import { TypeHeaderDetails } from 'Components/Table/Components/HideColumns';

import { Employee } from '../Types/Types';
import { data } from '../Components/makeData';

export const MemorizedUserTable = ({ openAddForm }: { openAddForm: () => void }) => {
    const [tableData, setTableData] = useState<Employee[]>([]);
    const [hideFields, setHideFields] = useState<any>({});

    const actions = useMemo<TypeActions[]>(() => [
        { name: 'Add', onClick: () => { openAddForm() }, icon: <EditIcon /> },
        { name: 'Save', color: 'success' },
    ], [])

    const rowSelectionAction = useMemo<TypeActions[]>(() => [
        { name: 'Delete', color: 'error', icon: <DeleteIcon /> }
    ], [])

    const rowActions = useMemo<TypeRowActions[]>(() => [
        { name: 'Edit', icon: <EditIcon color='primary' />, label: 'Edit' },
        { name: 'Delete', icon: <DeleteIcon color='error' />, label: 'Delete' }
    ], [])

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
                accessorFn: (row) => row.startDate ? new Date(row.startDate) : "-",
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
    const exportOptionsField = ['firstName', 'email', 'jobTitle']

    const hideColumnsActions = useCallback((name: string, value: boolean) => {
        if (value) {
            setHideFields({ ...hideFields, [name]: false });
        }
        else {
            if (Object.keys(hideFields)?.length > 0) {
                delete hideFields[name];
                setHideFields({ ...hideFields });
            }
        }
    }, [Object.keys(hideFields)?.length]);

    const hideColumns = useMemo<TypeHeaderDetails[]>(() => [
        {
            name: 'jobTitle', label: 'Job Title', checked: (hideFields?.jobTitle === false),
            onChange: (value: boolean) => { hideColumnsActions('jobTitle', value) }
        },
        {
            name: 'email', label: 'Email', checked: (hideFields?.email === false),
            onChange: (value: boolean) => { hideColumnsActions('email', value) }
        },
        {
            name: 'startDate', label: 'Date', checked: (hideFields?.startDate === false),
            onChange: (value: boolean) => { hideColumnsActions('startDate', value) }
        }
    ], [Object.keys(hideFields)?.length]);

    const renderExpandPanel = useCallback(
        (row: any) => {
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
        }, [],)

    useEffect(() => {
        setTableData(data);
        return () => { }
    }, [])

    const getRowSelected = (name: string, data: MRT_RowData[]) => {
        console.log(name, data);
    }

    const getRowActions = (name: string, data: MRT_RowData) => {
        console.log(name, data);
    }

    return (
        <>
            <Table
                columns={columns}
                data={tableData}
                actions={actions}
                rowSelectionAction={rowSelectionAction}
                rowActions={rowActions}
                enableRowSelection={true}
                enableExpanding={true}
                getRowSelected={getRowSelected}
                renderExpandPanel={renderExpandPanel}
                getRowActions={getRowActions}
                hideColumns={hideColumns}
                hideFields={hideFields}
                exportOptionsField={exportOptionsField}
                isEnableExportFileName='employee'
            />
        </>
    )
}

export const UserTable = React.memo(MemorizedUserTable);