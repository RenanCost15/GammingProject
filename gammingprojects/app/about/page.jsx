'use client';

import Link from 'next/link';
import { useAppSettings } from '../components/AppProviders';

export default function About() {
  const { t } = useAppSettings();
  const pillars = t('about.pillars');

  return (
    <div className="page-shell">
      <section className="container-pro py-8">
        <div className="glass-panel overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <p className="section-eyebrow">{t('about.eyebrow')}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-frost sm:text-6xl">
            {t('about.titleA')} <span className="gradient-title">{t('about.titleHighlight')}</span>.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-smoke">{t('about.description')}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="card-pro p-7">
              <h2 className="text-2xl font-black text-crimson">{pillar.title}</h2>
              <p className="mt-4 leading-7 text-smoke">{pillar.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-crimson/30 bg-crimson/10 p-8 text-center shadow-neon">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-crimson">{t('about.developer')}</p>
          <h2 className="mt-3 text-3xl font-black text-frost">Renan Costa</h2>
          <p className="mx-auto mt-3 max-w-2xl text-smoke">{t('about.developerText')}</p>
          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/games" className="btn-primary">{t('about.viewGames')}</Link>
            <Link href="https://github.com/RenanCost15" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</Link>
            <Link href="/" className="btn-secondary">{t('about.backHome')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
