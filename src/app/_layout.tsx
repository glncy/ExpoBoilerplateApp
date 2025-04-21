import "@/src/global.css";

import React from "react";
import { ExpoDevMenuItem, registerDevMenuItems } from "expo-dev-menu";
import { router, Slot } from "expo-router";
import { Platform } from "react-native";
import { PortalHost } from "@rn-primitives/portal";

if (__DEV__ && Platform.OS !== "web") {
  const devMenuItems: ExpoDevMenuItem[] = [
    {
      name: "Open Storybook",
      callback: () => router.replace("/storybook"),
    },
    {
      name: "Open Main App",
      callback: () => router.replace("/"),
    },
  ];
  registerDevMenuItems(devMenuItems);
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <PortalHost />
    </>
  );
}
