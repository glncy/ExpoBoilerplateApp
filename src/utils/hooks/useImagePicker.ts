import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

export type UseImagePickerType = "camera" | "mediaLibrary";

const openSettingsPrompt = (accessType: "camera" | "mediaLibrary") => {
  const title = accessType === "camera" ? "Camera" : "Media Library";
  Alert.alert(
    `Access Required for ${title}`,
    `We need access to your ${title.toLowerCase()} to send images. Please enable it in the settings to continue.`,
    [
      {
        text: "Open Settings",
        onPress: () => Linking.openSettings(),
      },
      {
        text: "Maybe Later",
        onPress: () => null,
      },
    ]
  );
};

export const useImagePicker = () => {
  const [cameraStatus, cameraRequest] = ImagePicker.useCameraPermissions();
  const [mediaLibStatus, mediaLibRequest] =
    ImagePicker.useMediaLibraryPermissions();

  const handleLaunchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
    });
    return result;
  };

  const handleLaunchMediaLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });
    return result;
  };

  const openCamera =
    async (): Promise<ImagePicker.ImagePickerResult | null> => {
      if (
        cameraStatus?.status === ImagePicker.PermissionStatus.UNDETERMINED ||
        (cameraStatus?.status === ImagePicker.PermissionStatus.DENIED &&
          cameraStatus?.canAskAgain)
      ) {
        const permission = await cameraRequest();
        if (permission.granted) {
          return await handleLaunchCamera();
        }
        return null;
      }

      if (cameraStatus?.status === ImagePicker.PermissionStatus.DENIED) {
        openSettingsPrompt("camera");
        return null;
      }

      return await handleLaunchCamera();
    };

  const openMediaLibrary =
    async (): Promise<ImagePicker.ImagePickerResult | null> => {
      if (
        mediaLibStatus?.status === ImagePicker.PermissionStatus.UNDETERMINED ||
        (mediaLibStatus?.status === ImagePicker.PermissionStatus.DENIED &&
          mediaLibStatus?.canAskAgain)
      ) {
        const permission = await mediaLibRequest();
        if (permission.granted) {
          return await handleLaunchMediaLibrary();
        }
        return null;
      }

      if (mediaLibStatus?.status === ImagePicker.PermissionStatus.DENIED) {
        openSettingsPrompt("mediaLibrary");
        return null;
      }

      return await handleLaunchMediaLibrary();
    };

  return { openCamera, openMediaLibrary };
};
