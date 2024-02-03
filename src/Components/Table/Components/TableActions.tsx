import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
    actions?: TypeActions[]
}

export const TableActions = ({ direction = 'left', hidden = false, onClick = () => { }, actions = [] }: TypeTableActions) => {
    const theme = useTheme();

    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'absolute',
        top: '10%',
        right: 0,
        transform: 'translateY(-50%)',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    }));

    return (
        <>
            {/* <Box sx={{ transform: 'translateZ(0px)', position: 'relative', height: 320 }}> */}
            <StyledSpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{
                    '& .MuiFab-primary':
                    {
                        width: 45, height: 45,
                        '& .MuiSpeedDialIcon-icon': { fontSize: 20 }, borderRadius: "2%", backgroundColor: theme.palette.secondary.dark
                    },
                    height: "45px",
                }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                direction={direction}
                hidden={hidden}
            >
                {actions?.length > 0 && actions.map((action: TypeActions, key: number) => (
                    <SpeedDialAction
                        key={key}
                        icon={action?.icon || <SaveIcon />}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            if (action?.disable === true) { e.stopPropagation(); }
                            else {
                                if (action?.onClick) { action?.onClick() }
                                else { action.name !== undefined && onClick(action.name); }
                            }
                        }}
                        sx={{
                            width: 45, height: 45, borderRadius: "2%",
                            background: theme.palette.secondary.light, color: theme.palette?.[action.color || "secondary"].dark
                        }}
                    />
                ))}
            </StyledSpeedDial>
            {/* </Box> */}
        </>
    )
}