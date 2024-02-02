import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { NavItem } from '../NavItem';
import { TypeOfMenuPages } from "../../../../../MenuItems";

import { useAppSelector } from "Services/Hook/Hook";
import { getCustomizationState } from "Themes/Reducer/customizationActions";

export const NavCollapse = ({ menu, level }: { menu: TypeOfMenuPages, level: number }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const customization = useAppSelector(getCustomizationState);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>('');

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : '');
    if (menu?.id !== 'authentication') {
      navigate(menu.children[0]?.url);
    }
  };

  const { pathname } = useLocation();
  const checkOpenForParent = <T,>(child: T[], id: string) => {
    child.forEach((item: any) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    setSelected('');
    if (menu.children) {
      menu.children?.forEach((item: any) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu?.children]);

  const menus = menu.children?.map((item: any) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu?.icon;
  const menuIcon = menu.icon ? (
    <Icon style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subtitle1 }} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <KeyboardArrowUpIcon style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        ) : (
          <KeyboardArrowDownIcon style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light
            }
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

