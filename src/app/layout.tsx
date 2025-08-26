import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomThemeProvider from '@/providers/theme-provider';
import QueryProvider from '@/providers/query-provider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'حکمرانی داده | سامانه مدیریت داده‌های سازمانی',
  description: 'سامانه حکمرانی داده شرکت رهآویان هوشمند برای مدیریت و کنترل داده‌های سازمانی',
  keywords: 'حکمرانی داده, مدیریت داده, داده کاوی, هوش مصنوعی',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <CustomThemeProvider>
            {children}
          </CustomThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
