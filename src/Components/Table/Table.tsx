import {
    MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton,
} from 'material-react-table';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Box, Button, ListItemIcon, MenuItem, Typography, lighten, } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { TableActions, TypeActions } from './Components/TableActions';

import { data } from '../../Modules/Home/Components/makeData';


const keys = [
    'id',  // {id is still required when using accessorFn instead of accessorKey}   {string}
    'accessorKey', // {related key value from data}  {string}
    'accessorFn', // {instead of accessorKey shows as customized component function :- accessorFn: (row) => `${row.firstName} ${row.lastName}`}   {function}
    'header',// {header name }   {string}
    'size', // {length of cell : eg:250}   {number}
    'Cell', // {customized as component :-    Cell: ({ renderedCellValue, row }) => (<Sample name={row.name}/> )}   {function}
    'enableClickToCopy',  //  {boolean} ,
    'filterVariant', // { "autocomplete" | "checkbox" | "date" | "date-range" | "datetime" | "datetime-range" |
    //  "multi-select" | "range" | "range-slider" | "select" | "text" | "time" | "time-range" | undefined }
    'filterFn', //   { filterVariant: 'range', if not using filter modes feature, use this instead of filterFn}
    'sortingFn',//    {'datetime' or undefined,}
    'Header' // {({ column }) => <em>{column.columnDef.header}</em>, //custom header styling}
]

const actions: TypeActions[] = [
    { name: 'Copy' },
    { name: 'Save' },
    { name: 'Print' },
    { name: 'Share' },
];

type TypeTable = {
    columns: any
}

const Table = ({ columns }: TypeTable) => {

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        enableRowSelection: true,
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
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
        },
        renderDetailPanel: ({ row }) => (
            <Box
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
                    height={200}
                    src={row.original.avatar}
                    loading="lazy"
                    style={{ borderRadius: '50%' }}
                />
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">Signature Catch Phrase:</Typography>
                    <Typography variant="h1">
                        &quot;{row.original.signatureCatchPhrase}&quot;
                    </Typography>
                </Box>
            </Box>
        ),
        renderRowActionMenuItems: ({ closeMenu }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    // View profile logic...
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                View Profile
            </MenuItem>,
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
            const handleDeactivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                    alert('deactivating ' + row.getValue('name'));
                });
            };

            const handleActivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                    alert('activating ' + row.getValue('name'));
                });
            };

            const handleContact = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                    alert('contact ' + row.getValue('name'));
                });
            };

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
                    {/* table actions */}
                    <Box>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                color="error"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleDeactivate}
                                variant="contained"
                            >
                                Deactivate
                            </Button>
                            <Button
                                color="success"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleActivate}
                                variant="contained"
                            >
                                Activate
                            </Button>
                            <Button
                                color="info"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleContact}
                                variant="contained"
                            >
                                Contact
                            </Button>
                        </Box>
                    </Box>
                </Box>
            );
        },
    });

    return (
        <PerfectScrollbar  >
            <MaterialReactTable table={table} />
        </PerfectScrollbar>
    )

};


const ExampleWithLocalizationProvider = ({ columns }: TypeTable) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Table columns={columns} />
    </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;