import type { Metadata } from "next";
import { Kanit, Sarabun } from 'next/font/google'
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GoogleTagManager from "./cookie/GoogleTagmanager";
import CookieConsentBanner from "./cookie/CookieConsentBanner";
import Header from "./components/Header";

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
})

const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: 'Bigger Smile คลินิกทำฟัน เพื่อรอยยิ้มที่กว้างขึ้น',
  description: 'คลินิกทันตกรรมบิ๊กเกอร์สไมล์ จังหวัดศรีสะเกษ บริการทันตกรรมทั่วไป จัดฟัน รักษารากฟัน ครอบฟัน และทันตกรรมเพื่อความงาม โดยทีมทันตแพทย์ผู้เชี่ยวชาญ',
  keywords: 'คลินิกทำฟัน, ทันตกรรม, จัดฟัน, ศรีสะเกษ, ทำฟัน, ฟอกสีฟัน, รักษารากฟัน',
  icons: {
    icon: [
      { url: '/assets/logo/faviconfinal.png', sizes: '32x32' }, // favicon ขนาดเล็กสำหรับเบราว์เซอร์
      { url: '/assets/logo/faviconfinal.png', sizes: '192x192' }, // ขนาดสำหรับ Progressive Web Apps (PWA)
    ],
    apple: [
      { url: '/assets/logo/faviconfinal.png', sizes: '180x180' }, // Apple Touch Icon ขนาดมาตรฐาน
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${kanit.variable} ${sarabun.variable}`}>
      <head>
        <GoogleTagManager />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className="bg-[#F9FAFC] pt-30">
        <CookieConsentBanner />
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

