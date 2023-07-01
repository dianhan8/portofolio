import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto_Mono } from '@next/font/google'
import FontLocal from '@next/font/local'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const protoMono = FontLocal({
  src: '../styles/fonts/Proto.Mono/Proto_Mono_Regular.ttf',
  variable: '--font-proto-mono',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${robotoMono.variable} ${protoMono.variable} font-sans bg-[#101015]`}>
      <Component {...pageProps} />
    </main>
  )
}
