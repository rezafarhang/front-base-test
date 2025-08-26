'use client';

import React from 'react';
import { Box, Container } from '@mui/material';

interface LoginBaseProps {
  children: React.ReactNode;
  color?: string;
}

const LoginBase: React.FC<LoginBaseProps> = ({ 
  children, 
  color = "rgba(30,64,175,0.45)" 
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.9) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginBase;
