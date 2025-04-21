const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const defaultConfig = getDefaultConfig(__dirname);

// NativeWind configuration
let config = withNativeWind(defaultConfig, { input: "./src/global.css" });

// Storybook configuration
config = withStorybook(config, {
  enabled: Boolean(__DEV__),
  onDisabledRemoveStorybook: true,
  websockets: {
    port: 7007,
    host: "localhost",
  },
});

// Drizzle Configuration
config.resolver.sourceExts.push('sql');

module.exports = config;
