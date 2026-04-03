import type { Metadata, Viewport } from 'next' 
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google' 
import { Analytics } from '@vercel/analytics/next' 
import './globals.css' 
 
const poppins = Poppins({  
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-poppins" 
}); 
 
const notoSansDevanagari = Noto_Sans_Devanagari({  
  subsets: ["devanagari"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-devanagari" 
}); 
 
export const metadata: Metadata = { 
  title: 'Rural Health Assistant | ग्रामीण स्वास्थ्य सहायक', 
  description: 'AI-powered health check and disease prediction app for rural communities 
with Ayurvedic remedies', 
  generator: 'v0.app', 
  icons: { 
    icon: [ 
      { 
        url: '/icon-light-32x32.png', 
        media: '(prefers-color-scheme: light)', 
      }, 
      { 
        url: '/icon-dark-32x32.png', 
        media: '(prefers-color-scheme: dark)', 
      }, 
      { 
        url: '/icon.svg', 
        type: 'image/svg+xml', 
      }, 
    ], 
    apple: '/apple-icon.png', 
  }, 
} 
 
export const viewport: Viewport = { 
  themeColor: '#22c55e', 
  width: 'device-width', 
  initialScale: 1, 
  maximumScale: 1, 
  userScalable: false, 
} 
 
export default function RootLayout({ 
  children, 
}: Readonly<{ 
  children: React.ReactNode 
}>) { 
  return ( 
    <html lang="en"> 
      <body className={`${poppins.variable} ${notoSansDevanagari.variable} font-sans 
antialiased`}> 
        {children} 
        <Analytics /> 
      </body> 
    </html> 
  ) 
} 