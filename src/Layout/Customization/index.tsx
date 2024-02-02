import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { useTheme } from '@mui/material/styles';
import { Drawer, Fab, IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { AnimateButton } from 'Components/Extend/AnimateButton';

import { CustomizationForm } from "./CustomizationForm";

export const Customization = () => {
  const theme = useTheme();

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '25%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <SettingsIcon />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{ sx: { width: 280 } }}
      >
        <PerfectScrollbar component="div">
          <CustomizationForm />
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};
