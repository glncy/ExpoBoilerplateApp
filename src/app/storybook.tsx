export default function StorybookScreen() {
  if (__DEV__) {
    const Storybook = require("@/.storybook").default;
    return <Storybook />;
  } else {
    return null;
  }
}
