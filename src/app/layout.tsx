
import "./globals.css";



import { Inter } from 'next/font/google'
import { Header } from "@/components/header"
import { AuthProvider } from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin=""
        ></script>
        <script src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
      </head>
      <body className={`${inter.className} bg-[#1a0b2e]`}>
        <Header />
<<<<<<< HEAD
=======
       
>>>>>>> a1824cb6a882faa07dfa0ed1da29544687ed4c4d
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

