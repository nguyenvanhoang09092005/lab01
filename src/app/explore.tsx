import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SiteHeader } from '@/components/site-header';
import { useSiteTheme } from '@/components/site-theme-provider';

export default function ExploreScreen() {
  const { mode } = useSiteTheme();
  const isDark = mode === 'dark';
  const background = isDark ? '#171817' : '#f7f6f2';
  const foreground = isDark ? '#f3f0e9' : '#191919';
  const muted = isDark ? '#aaa79f' : '#716f69';

  return (
    <ScrollView style={[styles.page, { backgroundColor: background }]}>
      <SiteHeader />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>THE DESIGN PHILOSOPHY</Text>
        <Text style={[styles.title, { color: foreground }]}>
          Less, with{'\n'}intention.
        </Text>
        <Text style={[styles.description, { color: muted }]}>
          I AM RICH is a small study in restraint: one considered object, a
          quiet palette, and room for the details to speak. The diamond is not a
          measure of wealth, but a reminder to value what is already meaningful.
        </Text>
        <View style={styles.principles}>
          {[
            {
              number: '01',
              title: 'Clarity',
              description: 'Keep only what matters.',
            },
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
          ].map((principle) => (
            <View
              key={principle.number}
              style={[
                styles.principle,
                { borderTopColor: isDark ? '#3a3b37' : '#dedbd4' },
              ]}
            >
              <Text style={styles.number}>{principle.number}</Text>
              <Text style={[styles.principleTitle, { color: foreground }]}>
                {principle.title}
              </Text>
              <Text style={[styles.principleText, { color: muted }]}>
                {principle.description}
              </Text>
            </View>
          ))}
        </View>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link" style={styles.backButton}>
            <Text style={styles.backText}>← Back to the diamond</Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: muted }]}>
          I AM RICH · © 2026 · VERSION 1.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    padding: 28,
    paddingTop: 72,
  },
  eyebrow: {
    color: '#9b8556',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
  },
  title: { fontSize: 48, lineHeight: 54, fontFamily: 'serif', marginTop: 18 },
  description: { fontSize: 16, lineHeight: 25, maxWidth: 560, marginTop: 16 },
  principles: { marginTop: 48, gap: 26 },
  principle: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 18 },
  number: { color: '#9b8556', fontSize: 11, letterSpacing: 1 },
  principleTitle: { fontSize: 20, fontFamily: 'serif', marginTop: 8 },
  principleText: { fontSize: 14, marginTop: 5 },
  backButton: { alignSelf: 'flex-start', marginTop: 44, paddingVertical: 12 },
  backText: { color: '#9b8556', fontSize: 14, fontWeight: '600' },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { fontSize: 9, letterSpacing: 1.5 },
});
