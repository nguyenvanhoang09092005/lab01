import { Image } from 'expo-image';
import { useEffect, useState } from 'react';

import { SiteHeader } from '@/components/site-header';

import { version } from '../../package.json';

export default function HomeScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`site-page${isReady ? ' is-ready' : ''}`}>
        <SiteHeader />
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <p className="eyebrow">A STUDY IN QUIET LUXURY</p>
            <figure className="diamond-stage">
              <Image
                source={require('../../assets/images/diamond.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                accessibilityLabel="A finely cut diamond"
              />
            </figure>
            <h1 className="hero-title" id="hero-title">
              Elegance in
              <br />
              Simplicity
            </h1>
            <p className="hero-copy">
              A reminder that true richness is found in the beauty of less.
            </p>
            <a className="primary-link" href="/explore">
              <span>Explore the idea</span>
              <span aria-hidden="true">↗</span>
            </a>
            <p className="tap-hint">A little sparkle never hurts.</p>
          </section>

          <section className="design-note" aria-labelledby="design-title">
            <h2 id="design-title">What matters is what remains.</h2>
            <div className="design-note-copy">
              <p>
                I AM RICH is a small study in restraint: one considered object,
                a quiet palette, and room for the details to speak.
              </p>
              <a className="text-link" href="/explore">
                Discover our philosophy&nbsp; →
              </a>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <span>I AM RICH</span>
          <span>© 2026 · VERSION {version}</span>
        </footer>
      </div>
      {!isReady && (
        <div
          className="site-loader"
          role="status"
          aria-label="Loading I Am Rich"
        >
          <span className="loader-mark" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
