import '@/global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppTabs from '@/components/app-tabs';
import {
  SiteThemeProvider,
  useSiteTheme,
} from '@/components/site-theme-provider';
function SiteLayout() {
  const { mode } = useSiteTheme();
  return (
    <ThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <SafeAreaView
        edges={Platform.OS === 'web' ? [] : ['top', 'left', 'right']}
        style={{
          flex: 1,
          backgroundColor: mode === 'dark' ? '#171817' : '#f7f6f2',
        }}
      >
        <AppTabs />
      </SafeAreaView>
    </ThemeProvider>
  );
}
export default function RootLayout() {
  return (
    <SiteThemeProvider>
      <SiteLayout />
    </SiteThemeProvider>
  );
}
