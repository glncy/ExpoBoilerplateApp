import { Stack, Tabs } from "expo-router";

const MainTab = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />
      </Tabs>
    </>
  );
};

export default MainTab;
