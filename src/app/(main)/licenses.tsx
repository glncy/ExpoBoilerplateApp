import { Stack } from "expo-router";
import { View, Image, Linking, Pressable } from "react-native";
import { Text } from "@/src/components/reusables/ui/text";
import { FlashList } from "@shopify/flash-list";
import licensesJson from "@/licenses.json";

const extractNameFromGithubUrl = (url: string) => {
  if (!url) {
    return null;
  }

  const reg =
    /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
};

export default function Licenses() {
  const licenses = Object.entries(licensesJson).map(([name, info]) => {
    const split = name.split("@");
    const licenseInfo = info as {
      licenses: string;
      repository: string;
      licenseUrl: string;
    };

    let packageName = split[0];
    let version = split[1];

    if (split.length > 2) {
      packageName = `@${split[1]}`;
      version = split[2];
    }

    let username =
      extractNameFromGithubUrl(licenseInfo.repository) ||
      extractNameFromGithubUrl(licenseInfo.licenseUrl);

    return {
      packageName: packageName,
      version: version,
      info: licenseInfo,
      image: `http://github.com/${username}.png`,
      username,
    };
  });

  const openUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <>
      <Stack.Screen />
      <View className="flex-1">
        <Text className="px-3 py-3">♥️ Thanks to the following open source libraries:</Text>
        <FlashList
          data={licenses}
          renderItem={({ item }) => (
            <Pressable
              className="flex flex-row items-center justify-between px-3 py-3 active:opacity-50"
              onPress={() =>
                openUrl(item.info.licenseUrl || item.info.repository)
              }
            >
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-12 h-12 rounded"
                />
                <View className="ml-2">
                  <Text className="text-base">{item.packageName}</Text>
                  <Text className="text-sm text-gray-500">
                    {item.version} {item.username ? `- ${item.username}` : ""}
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500">
                {item.info.licenses}
              </Text>
            </Pressable>
          )}
          estimatedItemSize={100}
          contentContainerClassName="pb-safe"
        />
      </View>
    </>
  );
}
