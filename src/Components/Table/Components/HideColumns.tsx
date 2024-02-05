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

export const MemorizedHideColumns = ({ headerDetails = [] }: TypeHideColumns) => {

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
            <FormButtonField onClick={handleClick} sx={{ width: 65, height: 35, alignItems: 'center' }} >
                <ListIcon />
            </FormButtonField>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button', }}
            >
                <MenuList onClick={handleClose}>
                    <MenuItem >
                        <Typography variant="h6" noWrap>Hide columns</Typography>
                    </MenuItem>
                    <Divider />
                    {headerDetails?.length > 0 && headerDetails.map((action: TypeHeaderDetails, key: number) => (
                        <MenuItem key={key}>
                            <FormCheckBoxField label={action?.label} disabled={action.disabled} onChange={(e) => action.onChange(e.target.checked)} />
                        </MenuItem>))}
                </MenuList>
            </Menu>
        </ >
    )
}

export const HideColumns = React.memo(MemorizedHideColumns);