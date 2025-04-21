import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Stack>
        {/* <Stack.Screen
          name="sample-with-formsheet"
          options={{
            presentation: Platform.select({
              ios: "modal",
              android: "formSheet",
            }),
          }}
        /> */}
      </Stack>
    </>
  );
}
