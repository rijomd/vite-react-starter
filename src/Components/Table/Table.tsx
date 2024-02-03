import { ReactNode } from 'react';
import {
    MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton,
} from 'material-react-table';

import { Box, ListItemIcon, MenuItem, lighten, } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { TableActions, TypeActions } from './Components/TableActions';

type TypeTable = {
    columns: any;
    data: any;
    actions?: TypeActions[];
    rowSelectionAction?: TypeActions[];
    enableRowSelection?: boolean;
    enableExpanding?: boolean;
    getRowSelected?: (name: string, items: any[]) => void;
    renderDetailPanel?: (data: any) => ReactNode | undefined;
}

export const Table = (props: TypeTable) => {
    const { columns = [], data = [], actions = [], rowSelectionAction = [], enableRowSelection = false,
        enableExpanding = false, getRowSelected = () => { }, renderDetailPanel = undefined } = props;


    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableExpanding: enableExpanding,
        enableRowSelection: enableRowSelection,
        enableRowActions: true,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableColumnResizing: true,
        enableColumnDragging: true,
        initialState: {
            showColumnFilters: true,
            showGlobalFilter: true,
            columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions'],
            },
        },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
            color: 'secondary'
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30, 50],
            shape: 'rounded',
            variant: 'outlined',
        },
        renderDetailPanel: enableExpanding && renderDetailPanel ? ({ row }) => { return renderDetailPanel(row.original) } : undefined,
        renderRowActionMenuItems: ({ closeMenu }) => [
            <MenuItem
                key={0}
                onClick={
                    () => {
                        // View profile logic...
                        closeMenu();
                    }
                }
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                View Profile
            </MenuItem >,
            <MenuItem
                key={1}
                onClick={() => {
                    // Send email logic...
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                Send Email
            </MenuItem>,
        ],
        renderTopToolbar: ({ table }) => {
            let selectedRows: any[] = [];
            if (table.getIsSomeRowsSelected() && enableRowSelection) {
                table.getSelectedRowModel().flatRows.map((row) => {
                    selectedRows.push(row.original)
                });
            }

            return (
                <Box
                    sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: 'flex',
                        gap: '0.5rem',
                        p: '8px',
                        justifyContent: 'space-between',
                    })}
                >
                    {/* import MRT sub-components */}
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                        {/* table common  actions */}
                        {actions?.length > 0 && <TableActions
                            onClick={(name) => getRowSelected(name, selectedRows)}
                            actions={enableRowSelection ? [...actions, ...rowSelectionAction] : actions}
                        />}
                    </Box>
                </Box>
            );
        },
    });

    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <MaterialReactTable table={table} />
    </LocalizationProvider>)

};


// const keys = [
//     'id',  // {id is still required when using accessorFn instead of accessorKey}   {string}
//     'accessorKey', // {related key value from data}  {string}
//     'accessorFn', // {instead of accessorKey shows as customized component function :- accessorFn: (row) => `${row.firstName} ${row.lastName}`}   {function}
//     'header',// {header name }   {string}
//     'size', // {length of cell : eg:250}   {number}
//     'Cell', // {customized as component :-    Cell: ({ renderedCellValue, row }) => (<Sample name={row.name}/> )}   {function}
//     'enableClickToCopy',  //  {boolean} ,
//     'filterVariant', // { "autocomplete" | "checkbox" | "date" | "date-range" | "datetime" | "datetime-range" |
//     //  "multi-select" | "range" | "range-slider" | "select" | "text" | "time" | "time-range" | undefined }
//     'filterFn', //   { filterVariant: 'range', if not using filter modes feature, use this instead of filterFn}
//     'sortingFn',//    {'datetime' or undefined,}
//     'Header' // {({ column }) => <em>{column.columnDef.header}</em>, //custom header styling}
// ]


// Properties :-
// enableRowSelection =  (row) => row.original.age > 18 || boolean