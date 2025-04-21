// TODO: Configure storybook

import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { StyleSheet, View } from "react-native";

import Toast from "./Toast";

type ToastArgs = React.ComponentProps<typeof Toast>;
type Story = StoryObj<ToastArgs>;

// Description of the component
// Use markdown syntax for the description
const description = `
Inherits (and extends) the [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) component from React Native.
`;

const ToastMeta: Meta<ToastArgs> = {
  title: "Molecules/Toast",
  component: Toast,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Hello world",
  },
  decorators: [
    (Story: StoryFn) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
  tags: ["autodocs"],
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default ToastMeta;

export const Basic: Story = {
  args: {
    text: "Another example",
  },
};
