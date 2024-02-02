import * as React from 'react';
import { Stack, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { TransitionProps } from '@mui/material/transitions';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';

type Props = {
    open: boolean,
    handleClose?: () => void,
    message: string,
    typeOfAlert?: 'error' | 'warning' | 'info' | 'success',
    vertical?: 'top' | 'bottom',
    horizontal?: 'center' | 'left' | 'right',
    transitionElement?: { element: 'GrowTransition' | 'SlideTransition', direction: 'up' | 'left' | 'right' | 'down' }
}

export const SnackBar = (props: Props) => {
    const { open, handleClose, message, typeOfAlert, vertical = 'top', horizontal = 'right', transitionElement = { element: 'SlideTransition', direction: 'up' } } = props;
    const [state, setState] = React.useState<{ Transition: React.ComponentType<TransitionProps & { children: React.ReactElement<any, any>; }>; }>({ Transition: Fade });

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction={transitionElement.direction} />;
    }

    function GrowTransition(props: GrowProps) {
        return <Grow {...props} />;
    }

    React.useEffect(() => {
        if (transitionElement.element === "GrowTransition") {
            setState({
                Transition: GrowTransition,
            });
        }
        if (transitionElement.element === "SlideTransition") {
            setState({
                Transition: SlideTransition,
            });
        }
    }, [open]);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }} TransitionComponent={state.Transition}
                >
                    <Alert onClose={handleClose} severity={typeOfAlert} sx={{ width: '100%' }}>{message}</Alert>
                </Snackbar>
            </Stack>
    )
}
