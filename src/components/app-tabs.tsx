import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSiteTheme } from '@/components/site-theme-provider';
export default function AppTabs() {
  const { mode } = useSiteTheme(),
    dark = mode === 'dark';
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: dark ? '#D2BD86' : '#80632F',
        tabBarInactiveTintColor: dark ? '#AAA79F' : '#716F69',
        tabBarStyle: {
          backgroundColor: dark ? '#171817' : '#F7F6F2',
          borderTopColor: dark ? '#3A3B37' : '#DEDBD4',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>◇</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Philosophy',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>ⓘ</Text>
          ),
        }}
      />
    </Tabs>
  );
}
