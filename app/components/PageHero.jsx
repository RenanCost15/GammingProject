'use client';

import { useAppSettings } from './AppProviders';

export default function PageHero({ content, eyebrow, title, highlight, description }) {
  const { t } = useAppSettings();
  const data = content ? {
    eyebrow: t(`${content}.eyebrow`),
    title: t(`${content}.title`),
    highlight: t(`${content}.highlight`),
    description: t(`${content}.description`),
  } : { eyebrow, title, highlight, description };

  return (
    <section className="container-pro mb-10 pt-4 text-center">
      <p className="section-eyebrow">{data.eyebrow}</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-frost sm:text-5xl">
        {data.title} <span className="gradient-title">{data.highlight}</span>
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-smoke sm:text-lg">{data.description}</p>
    </section>
  );
}
