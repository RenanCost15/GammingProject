'use client';

import { useAppSettings } from './AppProviders';

export default function LoadingState({ label, compact = false }) {
  const { t } = useAppSettings();

  return (
    <div className={`redcore-loader ${compact ? 'redcore-loader-compact' : ''}`} role="status" aria-live="polite">
      <span className="redcore-loader-mark" aria-hidden="true">
        <span className="redcore-loader-core">R</span>
        <span className="redcore-loader-orbit orbit-one" />
        <span className="redcore-loader-orbit orbit-two" />
      </span>
      <span className="redcore-loader-copy">{label || t('common.loadingContent')}</span>
    </div>
  );
}
