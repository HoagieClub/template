import { ReactNode } from 'react';
import Layout from '@/lib/hoagie-ui/Layout';
import Footer from '@/lib/hoagie-ui/Footer';
import Theme from '@/lib/hoagie-ui/Theme';
import Nav from '@/lib/hoagie-ui/Nav';
import '@/lib/hoagie-ui/Theme/theme.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
// import { MockableUserProvider, useMockableUser } from '@/mock/User';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';

export const metadata = {
  title: 'Template App by Hoagie',
  description: 'Build the next big thing.',
};

async function Content({ children }: { children: ReactNode }) {
  const session = await getSession();
  const user = session?.user;
  const tabs = [
    { title: 'Feature 1', href: '/feature1' },
    { title: 'Feature 2', href: '/feature2' },
    { title: 'Feature 3', href: '/feature3' },
  ];

  return (
    <Theme palette='purple'>
      <Layout>
        <Nav name='template' tabs={tabs} user={user} />
        {children}
        <Toaster />
        <Footer />
      </Layout>
    </Theme>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <UserProvider>
        <body className='antialiased'>
          <Content>{children}</Content>
          <Analytics />
          <SpeedInsights />
        </body>
      </UserProvider>
    </html>
  );
}
