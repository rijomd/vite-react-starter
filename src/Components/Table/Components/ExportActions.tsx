import React from 'react';
import { Box, Menu, ListItemIcon, Typography, List, ListItemButton, ListItemText, Collapse, MenuList, Divider } from '@mui/material';

import { mkConfig, generateCsv, download } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AdjustIcon from '@mui/icons-material/Adjust';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import { FormButtonField } from 'Components/FormElements';
import { useNotify } from 'Services/Hook/useNotify';

type Props = {
    exportData: any;
    exportOptionsField: string[];
    isEnableExportFileName: string;
}

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const MemorizedExportActions = ({ exportData, exportOptionsField, isEnableExportFileName = "table" }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openExport, setOpenExport] = React.useState(false);
    const [openPdf, setOpenPdf] = React.useState(false);

    const open = Boolean(anchorEl);
    const pdfOptions = ['Export all data', 'Export screen data', 'Export selected data'];
    const exportOptions = ['Export all data', 'Export screen data', 'Export selected data'];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toCsv = (rowData: any[]) => {
        let extractedData = rowData;
        if (exportOptionsField?.length > 0) {
            extractedData = rowData.map((item: any) => {
                return exportOptionsField.reduce((acc: any, key) => {
                    if (item[key] !== undefined) {
                        acc[key] = item[key];
                    }
                    return acc;
                }, {});
            });
        }
        const csv = generateCsv(csvConfig)(extractedData);
        download(csvConfig)(csv);
    }

    const toPdf = (rowData: any[]) => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [exportOptionsField] || [Object.keys(rowData[0])],
            body: rowData,
        });
        doc.save(`${isEnableExportFileName}.pdf`);
    }

    const onExport = (name: string, type: string) => {
        try {
            let rows = [];
            switch (name) {
                case 'Export all data':
                    rows = exportData?.getPrePaginationRowModel()?.rows;
                    break;
                case 'Export screen data':
                    rows = exportData?.getRowModel()?.rows;
                    break;
                case 'Export selected data':
                    rows = exportData?.getSelectedRowModel()?.rows;
                    break;
                default:
                    rows = [];
            }
            let rowData = type === 'export' ? rows.map((row: any) => row.original) : rows.map((row: any) => Object.values(row.original));

            if (rowData?.length > 0) {
                if (type === 'export') { toCsv(rowData); }
                else { toPdf(rowData); }
            }
            else {
                useNotify("Please select any data", 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <FormButtonField onClick={handleClick} sx={{ width: 65, height: 35, alignItems: 'center' }} label='More' >
                <ExpandMoreIcon />
            </FormButtonField>
            <Menu
                id="export-actions"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuList
                    component="nav"
                    aria-labelledby="Export table data"
                    subheader={
                        <Box sx={{ display: 'block', textAlign: 'center', padding: '6px 16px' }}>
                            <Typography variant="h5" sx={{ paddingBottom: '8px' }} noWrap>Export table data</Typography>
                            <Divider />
                        </Box>
                    }
                >
                    <ListItemButton onClick={() => setOpenExport(!openExport)}>
                        <ListItemIcon>
                            <AdjustIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary="Export to csv" />
                        {openExport ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openExport} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {exportOptions.map((item: string) => (
                                <ListItemButton key={item} sx={{ pl: 4 }} onClick={() => onExport(item, 'export')}>
                                    <ListItemIcon>
                                        <DownloadForOfflineIcon color='secondary' />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => setOpenPdf(!openPdf)}>
                        <ListItemIcon>
                            <AdjustIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary="Export to pdf" />
                        {openPdf ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPdf} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {pdfOptions.map((item: string) => (
                                <ListItemButton key={item} sx={{ pl: 4 }} onClick={() => onExport(item, 'pdf')}>
                                    <ListItemIcon>
                                        <DownloadForOfflineIcon color='secondary' />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>

                </MenuList>
            </Menu >
        </ >
    )
}
export const ExportActions = React.memo(MemorizedExportActions);
