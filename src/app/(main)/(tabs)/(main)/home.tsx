import { Button } from "@/src/components/reusables/ui/button";
import { Text } from "@/src/components/reusables/ui/text";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeTab() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this home tab.</Text>
      <Button onPress={() => router.push("/licenses")}>
        <Text>Go to Licenses</Text>
      </Button>
    </View>
  );
}
