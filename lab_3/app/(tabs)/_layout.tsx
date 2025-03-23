import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { Text } from 'react-native';
import { useGesture } from '~/contexts/GestureContext';

export default function TabLayout() {
  const { score } = useGesture();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Game',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => <Text className="text-lg">{score}</Text>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
