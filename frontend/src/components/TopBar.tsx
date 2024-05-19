import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Clock from './Clock';

const TopBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                <Typography variant="h6">
                    Todo app of a busy individual
                </Typography>
                <Clock></Clock>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
