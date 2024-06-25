import React from 'react';
import logo from '../assets/logo.png'; 
import { Box } from '@mui/material';

//Header (Learnwell) component - using inline styling as opposed to adding a stylesheet
const Header = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px', 
        marginBottom: '20px' 
      }}
    >
      <img src={logo} alt="Header" style={{ width: '100%', maxWidth: '150px', height: 'auto' }} />
    </Box>
  );
};

export default Header;
