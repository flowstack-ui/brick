'use client';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { Image } from '@flowstack-ui/brick/image';

export default function Qualification() {
  const [src, setSrc] = useState('/probe-initial.webp');
  const [shown, setShown] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return <main data-hydrated={hydrated}>
    <Image.Root data-case="before-error" src="/probe-error.webp" ratio={3 / 2}>
      <Image.Content alt="Before hydration failure" loading="eager" />
      <Image.Fallback>Unavailable before hydration</Image.Fallback>
    </Image.Root>
    <Image.Root data-case="before-success" src="/probe-success.webp" ratio={3 / 2}>
      <Image.Content alt="Before hydration success" loading="eager" />
    </Image.Root>
    <button onClick={() => setSrc('/probe-slow.webp')}>Slow source</button>
    <button onClick={() => setSrc('/probe-fast.webp')}>Fast source</button>
    <button onClick={() => setSrc(undefined)}>Clear source</button>
    <Image.Root data-case="race" src={src} ratio={3 / 2}>
      <Image.Content alt="Request replacement" loading="eager" />
      <Image.Fallback>Source absent</Image.Fallback>
    </Image.Root>
    <button onClick={() => setShown(true)}>Reveal lazy image</button>
    <div hidden={!shown}>
      <Image.Root data-case="hidden" src="/probe-hidden.webp" ratio={3 / 2}>
        <Image.Content alt="Initially hidden lazy image" loading="lazy" />
      </Image.Root>
    </div>
    <div style={{ width: 'min(100%, 600px)', height: 240 }}>
      <Image.Root data-case="next-fill" src="/studio.webp" fill style={{ position: 'relative' }}>
        <Image.Content asChild alt="Next fill studio">
          <NextImage src="/studio.webp" alt="Next fill studio" fill sizes="(max-width: 600px) 100vw, 600px" loading="eager" />
        </Image.Content>
        <Image.Fallback>Fill unavailable</Image.Fallback>
      </Image.Root>
    </div>
  </main>;
}
