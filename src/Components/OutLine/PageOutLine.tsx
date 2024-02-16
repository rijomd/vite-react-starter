import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Link, useMediaQuery, Backdrop, Grid, Divider } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import { getCustomizationState } from "Themes/Reducer/customizationActions";
// import { useAppSelector } from "Services/Hook/Hook";

import { PageLoader } from 'Components/Loader/PageLoader';
import { FormButtonField } from 'Components/FormElements/FormButtonField';

import { gridSpacing } from 'Services/Store/GridConstant';

const Copyright = () => {
    return (
        <Typography variant="body2" color="grey.500" align="center" component={Link}>
            {`Copyright © www.starter.com © ${new Date().getFullYear()}`}
        </Typography>
    );
}

export type TypeAction = {
    label: string;
    icon?: JSX.Element;
    color?: any;
    disabled?: boolean;
    onClick: () => void;
};

type TypePageOutLine = {
    children?: React.ReactElement;
    isLoading?: boolean;
    title?: string,
    actions?: TypeAction[];
    draggableRef?: React.MutableRefObject<any>;
    fullScreen?: boolean;
}

export const MemorizedPageOutLine = ({ children, isLoading = false, title, actions = [], draggableRef, fullScreen = false }: TypePageOutLine) => {
    const theme = useTheme();
    // const customization = useAppSelector(getCustomizationState);
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const PageWrapper = styled('div')(({ theme }) => ({
        height: !matchUpMd ? 'calc(100vh - 100px)' : 'calc(100vh - 130px)',
        position: 'relative',
        overflow: 'hidden',
        padding: '8px',
        background: theme.palette.primary.light,
        minHeight: fullScreen ? '100vh' : '80vh',
        // ...customization.pageStyle,
    }));

    return (
        <PageWrapper>
            <PerfectScrollbar component="div">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, background: "#ffffffe0" }}
                    open={isLoading}
                >
                    <PageLoader />
                </Backdrop>

                <Grid container sx={{ background: '#fff' }}  >
                    {title && <Grid item md={12} xs={12}>
                        <Grid container spacing={gridSpacing}
                            sx={{ alignItems: 'center', cursor: draggableRef ? "move" : "default" }}
                            ref={draggableRef}>
                            <Grid item md={4} xs={12}>
                                <Typography variant="h4" align="inherit" sx={{ margin: '4px' }}>{title}</Typography>
                            </Grid>
                            <Grid item md={8} xs={12} sx={{ textAlign: 'end' }}>
                                {actions.length > 0 &&
                                    actions.map((item, index) => {
                                        return (
                                            <FormButtonField
                                                key={index}
                                                fullWidth={false}
                                                label={item.label}
                                                disabled={item?.disabled}
                                                onClick={() => item.onClick()}
                                                color={item?.color}
                                                sx={{ margin: '4px', textTransform: 'none' }}
                                            >
                                                {item.label + " "} {item?.icon}
                                            </FormButtonField>
                                        );
                                    })}
                            </Grid>
                        </Grid>
                        <Divider />
                    </Grid>}
                    <Grid item md={12} xs={12} >
                        {children}
                    </Grid>
                    <Grid item md={12} xs={12} sx={{ textAlign: 'center', marginTop: 1.5 }}>
                        <Copyright />
                    </Grid>
                </Grid>
            </PerfectScrollbar>
        </PageWrapper>
    )
}

export const PageOutLine = React.memo(MemorizedPageOutLine);
