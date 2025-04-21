import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function MainApp() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.replace("/auth"), 2000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" className="h-16 w-16" />
    </View>
  );
}
