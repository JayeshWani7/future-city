
import "./globals.css";



import { Inter } from 'next/font/google'
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a0b2e]`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

