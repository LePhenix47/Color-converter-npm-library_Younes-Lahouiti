const {
  ColorConverter,
  AbstractConversionMethods,
} = require("../dist/lib/commonjs/index");

const color = { hue: 200, saturation: 28, lightness: 35 };
const converter = new ColorConverter("hsl", color);

const hexColor = converter.convertTo("hex");
console.log(hexColor);

const allModels = converter.getAllColorModels();
console.log(allModels);
