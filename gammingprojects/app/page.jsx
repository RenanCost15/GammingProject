'use client';

import Link from 'next/link';
import { useAppSettings } from './components/AppProviders';

export default function Home() {
  const { t } = useAppSettings();
  const stats = [
    { value: 'RAWG', label: t('home.statApi') },
    { value: '5+', label: t('home.statSections') },
    { value: '100%', label: t('home.statResponsive') },
  ];
  const features = t('home.features');

  return (
    <div className="page-shell overflow-hidden">
      <section className="container-pro grid min-h-[calc(100vh-180px)] items-center gap-12 py-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative z-10 space-y-8">
          <div className="inline-flex rounded-full border border-crimson/40 bg-crimson/10 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-crimson">
            {t('home.badge')}
          </div>

          <div className="space-y-5">
            <h1 className="hero-title">
              {t('home.titleA')} <span className="gradient-title">{t('home.titleHighlight')}</span> {t('home.titleB')}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-smoke">{t('home.description')}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/games" className="btn-primary">{t('home.start')}</Link>
            <Link href="/about" className="btn-secondary">{t('home.details')}</Link>
          </div>

          <div className="grid max-w-2xl grid-cols-3 gap-3 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-4">
                <p className="text-2xl font-black text-crimson">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-smoke">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute inset-0 rounded-[3rem] bg-crimson/20 blur-3xl" />
          <div className="glass-panel relative h-full rounded-[2rem] p-6">
            <div className="rounded-[1.5rem] border border-crimson/30 bg-black/40 p-5 shadow-neon">
              <p className="section-eyebrow">{t('home.panelEyebrow')}</p>
              <h2 className="mt-4 text-3xl font-black text-frost">{t('home.panelTitle')}</h2>
              <p className="mt-3 text-sm leading-7 text-smoke">{t('home.panelText')}</p>
            </div>

            <div className="mt-6 grid gap-4">
              {features.map((feature, index) => (
                <div key={feature} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-crimson text-sm font-black text-white">
                    0{index + 1}
                  </span>
                  <p className="font-semibold text-ash">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
