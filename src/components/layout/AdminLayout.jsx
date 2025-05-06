import {
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon,
    Message as MessageIcon,
} from '@mui/icons-material';
import {
    Box,
    Drawer,
    Grid,
    IconButton,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom';
import { grayColor, matBlack } from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../redux/thunk/admin';
  
  const Link = styled(LinkComponent)(({ theme }) => ({
    textDecoration: 'none',
    borderRadius: '1.5rem',
    padding: '0.9rem 1.5rem',
    color: '#222',
    transition: 'all 0.2s ease-in-out',
    fontWeight: 500,
    '&:hover': {
      color: matBlack,
      backgroundColor: theme.palette.action.hover,
    },
  }));
  
  const adminTabs = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <DashboardIcon />,
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <ManageAccountsIcon />,
    },
    {
      name: 'Chats',
      path: '/admin/chats',
      icon: <GroupsIcon />,
    },
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: <MessageIcon />,
    },
  ];
  
  const Sidebar = ({ w = '100%' }) => {
    const location = useLocation();
  const dispatch = useDispatch();
    const logoutHandler = () => {
    dispatch(adminLogout())
    };
  
    return (
      <Stack
        width={w}
        direction="column"
        p="2rem"
        spacing="2rem"
        sx={{
          minHeight: '100vh',
          background: '#f9f9f9',
          borderRight: `1px solid ${grayColor}`,
        }}
      >
        <Typography
          variant="h5"
          textTransform="uppercase"
          fontWeight={700}
          color={matBlack}
          fontFamily={`'Montserrat', sans-serif`}
        >
          Talkaire
        </Typography>
  
        <Stack spacing="1rem">
          {adminTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  backgroundColor: matBlack,
                  color: 'white',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: matBlack,
                  },
                }
              }
            >
              <Stack direction="row" alignItems="center" spacing="1rem">
                {tab.icon}
                <Typography fontWeight={600}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))}
          <Link onClick={logoutHandler}>
            <Stack direction="row" alignItems="center" spacing="1rem">
              <ExitToAppIcon />
              <Typography fontWeight={600}>Logout</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    );
  };
 

  const AdminLayout = ({ children }) => {
    const {isAdmin} = useSelector((state) => state.auth);
    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false);

    if(!isAdmin) return <Navigate to={'/admin'}/>
  
    return (
      <Grid container minHeight="100vh">
        {/* Mobile Menu Icon */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            right: '1rem',
            top: '1rem',
            zIndex: 1300,
          }}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
  
        {/* Desktop Sidebar */}
        <Grid
          size={{ md: 4, lg: 3 }}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Sidebar />
        </Grid>
  
        {/* Main Content */}
        <Grid
          size={{ md: 8, lg: 9, xs: 12 }}
          sx={{
            bgcolor: grayColor,
            padding: { xs: '2rem 1rem', md: '3rem' },
          }}
        >
          {children}
        </Grid>
  
        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={isMobile}
          onClose={handleClose}
          PaperProps={{
            sx: { width: '65vw' },
          }}
        >
          <Sidebar />
        </Drawer>
      </Grid>
    );
  };
  
  export default AdminLayout;
  