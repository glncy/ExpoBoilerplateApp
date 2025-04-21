import type { StorybookConfig } from "@storybook/react-native-web-vite";
import tailwindcss from "tailwindcss";

// TODO: having some issues about tailwindcss and vite
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      pluginReactOptions: {
        jsxImportSource: "nativewind",
      },
    },
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            ".mjs": "jsx",
          },
        },
      },
      css: {
        postcss: {
          plugins: [tailwindcss()],
        },
      },
    });
  },
};

export default config;
