import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "block",
        textAlign: "center"
    },
}
export const LazyLoader = () => {
    return (
        <Box sx={styles.container}>
            <CircularProgress />
        </Box>
    )
}
