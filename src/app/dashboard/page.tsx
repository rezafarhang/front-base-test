'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Container } from '@mui/material';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>در حال بارگذاری...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          داشبورد حکمرانی داده
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          به سامانه حکمرانی داده خوش آمدید
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          خروج از سیستم
        </Button>
      </Box>
    </Container>
  );
}
