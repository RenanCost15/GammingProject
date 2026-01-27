import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Home - MorphGames MG',
  description: 'Explore the gaming world',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark text-cotton min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
