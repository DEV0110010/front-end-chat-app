import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color';

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={'100%'}>
      <Typography
        p={'2rem'}
        variant='h5'
        textAlign='center'
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 400,
          letterSpacing: '0.5px',
        }}
      >
        Select a Friend to Chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);
