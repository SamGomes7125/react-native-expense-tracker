import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="add-expense" options={{ title: "Add Expense" }} />
      <Tabs.Screen name="list" options={{ title: "Expenses" }} />
      <Tabs.Screen name="analytics" options={{ title: "Analytics" }} />
      <Tabs.Screen name="expenses" options={{ title: "Expenses" }} />
    </Tabs>
  );
}
