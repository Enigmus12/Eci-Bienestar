import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';

const Topbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: '#910000', color: 'white' }}>
      <Toolbar>
        <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          ASISTENCIA A CLASES EXTRACURRICULARES
        </Typography>
        <Button variant="contained" sx={{ bgcolor: 'white', color: '#910000', fontWeight: 'bold', '&:hover': { bgcolor: '#f0f0f0' } }}>
          Login
        </Button>
        <Avatar sx={{ ml: 2 }} alt="User" src="https://www.acofi.edu.co/wp-content/uploads/2013/10/UNIVERSIDAD-ESCUELA-COLOMBIANA-DE-INGENIERIA-1.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
