import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Server side data fetching with query -Md Asikur",
  description: "Server side data fetching with query,search,filter,sort,pagination in next js with server side data fetching in next js -Md Asikur",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider><Navbar/>{children}<Footer/></StoreProvider>
      </body>
    </html>
  );
}
