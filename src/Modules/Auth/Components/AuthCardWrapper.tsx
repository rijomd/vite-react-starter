import { Box } from '@mui/material';
import { MainCard } from 'Components/Cards/MainCard';

type TypeAuthCardWrapper = {
  children: React.ReactElement;
  [others: string]: any;
}

export const AuthCardWrapper = ({ children, ...other }: TypeAuthCardWrapper) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    title=''
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);
