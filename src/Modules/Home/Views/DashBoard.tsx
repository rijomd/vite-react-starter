import { Grid } from '@mui/material';

import { gridSpacing } from "Services/Store/GridConstant";
import { PageOutLine } from "Components/OutLine/PageOutLine";


import { UserTable } from "../Components/UserTable";

const DashBoard = () => {

      return (
        <PageOutLine >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <UserTable />
                </Grid>
            </Grid>
        </PageOutLine>
    )
}
export default DashBoard