'use client';

import Link from 'next/link';
import { useAppSettings } from './AppProviders';

export default function EmptyState({ title, message }) {
  const { t } = useAppSettings();

  return (
    <div className="page-shell flex items-center justify-center">
      <div className="glass-panel max-w-xl rounded-3xl p-8 text-center">
        <p className="section-eyebrow">{t('common.status')}</p>
        <h1 className="mt-3 text-3xl font-black text-frost">{title || t('common.noDataTitle')}</h1>
        <p className="mt-4 text-smoke">{message || t('common.noDataMessage')}</p>
        <Link href="/" className="btn-primary mt-6">{t('common.backHome')}</Link>
      </div>
    </div>
  );
}
