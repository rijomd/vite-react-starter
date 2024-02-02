// material-ui
import { Link, Typography, Stack } from '@mui/material';

export const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://mui.com/material-ui/api/list-item-button/" target="_blank" underline="hover">
            starter.io
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://mui.com/material-ui/api/list-item-button/" target="_blank" underline="hover">
            &copy; starter.com
        </Typography>
    </Stack>
);

