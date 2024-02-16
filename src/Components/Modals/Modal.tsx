import * as React from "react";
import { Slide } from "@mui/material";
import { Paper, Dialog } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import Draggable from "react-draggable";

import { PageOutLine, TypeAction } from "Components/OutLine/PageOutLine";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export type ModalAction = TypeAction;

type TypeModal = {
    open: boolean;
    title: string;
    children: React.ReactElement;
    maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
    handleClose?: () => void;
    disableBackgroundClose?: boolean;
    fullScreen?: boolean;
    actions?: ModalAction[];
}

export const Modal = (props: TypeModal) => {
    const { open, handleClose, title, children, maxWidth = 'md', actions = [],
        fullScreen = false, disableBackgroundClose = false } = props;

    const draggableRef: React.MutableRefObject<any> = React.useRef(null);

    function PaperComponent(props: any) {
        return !fullScreen ?
            <Draggable nodeRef={draggableRef} cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
            : <Paper {...props} />
    }

    return (
        <Dialog
            open={open}
            onClose={disableBackgroundClose ? () => { } : handleClose}
            aria-labelledby="draggable-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
            maxWidth={maxWidth}
            fullScreen={fullScreen}
            fullWidth={true}
            PaperComponent={PaperComponent}
            sx={{ borderRadius: 0 }}
        >
            <PageOutLine fullScreen={fullScreen} title={title} actions={actions} draggableRef={draggableRef}>{children}</PageOutLine>
        </Dialog >
    )
}