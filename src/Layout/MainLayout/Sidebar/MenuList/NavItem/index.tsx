import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getCustomizationState, setOpenDrawerAction, setOpenMenuAction } from "Themes/Reducer/customizationActions";
import { TypeOfMenuPages } from "../../../../../MenuItems"


export const NavItem = ({ item, level }: { item: TypeOfMenuPages, level: number }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const customization = useAppSelector(getCustomizationState);
  const dispatch = useAppDispatch();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id: string | number) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id: string | number) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: any;
  listItemProps = { component: Link, to: item.url, target: itemTarget };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string | number) => {
    dispatch(setOpenMenuAction(id));
    if (matchesSM) {
      dispatch(setOpenDrawerAction(false));
    }
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(setOpenMenuAction(item.id));
    }
  }, [pathname]);

  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      }}
      selected={customization.isOpen.findIndex((id: string | number) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
      {...listItemProps}

    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={customization.isOpen.findIndex((id: string | number) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subtitle1 }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};


