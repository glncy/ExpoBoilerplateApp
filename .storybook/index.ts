import { view } from "./storybook.requires";

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: async (key) => {
      return null;
    },
    setItem: async (key) => {},
  },
});

export default StorybookUIRoot;
