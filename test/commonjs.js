const {
  ColorConverter,
  AbstractConversionMethods,
} = require("../dist/lib/commonjs/index");

// const color = "DeepSkyBlue";
// const converter1 = new ColorConverter("name", color);

const color = "#00bfff";
const converter1 = new ColorConverter("hex", color);

// const color = "#406273";
// const converter1 = new ColorConverter("hex", color);

// const color = { red: 64, green: 98, blue: 115 };
// const converter1 = new ColorConverter("rgb", color);

// const color = { hue: 200, saturation: 28, lightness: 35 };
// const converter1 = new ColorConverter("hsl", color);

// const color = { hue: 200, whiteness: 25, blackness: 55 };
// const converter1 = new ColorConverter("hwb", color);

// const color = { hue: 200, saturation: 44, value: 45 };
// const converter1 = new ColorConverter("hsv", color);

// const color = { cyan: 44, magenta: 15, yellow: 0, key: 55 };
// const converter1 = new ColorConverter("cmyk", color);

const allModels = converter1.getAllColorModels();
console.log({ allModels });
