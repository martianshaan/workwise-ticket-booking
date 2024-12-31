import "@/styles/globals.css";
import { AuthProvider } from './context/AuthContext'
import { SeatProvider } from './context/SeatContext'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SeatProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </SeatProvider>
    </AuthProvider>
  )
}
