import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Link, Box, useMediaQuery, Backdrop, Grid } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import { getCustomizationState } from "Themes/Reducer/customizationActions";
// import { useAppSelector } from "Services/Hook/Hook";

import { PageLoader } from 'Components/Loader/PageLoader';
import { FormButtonField } from 'Components/FormElements/FormButtonField';

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
}

export const MemorizedPageOutLine = ({ children, isLoading = false, title, actions = [] }: TypePageOutLine) => {
    const theme = useTheme();
    // const customization = useAppSelector(getCustomizationState);
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const PageWrapper = styled('div')(({ theme }) => ({
        height: !matchUpMd ? 'calc(100vh - 100px)' : 'calc(100vh - 130px)',
        position: 'relative',
        overflow: 'hidden',
        padding: '8px',
        background: theme.palette.primary.light
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

                {title && <Grid container sx={{ alignItems: 'center', width: "100%", padding: '4px', background: "#fff" }}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h4" align="inherit" >{title}</Typography>
                    </Grid>
                    <Grid item md={8} xs={12} sx={{ textAlign: 'end' }}>
                        {actions.length > 0 &&
                            actions.map((item, index) => {
                                return (
                                    <FormButtonField
                                        key={index}
                                        fullWidth={false}
                                        disabled={item?.disabled}
                                        onClick={() => item.onClick()}
                                        color={item?.color}
                                        sx={{ marginRight: '8px', textTransform: 'none' }}
                                    >
                                        {item.label + " "} {item?.icon}
                                    </FormButtonField>
                                );
                            })}
                    </Grid>
                </Grid>}

                {children}

                <Box sx={{ width: '100%', textAlign: 'center', marginTop: 1.5 }}>
                    <Copyright />
                </Box>
            </PerfectScrollbar>
        </PageWrapper>
    )
}

export const PageOutLine = React.memo(MemorizedPageOutLine);
