import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type PropsWithChildren,
} from 'react';
import { Platform } from 'react-native';

type ThemeMode = 'light' | 'dark';

type SiteThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
  storageError: string | null;
};

const STORAGE_KEY = 'i-am-rich-theme';
const STORAGE_ERROR = 'Your theme preference cannot be saved in this browser.';
const subscribers = new Set<() => void>();

function readStoredMode(): ThemeMode {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return 'light';
  }

  try {
    const savedMode = window.localStorage.getItem(STORAGE_KEY);
    return savedMode === 'light' || savedMode === 'dark' ? savedMode : 'light';
  } catch {
    storageError = STORAGE_ERROR;
    return 'light';
  }
}

let storageError: string | null = null;
let currentMode: ThemeMode = readStoredMode();

function subscribe(callback: () => void) {
  subscribers.add(callback);

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageChange);
  }

  return () => {
    subscribers.delete(callback);

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageChange);
    }
  };
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) {
    return;
  }

  currentMode = event.newValue === 'dark' ? 'dark' : 'light';
  notifySubscribers();
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

function setMode(mode: ThemeMode) {
  currentMode = mode;

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
      storageError = null;
    } catch {
      storageError = STORAGE_ERROR;
    }
  }

  notifySubscribers();
}

function getModeSnapshot() {
  return currentMode;
}

function getServerModeSnapshot(): ThemeMode {
  return 'light';
}

function getStorageErrorSnapshot() {
  return storageError;
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

export function SiteThemeProvider({ children }: PropsWithChildren) {
  const mode = useSyncExternalStore(subscribe, getModeSnapshot, getServerModeSnapshot);
  const currentStorageError = useSyncExternalStore(
    subscribe,
    getStorageErrorSnapshot,
    () => null,
  );
  const toggleMode = useCallback(() => {
    setMode(currentMode === 'light' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleMode,
      storageError: currentStorageError,
    }),
    [mode, toggleMode, currentStorageError],
  );

  return <SiteThemeContext.Provider value={value}>{children}</SiteThemeContext.Provider>;
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);

  if (!context) {
    throw new Error('useSiteTheme must be used within a SiteThemeProvider.');
  }

  return context;
}
