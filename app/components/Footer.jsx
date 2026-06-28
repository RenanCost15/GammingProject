'use client';

import Link from 'next/link';
import { useAppSettings } from './AppProviders';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useAppSettings();

  return (
    <footer className="border-t border-white/10 bg-onyx px-4 py-8 text-center text-sm text-smoke">
      <div className="container-pro space-y-3">
        <p className="font-semibold text-ash">© {currentYear} RedCore Games. {t('footer.rights')}</p>
        <p>
          {t('footer.developed')}{' '}
          <Link
            href="https://github.com/RenanCost15"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-crimson underline-offset-4 transition hover:text-ember hover:underline"
          >
            Renan Costa
          </Link>
          .
        </p>
        <p className="text-xs text-smoke">
          Dados e imagens de jogos fornecidos por{' '}
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-crimson underline-offset-4 transition hover:text-ember hover:underline"
          >
            RAWG Video Games Database
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
