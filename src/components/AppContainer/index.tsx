/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuList } from './MenuList';
import { Content } from './Content';
import { AppBar, ButtonStyled, Drawer, DrawerHeader } from './styles';
import { colors } from '../../shared/themes';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../shared/hooks/useAuth';
//import Cookies from 'universal-cookie';
//import { useToken } from '../../shared/hooks/auth';

interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const data = localStorage.getItem('data');
  const user = JSON.parse(data ?? '{"result":true, "count":42}');
  const { setUserId } = useToken()
  //const { User_Access } = useToken()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  /*   function Logout() {
      const cookie = new Cookies();
      cookie.remove('@diabetico_token');
      localStorage.removeItem('@diabetico_token');
  
      window.location.href = '/';
    } */

  const matches = useMediaQuery('(max-width:480px)');

  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem("@token")
    navigate("/login")
  }

  const { User_Access } = useToken()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none', marginRight: 0 }),
              }}>
              <MenuIcon color="primary" />
            </IconButton>
            {/* <img src={logo} width="120px" alt="Logo" /> */}
            <Divider orientation="vertical" variant="middle" flexItem sx={{
              ...(matches && { display: "none" })
            }} />
          </Box>
          <Box display="flex" alignItems="center" color="primary" >
            <ButtonStyled
              sx={{
                ...(matches && { display: "none" })
              }}
              startIcon={<AccountCircleIcon color="primary" />}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              {User_Access}
            </ButtonStyled>

            <Button variant="text" onClick={() => Logout()} >
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} matches>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList open={open} />

      </Drawer>

      <Content>{children}</Content>
    </Box>
  );
}
