import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppProviders } from './components/AppProviders';

export const metadata = {
  title: 'RedCore Games | Catálogo Gamer Inteligente',
  description: 'Explore jogos, criadores, desenvolvedoras, plataformas e publicadoras em uma interface moderna com cache, busca avançada, temas e suporte a idiomas.',
  authors: [{ name: 'Renan Costa' }],
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-abyss text-frost antialiased">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
