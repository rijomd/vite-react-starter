import React from 'react';
import { Box, Menu, MenuItem, MenuList, Typography, Divider } from '@mui/material';

import { List as ListIcon } from '@mui/icons-material';
import { FormButtonField, FormCheckBoxField } from 'Components/FormElements';

export type TypeHeaderDetails = {
    name: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    onChange: (data: boolean) => void
}

type TypeHideColumns = {
    headerDetails: TypeHeaderDetails[];
}

const MemorizedHideColumns = ({ headerDetails = [] }: TypeHideColumns) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <FormButtonField onClick={handleClick} sx={{ width: 65, height: 35, alignItems: 'center' }} label='Hide Columns'>
                <ListIcon />
            </FormButtonField>
            <Menu
                id="hide-columns"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuList >
                    <Box sx={{ display: 'block', textAlign: 'center', padding: '0px 16px' }}>
                        <Typography variant="h5" noWrap>Hide columns</Typography>
                        <Typography variant="h6" color='grey' sx={{ paddingBottom: '8px', fontSize: 10 }} >
                            Selected columns will be <br />
                            invisible in your list
                        </Typography>
                    </Box>
                    <Divider />
                    {headerDetails?.length > 0 && headerDetails.map((action: TypeHeaderDetails, key: number) => (
                        <MenuItem key={key}>
                            <FormCheckBoxField
                                label={action?.label}
                                name={action?.name || action?.label}
                                disabled={action.disabled}
                                checked={action?.checked}
                                onChange={(e) => action.onChange(e.target.checked)}
                                isSmallIcon
                            />
                        </MenuItem>))}
                </MenuList>
            </Menu>
        </ >
    )
}

export const HideColumns = React.memo(MemorizedHideColumns);