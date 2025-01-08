import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import PurrHome from '../../assets/images/purrHome.png';
import PurrHomeActive from '../../assets/images/purrHomeActive.png';
import PurrAdd from '../../assets/images/purrAdd.png';
import PurrAddActive from '../../assets/images/purrAddActive.png';
import PurrChat from '../../assets/images/purrChat.png';
import PurrChatActive from '../../assets/images/purrChatActive.png';
import PurrLocation from '../../assets/images/purrLocation.png';
import PurrLocationActive from '../../assets/images/purrLocationActive.png';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
        <Tabs.Screen
        name="add"
        options={{
          title: 'add',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? PurrAddActive : PurrAdd}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
              name="chat"
              options={{
                title: 'chat',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={focused ? PurrChatActive : PurrChat}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                ),
              }}
            />
              <Tabs.Screen
                  name="index"
                   options={{
                   title: 'home',
                    tabBarIcon: ({ focused }) => (
                    <Image
                      source={focused ? PurrHomeActive : PurrHome}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  ),
          }}
        />
            <Tabs.Screen
              name="map"
              options={{
                title: 'map',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={focused ? PurrLocationActive : PurrLocation}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                ),
              }}
            />
    </Tabs>
  );
}
