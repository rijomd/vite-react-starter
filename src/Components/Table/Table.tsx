import { ReactNode, useMemo, useEffect, useState } from 'react';
import {
    MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MRT_RowData, MRT_ToggleDensePaddingButton
} from 'material-react-table';
import { Box, lighten, useTheme, } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { TableActions, TypeActions } from './Components/TableActions';
import { MenuActions, TypeRowActions } from './Components/MenuActions';
import { HideColumns, TypeHeaderDetails } from './Components/HideColumns';
import { ExportActions } from './Components/ExportActions';

import { useMobile } from 'Services/Hook/Hook';

type TypeTable = {
    columns: any;
    data: any;
    actions?: TypeActions[];
    rowSelectionAction?: TypeActions[];
    rowActions?: TypeRowActions[];
    enableRowSelection?: boolean;
    enableExpanding?: boolean;
    getRowSelected?: (name: string, items: MRT_RowData[]) => void;
    renderExpandPanel?: (data: any) => ReactNode | undefined;
    getRowActions?: (name: string, item: MRT_RowData) => void;
    hideColumns?: TypeHeaderDetails[];
    hideFields?: any;
    isEnableExportFileName?: string;
    exportOptionsField?: string[];
}

export const Table = (props: TypeTable) => {
    const { columns = [], data = [], actions = [], rowSelectionAction = [], rowActions = [], enableRowSelection = false,
        enableExpanding = false, getRowActions = undefined, getRowSelected = () => { }, renderExpandPanel = undefined,
        hideColumns = [], hideFields = {}, isEnableExportFileName, exportOptionsField = [] } = props;

    const theme = useTheme();
    const isMobile = useMobile();

    const [columnVisibility, setColumnVisibility] = useState(hideFields);
    const baseBackgroundColor = theme.palette.mode === 'dark' ? 'rgba(3, 44, 43, 1)' : theme.palette.secondary.light;

    useEffect(() => {
        setColumnVisibility(hideFields);
    }, [Object.keys(hideFields)?.length]);

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableExpanding: enableExpanding,
        enableRowSelection: enableRowSelection,
        enableRowActions: getRowActions !== undefined || typeof getRowActions === 'function',
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableColumnResizing: true,
        enableColumnDragging: true,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            density: 'compact',
            columnPinning: {
                right: ['mrt-row-actions'],
            },
        },
        enableHiding: true,
        state: { columnVisibility }, //manage columnVisibility state
        onColumnVisibilityChange: setColumnVisibility,
        paginationDisplayMode: isMobile ? 'default' : 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
            color: 'secondary',
            sx: { background: '#fff' }
        },
        muiPaginationProps: {
            SelectProps: { sx: {} },
            color: 'secondary',
            rowsPerPageOptions: [5, 10, 20, 30, 50, 75, 100],
            shape: 'circular',
            variant: 'outlined',
        },
        renderDetailPanel: enableExpanding && renderExpandPanel ? ({ row }) => { return renderExpandPanel(row.original) } : undefined,
        renderRowActions: ({ row }) => {
            if (getRowActions && rowActions?.length > 0) {
                const MemorizedMenuAction = useMemo(() => (
                    <MenuActions
                        onClick={(name) => getRowActions(name, row.original)}
                        rowActions={rowActions}
                    />
                ), [row.original]);
                return MemorizedMenuAction;
            }
        },
        renderTopToolbar: ({ table }) => {
            let selectedRows: any[] = [];
            if (table.getIsSomeRowsSelected() && enableRowSelection) {
                table.getSelectedRowModel().flatRows.map((row) => {
                    selectedRows.push(row.original)
                });
            }

            const MemorizedTableAction = useMemo(() => (
                <TableActions
                    direction={isMobile ? 'right' : 'left'}
                    onClick={(name) => getRowSelected(name, selectedRows)}
                    actions={enableRowSelection ? [...actions, ...rowSelectionAction] : actions}
                />
            ), []);

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
                    {!isMobile && <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_ToggleDensePaddingButton table={table} />
                    </Box>}

                    {(actions?.length > 0 && isMobile) && MemorizedTableAction}

                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {(actions?.length > 0 && !isMobile) && MemorizedTableAction}
                        {(hideColumns?.length > 0 && !isMobile) && <HideColumns headerDetails={hideColumns} />}
                        {(isEnableExportFileName && !isMobile) && <ExportActions exportData={table} exportOptionsField={exportOptionsField} isEnableExportFileName={isEnableExportFileName} />}
                    </Box>
                </Box>
            );
        },
        // style for selected row background color
        muiTableBodyProps: {
            sx: () => ({
                '& .MuiTableRow-root.Mui-selected, & tr[data-selected="true"]': {
                    '& td': {
                        backgroundColor: baseBackgroundColor,
                        '&:after': {
                            backgroundColor: baseBackgroundColor,
                        },
                    },
                },
            }),
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