import "@/styles/globals.css";
import { AuthProvider } from './context/AuthContext'
import { SeatProvider } from './context/SeatContext'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <SeatProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </SeatProvider>
      </AuthProvider>
    </ClerkProvider>

  )
}
