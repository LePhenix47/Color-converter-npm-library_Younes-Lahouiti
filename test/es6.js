import {
  ColorConverter,
  AbstractConversionMethods,
} from "../dist/lib/es6/index";

const color = { hue: 200, saturation: 28, lightness: 35 };
const converter = new ColorConverter("hsl", color);

const hexColor = converter.convertTo("hex");
