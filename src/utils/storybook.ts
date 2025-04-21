import Constants from "expo-constants";

export const isStorybookEnabled =
  Constants.expoConfig &&
  Constants.expoConfig.extra &&
  Constants.expoConfig.extra.storybookEnabled === "1";
