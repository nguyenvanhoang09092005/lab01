import { SiteHeader } from '@/components/site-header';

import { version } from '../../package.json';

const principles = [
  { number: '01', title: 'Clarity', description: 'Keep only what matters.' },
  {
    number: '02',
    title: 'Craft',
    description: 'Let every detail earn its place.',
  },
  {
    number: '03',
    title: 'Stillness',
    description: 'Make space for what lasts.',
  },
];

export default function ExploreScreen() {
  return (
    <div className="site-page is-ready">
      <SiteHeader />
      <main className="explore-main">
        <p className="eyebrow">THE DESIGN PHILOSOPHY</p>
        <h1 className="explore-title">
          Less, with
          <br />
          intention.
        </h1>
        <p className="explore-copy">
          I AM RICH is a small study in restraint: one considered object, a
          quiet palette, and room for the details to speak. The diamond is not a
          measure of wealth, but a reminder to value what is already meaningful.
        </p>
        <section className="principles" aria-label="Design principles">
          {principles.map((principle) => (
            <article className="principle" key={principle.number}>
              <span className="principle-number">{principle.number}</span>
              <h2>{principle.title}</h2>
              <p>{principle.description}</p>
            </article>
          ))}
        </section>
        <a className="back-link" href="/">
          ← Back to the diamond
        </a>
      </main>
      <footer className="site-footer">
        <span>I AM RICH</span>
        <span>© 2026 · VERSION {version}</span>
      </footer>
    </div>
  );
}
