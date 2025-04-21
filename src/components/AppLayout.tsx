import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { SystemBars } from "react-native-edge-to-edge";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "@/src/utils/reusables/constants";
import { useColorScheme } from "@/src/utils/reusables/useColorScheme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { DBConnectionProvider } from "@/src/providers/DBConnectionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import Toast from "@/src/components/molecules/Toast";

// Disable reanimated logs in production
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// Create a client
const queryClient = new QueryClient();

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <DBConnectionProvider>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          {/* <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}> */}
          <ThemeProvider value={LIGHT_THEME}>
            {/* <StatusBar style={isDarkColorScheme ? "light" : "dark"} /> */}
            <Toast />
            <SystemBars style="dark" />
            {children}
          </ThemeProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </DBConnectionProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
