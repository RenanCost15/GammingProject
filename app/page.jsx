'use client';

import Link from 'next/link';
import { FiArrowUpRight, FiBox, FiCpu, FiPlayCircle, FiUsers } from 'react-icons/fi';
import { useAppSettings } from './components/AppProviders';

export default function Home() {
  const { t } = useAppSettings();
  const areas = [
    { href: '/games', icon: FiPlayCircle, title: t('nav.games'), description: t('home.gamesText') },
    { href: '/creators', icon: FiUsers, title: t('nav.creators'), description: t('home.creatorsText') },
    { href: '/developers', icon: FiBox, title: t('nav.developers'), description: t('home.developersText') },
    { href: '/platforms', icon: FiCpu, title: t('nav.platforms'), description: t('home.platformsText') },
  ];

  return (
    <div className="page-shell overflow-hidden">
      <section className="container-pro flex min-h-[calc(100vh-210px)] max-w-5xl flex-col items-center justify-center py-16 text-center sm:py-24">
        <p className="section-eyebrow">{t('home.badge')}</p>
        <h1 className="hero-title mt-6 max-w-5xl">
          {t('home.titleA')} <span className="gradient-title">{t('home.titleHighlight')}</span> {t('home.titleB')}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-smoke sm:text-lg">
          {t('home.description')}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/games" className="btn-primary">{t('home.start')}</Link>
          <Link href="/about" className="btn-secondary">{t('home.details')}</Link>
        </div>
      </section>

      <section className="container-pro pb-8 sm:pb-14">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="section-eyebrow">{t('home.exploreEyebrow')}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-frost sm:text-4xl">{t('home.exploreTitle')}</h2>
          <p className="mt-3 text-sm leading-7 text-smoke sm:text-base">{t('home.exploreDescription')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href} className="home-area-card group">
              <span className="home-area-icon"><Icon /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="home-area-action">
                {t('home.openSection')} <FiArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
