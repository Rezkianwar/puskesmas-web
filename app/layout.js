import { Inter } from 'next/font/google'
import './ui/globals.css'
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
} from '@clerk/nextjs'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Flex, Spin } from 'antd';
import SessionProviderWrapper from './SessionProviderWrapper';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Puskesmas Silago',
  description: 'Puskesmas App',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className} style={{ backgroundColor: 'var(--bgHome)' }}>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href="/favicon.ico" /> {/* Menambahkan link ke favicon */}
        </Head>
          <SessionProviderWrapper>
            <ClerkLoading>
              <div className='loading'>
                <Flex gap="small" vertical>
                  <Spin size='large' />
                </Flex>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <AntdRegistry>{children}</AntdRegistry>
            </ClerkLoaded>
          </SessionProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
