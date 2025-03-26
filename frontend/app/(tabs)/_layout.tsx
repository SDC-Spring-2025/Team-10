import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name='index'
        options={{ headerTitle: 'Welcome User'}}
      />
      <Tabs.Screen name='Summary' 
        options={{headerTitle: 'Summary'}}
      />
    </Tabs>
  );
}
