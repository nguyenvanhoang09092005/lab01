import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { useSiteTheme } from '@/components/site-theme-provider';

export function SiteHeader() {
  const { mode, toggleMode } = useSiteTheme();
  const isDark = mode === 'dark';
  const width = useWindowDimensions().width;
  const isCompact = width < 430;

  return (
    <View
      style={[
        styles.header,
        { borderBottomColor: isDark ? '#3a3b37' : '#dedbd4' },
        isCompact && styles.compactHeader,
      ]}
    >
      <Link href="/" asChild>
        <Pressable accessibilityRole="link" style={styles.brand}>
          <View style={styles.mark}>
            <Text style={styles.markText}>IA</Text>
          </View>
          <Text
            style={[
              styles.brandName,
              { color: isDark ? '#f3f0e9' : '#191919' },
            ]}
          >
            {width < 350 ? 'RICH' : 'I AM RICH'}
          </Text>
        </Pressable>
      </Link>

      <View style={[styles.navigation, isCompact && styles.compactNavigation]}>
        {!isCompact && (
          <Link href="/" asChild>
            <Pressable accessibilityRole="link" style={styles.navLink}>
              <Text
                style={[
                  styles.navText,
                  { color: isDark ? '#aaa79f' : '#62605b' },
                ]}
              >
                Home
              </Text>
            </Pressable>
          </Link>
        )}
        <Link href="/explore" asChild>
          <Pressable accessibilityRole="link" style={styles.navLink}>
            <Text
              style={[
                styles.navText,
                { color: isDark ? '#aaa79f' : '#62605b' },
              ]}
            >
              {width < 350 ? 'About' : 'Our philosophy'}
            </Text>
          </Pressable>
        </Link>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          onPress={toggleMode}
          style={[styles.themeButton, isCompact && styles.compactThemeButton]}
        >
          <Text
            style={[
              styles.themeButtonText,
              { color: isDark ? '#f3f0e9' : '#191919' },
            ]}
          >
            {mode === 'light' ? 'Dark' : 'Light'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 72,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  compactHeader: { paddingHorizontal: 12 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#9b8556',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: {
    color: '#9b8556',
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '700',
  },
  brandName: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  navigation: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  compactNavigation: { gap: 8 },
  navLink: { paddingVertical: 14, minHeight: 44, justifyContent: 'center' },
  navText: { fontSize: 11 },
  themeButton: {
    borderWidth: 1,
    borderColor: '#d8d4cc',
    borderRadius: 24,
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  compactThemeButton: { paddingHorizontal: 10 },
  themeButtonText: { fontSize: 11, fontWeight: '600' },
});
