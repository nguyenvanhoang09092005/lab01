import { useSiteTheme } from '@/components/site-theme-provider';

export function SiteHeader() {
  const { mode, toggleMode, storageError } = useSiteTheme();

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="I Am Rich home">
        <span className="brand-mark" aria-hidden="true">
          IA
        </span>
        <span className="brand-name">I AM RICH</span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        <a className="nav-link" href="/">
          Home
        </a>
        <a className="nav-link" href="/explore">
          Our philosophy
        </a>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleMode}
          aria-pressed={mode === 'dark'}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <span className="theme-toggle-icon" aria-hidden="true">
            {mode === 'light' ? '☾' : '☼'}
          </span>
          <span>{mode === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
      </nav>
      {storageError && (
        <span className="storage-notice" role="status">
          {storageError}
        </span>
      )}
    </header>
  );
}
