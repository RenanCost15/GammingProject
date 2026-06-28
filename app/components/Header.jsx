'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiChevronDown, FiGlobe, FiMoon, FiSun } from 'react-icons/fi';
import { useAppSettings } from './AppProviders';
import BrandLogo from './BrandLogo';

const navigation = [
  { href: '/', key: 'nav.home' },
  { href: '/games', key: 'nav.games' },
  { href: '/creators', key: 'nav.creators' },
  { href: '/developers', key: 'nav.developers' },
  { href: '/platforms', key: 'nav.platforms' },
  { href: '/publishers', key: 'nav.publishers' },
  { href: '/about', key: 'nav.about' },
];

export default function Header() {
  const { language, setLanguage, theme, setTheme, t } = useAppSettings();
  const pathname = usePathname();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageMenuRef = useRef(null);

  const languages = [
    { value: 'pt-BR', label: 'PT-BR', description: t('controls.portuguese') },
    { value: 'en', label: 'EN', description: t('controls.english') },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLanguage = languages.find((item) => item.value === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-abyss/86 shadow-[0_12px_38px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson/60 to-transparent" />

      <div className="container-pro flex min-h-[86px] items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="RedCore Games">
          <BrandLogo theme={theme} />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label="Navegação principal">
          {navigation.map(({ href, key }) => {
            const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`nav-link-soft ${isActive ? 'nav-link-soft-active' : ''}`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              onClick={() => setIsLanguageOpen((current) => !current)}
              className={`language-trigger group ${isLanguageOpen ? 'language-trigger-open' : ''}`}
              aria-label={t('controls.language')}
              aria-expanded={isLanguageOpen}
            >
              <span className="flex items-center gap-2">
                <span className="language-trigger-globe flex h-7 w-7 items-center justify-center rounded-full transition duration-300">
                  <FiGlobe />
                </span>
                <span>{activeLanguage.label}</span>
              </span>
              <FiChevronDown className={`text-sm transition duration-300 ${isLanguageOpen ? 'rotate-180 text-frost' : 'text-smoke'}`} />
            </button>

            {isLanguageOpen && (
              <div className="language-popover animate-soft-in" role="menu">
                <div className="px-3 pb-2 pt-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-smoke">
                  {t('controls.language')}
                </div>
                {languages.map((item) => {
                  const isActive = item.value === language;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setLanguage(item.value);
                        setIsLanguageOpen(false);
                      }}
                      className={`language-option ${isActive ? 'language-option-active' : ''}`}
                      role="menuitem"
                    >
                      <span>
                        <span className="block text-sm font-black">{item.label}</span>
                        <span className="block text-xs font-semibold opacity-75">{item.description}</span>
                      </span>
                      {isActive && <FiCheck className="text-base" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle group"
            aria-label={t('controls.theme')}
          >
            <span className="theme-toggle-icon">
              {theme === 'dark' ? <FiMoon /> : <FiSun />}
            </span>
            <span className="hidden sm:inline">{theme === 'dark' ? t('controls.dark') : t('controls.light')}</span>
          </button>
        </div>
      </div>

      <nav className="container-pro flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:hidden" aria-label="Navegação principal mobile">
        {navigation.map(({ href, key }) => {
          const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);
          return (
            <Link key={href} href={href} className={`nav-link-soft shrink-0 ${isActive ? 'nav-link-soft-active' : ''}`}>
              {t(key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
