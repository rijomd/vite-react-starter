import { Outlet } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import navigation from '../../MenuItems';
import { Customization } from '../Customization';

import { Breadcrumbs } from 'Components/Extend/Breadcrumbs';
import { getCustomizationState, setOpenDrawerAction } from "Themes/Reducer/customizationActions";

import { drawerWidth } from 'Services/Store/GridConstant';
import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";


export const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useAppSelector(getCustomizationState);
  const dispatch = useAppDispatch();
  const leftDrawerOpened = customization.opened;

  const handleLeftDrawerToggle = () => {
    dispatch(setOpenDrawerAction(!leftDrawerOpened));
  };

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    ...theme.typography.body1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 88,
    transition: theme.transitions.create(
      'margin',
      leftDrawerOpened
        ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
        : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
    ),
    [theme.breakpoints.up('md')]: {
      marginLeft: leftDrawerOpened ? 0 : -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
      // width: leftDrawerOpened ? '100%' : `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px'
    }
  }));


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main theme={theme} >
        <Breadcrumbs separator={KeyboardArrowRightIcon} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>

      <Customization />
    </Box>
  );
};
