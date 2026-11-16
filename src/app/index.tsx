import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SiteHeader } from '@/components/site-header';
import { useSiteTheme } from '@/components/site-theme-provider';

export default function HomeScreen() {
  const { mode } = useSiteTheme();
  const [scale] = useState(() => new Animated.Value(1));
  const isDark = mode === 'dark';

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: isDark ? '#171817' : '#f7f6f2' }]}
      contentContainerStyle={styles.pageContent}
    >
      <SiteHeader />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>A STUDY IN QUIET LUXURY</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tap the diamond to make it sparkle"
          style={{ width: '100%', alignItems: 'center' }}
          onPress={handlePress}
        >
          <Animated.View
            style={[styles.diamondContainer, { transform: [{ scale }] }]}
          >
            <Image
              source={require('../../assets/images/diamond.png')}
              style={styles.diamond}
              resizeMode="contain"
            />
          </Animated.View>
        </Pressable>
        <Text style={[styles.title, { color: isDark ? '#f3f0e9' : '#191919' }]}>
          Elegance in{'\n'}Simplicity
        </Text>
        <Text
          style={[
            styles.description,
            { color: isDark ? '#aaa79f' : '#716f69' },
          ]}
        >
          A reminder that true richness is found in the beauty of less.
        </Text>
        <Link href="/explore" asChild>
          <Pressable
            accessibilityRole="link"
            style={StyleSheet.flatten([
              styles.exploreButton,
              { backgroundColor: isDark ? '#f3f0e9' : '#1d1d1b' },
            ])}
          >
            <Text
              style={[
                styles.exploreText,
                { color: isDark ? '#191919' : '#fff' },
              ]}
            >
              Explore the idea
            </Text>
            <Text style={styles.arrow}>↗</Text>
          </Pressable>
        </Link>
        <Text
          style={[styles.tapText, { color: isDark ? '#aaa79f' : '#716f69' }]}
        >
          Tap the diamond to make it sparkle
        </Text>
      </View>
      <View style={styles.footer}>
        <Text
          style={[styles.footerText, { color: isDark ? '#aaa79f' : '#716f69' }]}
        >
          I AM RICH · © 2026 · VERSION 1.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  pageContent: { flexGrow: 1 },
  container: {
    flexGrow: 1,
    minHeight: 480,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 44,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#9b8556',
    marginBottom: 22,
    fontWeight: '600',
  },
  diamondContainer: {
    width: '80%',
    maxWidth: 230,
    aspectRatio: 1,
    borderRadius: 120,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#b9a875',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 8,
  },
  diamond: { width: '100%', height: '100%' },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'serif',
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 340,
    marginTop: 14,
  },
  exploreButton: {
    marginTop: 26,
    backgroundColor: '#1d1d1b',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exploreText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  arrow: { color: '#d2bd86', fontSize: 16 },
  tapText: {
    marginTop: 25,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { fontSize: 9, letterSpacing: 1.5 },
});
