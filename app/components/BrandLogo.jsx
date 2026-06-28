'use client';

export default function BrandLogo({ theme = 'dark', compact = false }) {
  const isLight = theme === 'light';

  const palette = isLight
    ? {
        shell: '#ffffff',
        surface: '#eef5ff',
        surfaceDeep: '#d9e9ff',
        border: '#1268ff',
        borderSoft: 'rgba(18, 104, 255, 0.22)',
        accent: '#1268ff',
        accentSoft: '#59a2ff',
        highlight: '#b8d5ff',
        mark: '#071528',
        wordmark: '#071528',
        sub: '#52627a',
        glow: '0 20px 44px rgba(18, 104, 255, 0.18)',
      }
    : {
        shell: '#05070b',
        surface: '#10131a',
        surfaceDeep: '#1a1f2a',
        border: '#ff1e2d',
        borderSoft: 'rgba(255, 30, 45, 0.24)',
        accent: '#ff1e2d',
        accentSoft: '#ff666f',
        highlight: '#3d0f17',
        mark: '#ffffff',
        wordmark: '#ffffff',
        sub: '#a7a7b3',
        glow: '0 22px 46px rgba(255, 30, 45, 0.22)',
      };

  return (
    <span className={`brand-logo ${compact ? 'brand-logo-compact' : ''}`} style={{ '--brand-glow': palette.glow }}>
      <span
        className="brand-mark-shell"
        style={{
          background: `linear-gradient(180deg, ${palette.surface}, ${palette.shell})`,
          borderColor: palette.borderSoft,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3.5" y="3.5" width="57" height="57" rx="17" fill={palette.shell} stroke={palette.border} strokeWidth="3.6" />
          <rect x="9.5" y="9.5" width="45" height="45" rx="13" fill={`url(#panel-${theme})`} stroke={palette.borderSoft} strokeWidth="1.4" />
          <path d="M20 46V18H36.2C44.4 18 49.8 22.9 49.8 30.3C49.8 35.8 46.8 39.9 41.8 42L49.5 46H39.7L33.4 42.8H28.7V46H20Z" fill={palette.mark} />
          <path d="M28.7 36.1H35.2C38.9 36.1 41.2 33.8 41.2 30.7C41.2 27.5 38.9 25.3 35.2 25.3H28.7V36.1Z" fill={`url(#cut-${theme})`} />
          <path d="M18 49.5H44" stroke={palette.accent} strokeWidth="3.8" strokeLinecap="round" />
          <circle cx="45.8" cy="18.2" r="3.5" fill={palette.accent} />
          <circle cx="39.4" cy="14.2" r="2" fill={palette.accentSoft} />
          <path d="M14.5 50.5C21.7 43.1 29.4 40.2 39.5 38.8" stroke={palette.accentSoft} strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
          <defs>
            <linearGradient id={`panel-${theme}`} x1="14" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor={palette.surfaceDeep} />
              <stop offset="1" stopColor={palette.surface} />
            </linearGradient>
            <linearGradient id={`cut-${theme}`} x1="29" y1="25" x2="40" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor={palette.shell} />
              <stop offset="1" stopColor={palette.highlight} />
            </linearGradient>
          </defs>
        </svg>
      </span>

      {!compact && (
        <span className="brand-wordmark leading-none">
          <span className="brand-wordmark-main" style={{ color: palette.wordmark }}>
            RedCore
          </span>
          <span className="brand-wordmark-sub" style={{ color: palette.sub }}>
            Games
          </span>
        </span>
      )}
    </span>
  );
}
