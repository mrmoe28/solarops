import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeScript } from './theme-script';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'SolarOps - AI-Powered Solar Project Management',
    description: 'Streamline your solar installations with AI-powered permit research, design generation, and proposal creation.',
};
export default function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">{children}</div>
        </Providers>
      </body>
    </html>);
}
