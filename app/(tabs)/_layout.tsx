import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { constants } from '@/constants/CONSTANTS';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} color={props.color} name={props.name} />; 
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { backgroundColor: constants["bg-primary"] },
        headerShown: false
      }}>
      <Tabs.Screen name="temperature" options={{ title: '', tabBarIcon: ({ color }) => <TabBarIcon name="bed" color={color} />}} />
      <Tabs.Screen name="environment" options={{ title: '', tabBarIcon: ({ color }) => <TabBarIcon name="energy-savings-leaf" color={color} />}} />
    </Tabs>
  );
}
