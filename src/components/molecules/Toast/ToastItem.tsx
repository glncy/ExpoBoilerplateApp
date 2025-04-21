import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  LayoutAnimationConfig,
  LinearTransition,
  runOnJS,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/src/utils/reusables/utils";
import { Text } from "@/src/components/reusables/ui/text";
import { isValidElement, useState } from "react";
import {
  ToastItemType,
  toastManager,
} from "@/src/components/molecules/Toast/ToastManager";
import { Pressable, useWindowDimensions, View } from "react-native";
import Icon, { IconList } from "@/src/components/atoms/Icon";

interface ToastItemProps {
  toast: ToastItemType;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const { width: deviceWidth } = useWindowDimensions();
  const toastItem = toast;
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const [width, setWidth] = useState(0);
  const [skipExiting, setSkipExiting] = useState(false);
  // Default is 300 -> https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming#config-
  const removeDuration = 300;

  const removeToast = () => {
    setSkipExiting(true);
    setTimeout(() => {
      toastManager.removeToast(toastItem.id);
    }, removeDuration);
  };

  const pauseTimer = () => {
    toastItem.timer.pause();
  };

  const resumeTimer = () => {
    setTimeout(() => {
      toastItem.timer.resume();
    }, 2000);
  };

  const positionPanGesture = Gesture.Pan()
    .onUpdate((e) => {
      runOnJS(pauseTimer)();
      posY.value = e.translationY - e.translationY * 0.8;
      posX.value = e.translationX;
    })
    .onEnd(() => {
      posY.value = withSpring(0);
      const removeThreshold = width * 0.4;
      const shouldRemove = Math.abs(posX.value) > removeThreshold;
      const isRight = posX.value > 0;
      if (shouldRemove && toast.canDismiss) {
        posX.value = withTiming(isRight ? deviceWidth : -deviceWidth, {
          duration: removeDuration,
        });
        runOnJS(removeToast)();
        return;
      }

      if (toast.canDismiss) {
        runOnJS(resumeTimer)();
      }
      posX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: posX.value },
      {
        translateY: posY.value,
      },
    ],
  }));

  const getToastIcon = () => {
    switch (toastItem.type) {
      case "info":
        return IconList.Info;
      case "warning":
        return IconList.CircleAlert;
      case "success":
        return IconList.CircleCheck;
      case "error":
        return IconList.CircleX;
      default:
        return toast.icon;
    }
  };

  const toastIcon = getToastIcon();
  const Wrapper = toast.onPress ? Pressable : View;

  return (
    <GestureDetector
      gesture={Gesture.Simultaneous(positionPanGesture)}
      key={toastItem.id}
    >
      <LayoutAnimationConfig skipExiting={skipExiting}>
        <Animated.View
          layout={LinearTransition}
          entering={SlideInRight}
          exiting={SlideOutLeft}
          style={[animatedStyle]}
          onLayout={({ nativeEvent }) => {
            setWidth(nativeEvent.layout.width);
          }}
        >
          <Wrapper
            {...toast.props}
            onPress={toast.onPress}
            style={toast.style}
            className={cn(
              "bg-white p-4 rounded-2xl shadow-sm self-center flex-row mx-4",
              {
                "border border-blue-500": toastItem.type === "info",
                "border border-yellow-500": toastItem.type === "warning",
                "border border-green-500": toastItem.type === "success",
                "border border-red-500": toastItem.type === "error",
              },
              toast.onPress && "active:opacity-50",
              toast.className
            )}
          >
            {/* For Custom Toast */}
            {isValidElement(toastItem.message) && toastItem.message}
            {/* For Template Toast */}
            {!isValidElement(toastItem.message) && (
              <>
                {isValidElement(toastIcon) && toastIcon}
                {!isValidElement(toastIcon) && toastIcon && (
                  <Icon
                    {...toast._icon?.props}
                    icon={toastIcon as keyof typeof IconList}
                    size={32}
                    style={toast._icon?.style}
                    className={cn(
                      "mr-2 text-primary",
                      {
                        "text-blue-500": toastItem.type === "info",
                        "text-yellow-500": toastItem.type === "warning",
                        "text-green-500": toastItem.type === "success",
                        "text-red-500": toastItem.type === "error",
                      },
                      toast._icon?.className
                    )}
                  />
                )}
                <View
                  {...toast._body?.props}
                  style={toast._body?.style}
                  className={cn(toast._body?.className)}
                >
                  {toastItem.title && (
                    <Text
                      {...toast._title?.props}
                      style={toast._title?.style}
                      className={cn(
                        "font-bold text-lg/normal",
                        toastIcon && "mt-1",
                        toast._title?.className
                      )}
                    >
                      {toastItem.title}
                    </Text>
                  )}
                  <Text
                    {...toast._message?.props}
                    style={toast._message?.style}
                    className={cn(
                      "font-medium text-base/normal",
                      toastItem.title && toastIcon && "mt-1",
                      !toastItem.title && toastIcon && "mt-1.5",
                      !toastItem.title && !toastIcon && "mt-0",
                      toast._message?.className
                    )}
                  >
                    {toastItem.message}
                  </Text>
                </View>
              </>
            )}
          </Wrapper>
        </Animated.View>
      </LayoutAnimationConfig>
    </GestureDetector>
  );
};

export default ToastItem;
