const {
  ColorConverter,
  AbstractConversionMethods,
} = require("../dist/lib/commonjs/index");

const color = { hue: 160, saturation: 100, lightness: 75 };
const converter = new ColorConverter("hsl", color);

const hexColor = converter.convertTo("name");
console.log(!!hexColor ? hexColor : "Not found, gave undefined");

const allModels = converter.getAllColorModels();
console.log({ allModels });
