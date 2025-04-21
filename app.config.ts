import { ExpoConfig, ConfigContext } from "expo/config";
import pkg from "./package.json";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "ExpoBoilerplateApp",
  slug: pkg.name,
  version: pkg.version,
  orientation: "portrait",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.glncy.expo-boilerplate-app",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff",
    },
    package: "com.glncy.expo_boilerplate_app",
  },
  web: {
    bundler: "metro",
    output: "static",
  },
  plugins: [
    "expo-font",
    "expo-router",
    "expo-image-picker",
    "react-native-edge-to-edge",
    [
      "expo-splash-screen",
      {
        image: "./src/assets/adaptive-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "expo-sqlite",
      {
        enableFTS: true,
        useSQLCipher: true,
        android: {
          // Override the shared configuration for Android
          enableFTS: false,
          useSQLCipher: false,
        },
        ios: {
          // You can also override the shared configurations for iOS
          customBuildFlags: [
            "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
          ],
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
