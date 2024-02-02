import { Avatar, Box, ButtonBase } from '@mui/material';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useTheme } from '@mui/material/styles';

import { LogoSection } from '../LogoSection';
import { SearchSection } from './SearchSection';
import { ProfileSection } from './ProfileSection';
import { NotificationSection } from './NotificationSection';


type TypeHeader = {
  handleLeftDrawerToggle: () => void
}

export const Header = ({ handleLeftDrawerToggle = () => { } }: TypeHeader) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: { width: 'auto' },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <WidgetsIcon />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />
    </>
  );
};
