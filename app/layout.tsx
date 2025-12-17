import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/sonner";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NiceShop - Your Ultimate Shopping Destination',
  description: 'Discover amazing products from top brands with exclusive deals and fast shipping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased bgDesign",inter.className)}>
        <Navbar/>
        {children}
        <Footer />
        <Toaster />
        <Script id="seed-demo-user" strategy="afterInteractive">
          {`
            (function() {
              const demoUser = {
                id: "demo-001",
                email: "demo@niceshop.com",
                password: "demo123",
                name: "Demo User",
                createdAt: new Date().toISOString(),
              };
              const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
              if (!users.find(u => u.email === demoUser.email)) {
                users.push(demoUser);
                localStorage.setItem('mock-users', JSON.stringify(users));
              }
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
