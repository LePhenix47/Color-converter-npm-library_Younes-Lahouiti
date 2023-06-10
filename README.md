# @lephenix47/color-converter

## Table of Contents

- [@lephenix47/color-converter](#lephenix47color-converter)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Importing the Library](#importing-the-library)
    - [Supported color models](#supported-color-models)
    - [Creating Color Objects](#creating-color-objects)
    - [Converting Color Models](#converting-color-models)
  - [Available Conversion Methods](#available-conversion-methods)
  - [Miscellaneous](#miscellaneous)
  - [Conclusion](#conclusion)

## Introduction

The `@lephenix47/color-converter` library is a powerful tool for working with color models in JavaScript. It provides various classes and methods to convert between different color models, manipulate color values, and perform color-related operations.

## Installation

To install my NPM Library, you can use NPM or Yarn:

```shell
npm install @lephenix47/color-converter
```

or

```shell
yarn add @lephenix47/color-converter
```

## Usage

### Importing the Library

To use `@lephenix47/color-converter` in your project, you need to import the necessary classes:

```javascript
import { ColorConverter } from '@lephenix47/color-converter';
```

### Supported color models

Currently the library supports 7 colors models:
`color names`, `RGB`, `HEX`, `HSL`, `HWB`, `HSV` and `CMYK`

### Creating Color Objects

To represent colors using the different color models, you can use JavaScript objects. Each object should contain the appropriate properties for the corresponding color model. Here's an example:

```js
const rgbColor = { red: 255, green: 0, blue: 0 };
const hslColor = { hue: 0, saturation: 100, lightness: 50 };
const hwbColor = { hue: 120, whiteness: 0, blackness: 0 };
const hsvColor = { hue: 200, saturation: 28, value: 35 };
const cmyk = { cyan:0, magenta: 100, yellow: 100, key: 0 };
```

On the other hand, you can specify the hexadecimal value as a string, with or without the '#' symbol. For example:

```js
const colorHex1 = "#0000FF"; // Hexadecimal color with the '#' symbol
const colorHex2 = "AA83F5"; // Hexadecimal color without the '#' symbol

const colorName1 = "rebeccapurple" //All lowercase
const colorName2 = "DarkBlue" //In titlecase
```

### Converting Color Models

To convert colors between different color models, follow these steps:

1. Create a `ColorConverter` instance by specifying the source color model and the color values.

It is important that rgb, hsl, hwb and hsv values are create with an object for example:

For example:

```js
const color = { hue: 200, saturation: 28, lightness: 35 };
const converter = new ColorConverter('hsl', color);
```

2. Use the `convertTo` method to convert the color to the desired color model. For example, to convert to the hexadecimal representation:

```js
const hexColor = converter.convertTo('hex');
```

## Available Conversion Methods

To get a list of all available color models supported by `@lephenix47/color-converter`, you can use the `getAllColorModels` method. This method returns an array of strings representing the supported color models. For example:

```js
const allModels = converter.getAllColorModels();
console.log(allModels);
```

The `allModels` variable will contain an array of strings representing the available color models

## Miscellaneous

ASCII tree of the project:

```md
src/
├─ variables/
│  ├─ color-types.variables.ts
├─ classes/
│  ├─ color-conversion.classes.ts
├─ index.ts
dist/
├─ lib/
│  ├─ es6/
│  │  ├─ index.js
│  │  ├─ index.d.ts
│  │  ├─ variables/
│  │  │  ├─ color-types.variables.js
│  │  │  ├─ color-types.variables.d.ts
│  │  ├─ classes/
│  │  │  ├─ color-conversion.classes.js
│  │  │  ├─ color-conversion.classes.d.ts
│  ├─ commonjs/ # Same folder structure as es6's 
test/
├─ es6.js
├─ commonjs.js
package.json
package-lock.json
README.md
tsconfig.es5.json
tsconfig.json
.gitignore
.npmignore
```

## Conclusion

With `@lephenix47/color-converter`, you can easily work with color models and perform conversions between them. Simplify your color manipulation tasks and explore the vast possibilities of color representation in your JavaScript projects.
