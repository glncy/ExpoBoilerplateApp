import { Stack, Unmatched } from "expo-router";

const NotFound = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Unmatched />
    </>
  );
};

export default NotFound;
