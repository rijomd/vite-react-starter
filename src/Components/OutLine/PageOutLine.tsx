import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Link, Box, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import { getCustomizationState } from "Themes/Reducer/customizationActions";
// import { useAppSelector } from "Services/Hook/Hook";

const Copyright = () => {
    return (
        <Typography variant="body2" color="grey.500" align="center" component={Link}>
            {`Copyright © www.starter.com © ${new Date().getFullYear()}`}
        </Typography>
    );
}

export type TypePageOutLine = {
    children?: React.ReactElement;
}

export const PageOutLine = ({ children }: TypePageOutLine) => {
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
                {children}
                <Box sx={{ width: '100%', textAlign: 'center', marginTop: 1.5 }}>
                    <Copyright />
                </Box>
            </PerfectScrollbar>
        </PageWrapper>
    )
}