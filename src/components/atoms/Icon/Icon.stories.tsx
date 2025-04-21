import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { StyleSheet, View } from "react-native";

import Icon, { IconList} from "./Icon";

type IconArgs = React.ComponentProps<typeof Icon>;
type Story = StoryObj<IconArgs>;

// Description of the component
// Use markdown syntax for the description
// TODO: Description
const description = `
Inherits (and extends) the [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) component from React Native.
`;

const IconMeta: Meta<IconArgs> = {
  title: "Atoms/Icon",
  component: Icon,
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: Object.values(IconList),
      },
    }
  },
  args: {
    icon: IconList.Camera,
    className: "text-black",
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

export default IconMeta;

export const Default: Story = {};
