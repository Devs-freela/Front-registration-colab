import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../../../shared/themes';
import { APP_PAGES } from '../../../routes/pages.routes';

interface MenuListProps {
  open?: boolean;
}

export function MenuList({ open }: MenuListProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  return (
    <List>
      {APP_PAGES().filter(e => e.showMenu === true).map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => handleNavigate(item.route)}>
          <ListItemButton
            sx={{
              minHeight: 40,
              justifyContent: open ? 'initial' : 'center',
              margin: '0.5rem',
              borderRadius: '4px',
              px: 2.5,
              ...(location.pathname === item.route &&
                !open && {
                background: colors.primary_lightest,
              }),
              ...(location.pathname === item.route &&
                open && {
                background: colors.primary_lightest,
                color: colors.primary_base,
              }),
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                margin: 0,
                justifyContent: 'center',
                mr: open ? 3 : 'auto',
                ...(location.pathname === item.route &&
                  !open && {
                  color: colors.primary_base,
                }),
                ...(location.pathname === item.route &&
                  open && {
                  color: colors.primary_base,
                }),
              }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
