import React, { ReactNode } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { config } from "Services/Config/Config";

export type TypeActions = {
    disable?: boolean;
    icon?: any;
    name: string;
    color?: 'error' | 'success' | 'secondary' | 'primary' | 'warning' | 'info';
    onClick?: () => void;
}

type TypeTableActions = {
    direction?: 'up' | 'right' | 'down' | 'left';
    hidden?: boolean;
    onClick?: (data: string) => void;
    actions?: TypeActions[],
    icon?: ReactNode
}

const MemorizedTableActions = ({ direction = 'left', hidden = false, onClick = () => { }, actions = [], icon }: TypeTableActions) => {
    const theme = useTheme();
    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'relative',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            right: theme.spacing(1),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    }));

    return (
        <>
            <StyledSpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{
                    '& .MuiFab-primary':
                    {
                        width: 65, height: 35,
                        '& .MuiSpeedDialIcon-icon': { fontSize: 20 }, borderRadius: `${config.borderRadius}px`, backgroundColor: theme.palette.secondary.dark
                    },
                }}
                icon={icon ? icon : <SpeedDialIcon openIcon={<EditIcon />} />}
                direction={direction}
                hidden={hidden}
            >
                {actions?.length > 0 && actions.map((action: TypeActions, key: number) => (
                    <SpeedDialAction
                        key={key}
                        icon={action?.icon || <SaveIcon />}
                        tooltipTitle={action.name}
                        disableHoverListener={action?.disable}
                        onClick={(e) => {
                            if (action?.disable === true) { e.stopPropagation(); }
                            else {
                                if (action?.onClick) { action?.onClick() }
                                else { action.name !== undefined && onClick(action.name); }
                            }
                        }}
                        sx={{
                            width: 50, height: 35, borderRadius: "2%", boxShadow: 'none',
                            background: theme.palette.secondary.light, color: theme.palette?.[action.color || "secondary"].dark
                        }}
                    />
                ))}
            </StyledSpeedDial>
        </>
    )
}

export const TableActions = React.memo(MemorizedTableActions);
