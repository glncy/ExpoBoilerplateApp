import { set } from 'lodash';
import tinycolor from 'tinycolor2';

// generate from https://colorize-react-native-lottie.netlify.app

// values of colorByPath can be falsy to no-op
export function colorizeLottie(json: any, colorByPath: any) {
  const nextJson = JSON.parse(JSON.stringify(json));

  Object.entries(colorByPath).forEach(([path, color]) => {
    // incase undefined/null/falsy is passed to color
    if (!color) return;
    const rgbPercentages = tinycolor(color as tinycolor.ColorInput).toPercentageRgb();
    const rFraction = parseInt(rgbPercentages.r, 10) / 100;
    const gFraction = parseInt(rgbPercentages.g, 10) / 100;
    const bFraction = parseInt(rgbPercentages.b, 10) / 100;

    const pathParts = path.split('.');
    set(nextJson, [...pathParts, 0], rFraction);
    set(nextJson, [...pathParts, 1], gFraction);
    set(nextJson, [...pathParts, 2], bFraction);
  });

  return nextJson;
}