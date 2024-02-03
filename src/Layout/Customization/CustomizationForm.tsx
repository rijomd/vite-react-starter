import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

import { FormSelectField } from 'Components/FormElements/FormSelectField';

import { fontOptions } from 'Themes/Constants';
import { gridSpacing } from 'Services/Store/GridConstant';
import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getCustomizationState, setFontFamilyAction } from "Themes/Reducer/customizationActions";

export const CustomizationForm = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const customization = useAppSelector(getCustomizationState);

    // state - font family
    const [fontFamily, setFontFamily] = React.useState(customization.fontFamily);

    React.useEffect(() => {
        dispatch(setFontFamilyAction(fontFamily));
    }, [dispatch, fontFamily]);

    return (
        // ...customization.background,
        <Grid container spacing={gridSpacing} sx={{ p: 3, background: theme.palette.primary.light }}>
            <Grid item xs={12} sx={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                <SettingsIcon color='secondary' />  <Typography variant='h5' sx={{ pl: 1.25 }}> Settings </Typography>
            </Grid>
            {/* font family */}
            <Grid item xs={12}>
                <FormSelectField
                    options={fontOptions}
                    name='fontFamily'
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e)}
                    label='Font Style'
                />
            </Grid>

        </Grid>
    )
}