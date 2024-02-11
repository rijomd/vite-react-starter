import React from 'react';
import { Box, Menu, MenuItem, IconButton, ButtonGroup, Button, Typography } from '@mui/material';

import { List as ListIcon } from '@mui/icons-material';

export type TypeRowActions = {
    disable?: boolean;
    icon?: any;
    name: string;
    onClick?: () => void;
    label: string;
}

type TypeMenuActions = {
    onClick?: (data: string) => void;
    rowActions?: TypeRowActions[],
}


const MemorizedMenuActions = ({ onClick = () => { }, rowActions = [], }: TypeMenuActions) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '4px' }}>
            <IconButton onClick={handleClick} >
                <ListIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button', }}
            >
                <MenuItem onClick={handleClose}>
                    <ButtonGroup color='secondary'>
                        {rowActions?.length > 0 && rowActions.map((action: TypeRowActions, key: number) => (
                            <Button key={key}
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    if (action?.disable === true) { e.stopPropagation(); }
                                    else {
                                        if (action?.onClick) { action?.onClick() }
                                        else { action.name !== undefined && onClick(action.name); }
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    {action?.icon}
                                    <Typography variant='subtitle1'> {action?.label}</Typography>
                                </Box>
                            </Button  >))}
                    </ButtonGroup>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export const MenuActions = React.memo(MemorizedMenuActions);
