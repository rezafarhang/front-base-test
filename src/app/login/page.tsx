'use client';

import LoginForm from '@/components/login/login-form';
import LoginBase from '@/components/login/login-base';

export default function LoginPage() {
  return (
    <LoginBase color="rgba(30,64,175,0.45)">
      <LoginForm />
    </LoginBase>
  );
}
