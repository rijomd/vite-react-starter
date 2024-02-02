import { Grid } from '@mui/material';

import { gridSpacing } from "Services/Store/GridConstant";
import { PageOutLine, pageActions } from "Components/OutLine/PageOutLine";


import { UserTable } from "../Components/UserTable";

const DashBoard = () => {

    const actions: pageActions[] = [
        { name: 'Copy' },
        { name: 'Save' },
        { name: 'Print' },
        { name: 'Share' },
    ];

    return (
        <PageOutLine actions={actions}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <UserTable />
                </Grid>
            </Grid>
        </PageOutLine>
    )
}
export default DashBoard