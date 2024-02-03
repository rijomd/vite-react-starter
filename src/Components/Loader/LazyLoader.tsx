import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        minHeight: "100vh",
        justifyContent:"center",
        alignItems: "center"
    },
}
export const LazyLoader = () => {
    return (
        <Box sx={styles.container}>
            <CircularProgress size='10rem' color='secondary'/>
        </Box>
    )
}
