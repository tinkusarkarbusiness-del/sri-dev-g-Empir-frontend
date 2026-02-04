import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Poppins, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import { cn } from '@/lib/utils'

export const metadata = {
  title: "Sri Dev G Empire",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-headline',
})

const fontSpaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "font-body antialiased",
          fontPoppins.variable,
          fontSpaceGrotesk.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
