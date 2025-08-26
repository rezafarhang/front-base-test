'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
// @ts-ignore
import ClientCaptcha  from 'react-client-captcha-r18';
import { useRouter } from 'next/navigation';
import { LoginFormData, LoginResponse } from '@/types/auth.types';
import styles from './login-form.module.css';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (params: LoginFormData) => 
      axios.post<LoginResponse>("/accounts/token/", params),
    onSuccess: (data) => {
      const { access, refresh } = data.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.detail?.[0]?.fa || 
                          error.response?.data?.detail || 
                          error.response?.data?.message ||
                          "خطا در ورود به سیستم";
      setError(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim()) {
      setError("لطفا شماره تلفن را وارد کنید");
      return;
    }

    if (!/^09[0-9]{9}$/.test(phoneNumber.trim())) {
      setError("شماره تلفن وارد شده معتبر نیست");
      return;
    }

    if (!userCode.trim()) {
      setError("لطفا کد امنیتی را وارد کنید");
      return;
    }

    if (userCode !== captchaCode) {
      setError("لطفا کد امنیتی را به درستی وارد کنید");
      return;
    }

    mutation.mutate({
      username: phoneNumber.trim(),
      password: userCode.trim(),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: 400, 
        boxShadow: 3,
        borderRadius: 2 
      }}
    >
      <CardHeader
        title={
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Image
              src="/images/hokmrani-logo.png"
              alt="حکمرانی داده"
              width={150}
              height={120}
              style={{ objectFit: 'contain' }}
              priority
            />
            <Typography variant="h6" component="h1" textAlign="center" color="primary">
              به سامانه حکمرانی داده خوش آمدید
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              شرکت رهآویان هوشمند
            </Typography>
          </Box>
        }
      />
      
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="شماره تلفن همراه"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            dir="ltr"
            placeholder="09123456789"
            inputProps={{
              maxLength: 11,
              pattern: "09[0-9]{9}",
            }}
            required
          />

          <Box display="flex" gap={1} alignItems="center">
            <TextField
              label="کد امنیتی"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
              inputProps={{
                maxLength: 4,
              }}
              required
            />
            
            <ClientCaptcha
              containerClassName={styles.captcha__container}
              captchaClassName={styles.captcha__self}
              refreshButtonClassName={styles.captcha__refreshBtn}
              chars="0123456789"
              charsCount={4}
              fontColor="#1E40AF"
              fontSize={22}
              refreshButtonIconSize={16}
              refreshButton={true}
              captchaCode={(code: string) => setCaptchaCode(code)}
              backgroundColor="#F8F9FA"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={mutation.isPending}
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: '#1E40AF',
              '&:hover': {
                backgroundColor: '#1E3A8A',
              },
            }}
          >
            {mutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'ورود'
            )}
          </Button>
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            توسعه یافته توسط{' '}
            <a 
              href="https://datakaveh.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#1E40AF', textDecoration: 'none' }}
            >
              وب‌سایت رسمی دیتاکاوه
            </a>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
