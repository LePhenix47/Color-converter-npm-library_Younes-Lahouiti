import { colorArray } from "../variables/color-names.variables";
import {
  RedGreenBlue,
  HueSaturationLightness,
  HueWhitenessBlackness,
  HueSaturationValue,
  CyanMagentaYellowKey,
  NameColor,
  ColorRepresentation,
} from "../variables/color-types.variables";

/**
 * Abstract class containing conversion methods for various color models.
 */
export class AbstractConversionMethods {
  /**
   * Converts RGB color to hexadecimal format.
   * @param {RedGreenBlue} color - The RGB color object.
   * @returns {string} The color in hexadecimal format.
   */
  fromRgbToHex(color: RedGreenBlue): string {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("red") ||
      !color.hasOwnProperty("green") ||
      !color.hasOwnProperty("blue");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: red, green or blue"
      );
    }

    const { red, green, blue } = color;

    const argumentsAreInvalid: boolean =
      !Number.isInteger(red) ||
      !Number.isInteger(green) ||
      !Number.isInteger(blue) ||
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255;
    if (argumentsAreInvalid) {
      throw new Error(
        `Invalid RGB color values. Expected integers between 0 and 255, but received: red=${red}, green=${green}, blue=${blue}`
      );
    }

    const hexadecimalRed: string =
      toBase16(red).length < 2 ? `0${toBase16(red)}` : toBase16(red);

    const hexadecimalGreen: string =
      toBase16(green).length < 2 ? `0${toBase16(green)}` : toBase16(green);

    const hexadecimalBlue: string =
      toBase16(blue).length < 2 ? `0${toBase16(blue)}` : toBase16(blue);

    function toBase16(number: number) {
      return number.toString(16);
    }

    return `#${hexadecimalRed}${hexadecimalGreen}${hexadecimalBlue}`;
  }

  /**
   * Converts a color in hexadecimal format to RGB.
   * @param {string} color - The color in hexadecimal format.
   * @returns {RedGreenBlue} The RGB color object.
   */
  fromHexToRgb(color: string): RedGreenBlue {
    const colorArgumentIsInvalid: boolean =
      typeof color !== "string" || color?.length < 6 || color?.length > 7;
    if (colorArgumentIsInvalid) {
      throw new Error(
        `Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ${color.length}`
      );
    }

    let hexColor: string = color.charAt(0) === "#" ? color.slice(1) : color;

    let redBase16: string = hexColor.substring(0, 2);
    let greeBase16: string = hexColor.substring(2, 4);
    let blueBase16: string = hexColor.substring(4, 6);

    let base16NumbersArray: string[] = [redBase16, greeBase16, blueBase16];

    let base10NumbersArrays: number[] = [];

    for (let i = 0; i < base16NumbersArray.length; i++) {
      const colorBase16: string = base16NumbersArray[i];

      const colorBase10: number = Number(`0x${colorBase16}`);

      base10NumbersArrays.push(colorBase10);
    }

    const [redBase10, greenBase10, blueBase10]: number[] = base10NumbersArrays;

    return { red: redBase10, green: greenBase10, blue: blueBase10 };
  }

  /**
   * Converts RGB color to HSL (Hue, Saturation, Lightness).
   * @param {RedGreenBlue} color - The RGB color object.
   * @returns {HueSaturationLightness} The HSL color object.
   */
  fromRgbToHsl(color: RedGreenBlue): HueSaturationLightness {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("red") ||
      !color.hasOwnProperty("green") ||
      !color.hasOwnProperty("blue");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: red, green or blue"
      );
    }

    const { red, green, blue } = color;

    const argumentsAreInvalid: boolean =
      !Number.isInteger(red) ||
      !Number.isInteger(green) ||
      !Number.isInteger(blue) ||
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255;
    if (argumentsAreInvalid) {
      throw new Error(
        `Invalid RGB color values. Expected integers between 0 and 255, but received: red=${red}, green=${green}, blue=${blue}`
      );
    }

    // Normalize RGB values
    const normalizedRed: number = red / 255;
    const normalizedGreen: number = green / 255;
    const normalizedBlue: number = blue / 255;

    // Find the maximum and minimum values of RGB
    const max: number = Math.max(
      normalizedRed,
      normalizedGreen,
      normalizedBlue
    );
    const min: number = Math.min(
      normalizedRed,
      normalizedGreen,
      normalizedBlue
    );

    const delta: number = max - min;
    // Calculate the lightness
    const lightness: number = (max + min) / 2;

    // Calculate the saturation
    let saturation: number = NaN;
    // Calculate the hue
    let hue: number = NaN;

    const isAchromatic: boolean = max === min;
    if (isAchromatic) {
      hue = 0; // achromatic (gray)
      saturation = 0;
    } else {
      saturation =
        lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      switch (max) {
        case normalizedRed: {
          hue =
            ((normalizedGreen - normalizedBlue) / delta +
              (normalizedGreen < normalizedBlue ? 6 : 0)) /
            6;
          break;
        }

        case normalizedGreen: {
          hue = ((normalizedBlue - normalizedRed) / delta + 2) / 6;
          break;
        }

        case normalizedBlue: {
          hue = ((normalizedRed - normalizedGreen) / delta + 4) / 6;
          break;
        }
      }
    }

    // Round the values and multiply saturation and lightness by 100
    const roundedHue: number = Math.round(hue * 360) % 360;
    const roundedSaturation: number = Math.round(saturation * 100);
    const roundedLightness: number = Math.round(lightness * 100);

    // Return the HSL color value as a string
    return {
      hue: roundedHue,
      saturation: roundedSaturation,
      lightness: roundedLightness,
    };
  }

  /**
   * Converts HSL (Hue, Saturation, Lightness) color to RGB.
   * @param {HueSaturationLightness} color - The HSL color object.
   * @returns {RedGreenBlue} The RGB color object.
   */
  fromHslToRgb(color: HueSaturationLightness): RedGreenBlue {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("hue") ||
      !color.hasOwnProperty("saturation") ||
      !color.hasOwnProperty("lightness");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: hue, saturation or lightness"
      );
    }

    const { hue, saturation, lightness } = color;

    const normalizedSaturation: number = saturation / 100;
    const normalizedLightness: number = lightness / 100;

    /**
     * Calculates the color component based on the given color value.
     * The color component represents the intensity of a specific color (red, green, or blue)
     * in the RGB color model.
     *
     * @link https://en.wikipedia.org/wiki/Color_space
     *
     * @param {number} colorValue - The color value to calculate the component for.
     * @returns {number} - The calculated color component.
     */
    function calculateComponent(colorValue: number): number {
      const colorComponent: number = (colorValue + hue / 30) % 12;
      const chroma: number =
        normalizedSaturation *
        Math.min(normalizedLightness, 1 - normalizedLightness);
      return (
        normalizedLightness -
        chroma *
          Math.max(-1, Math.min(colorComponent - 3, 9 - colorComponent, 1))
      );
    }

    return {
      red: Math.round(calculateComponent(0) * 255),
      green: Math.round(calculateComponent(8) * 255),
      blue: Math.round(calculateComponent(4) * 255),
    };
  }

  /**
   * Converts RGB color to HWB (Hue, Whiteness, Blackness).
   * @param {RedGreenBlue} color - The RGB color object.
   * @returns {HueWhitenessBlackness} The HWB color object.
   */
  fromRgbToHwb(color: RedGreenBlue): HueWhitenessBlackness {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("red") ||
      !color.hasOwnProperty("green") ||
      !color.hasOwnProperty("blue");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: red, green or blue"
      );
    }

    const { red, green, blue } = color;

    const argumentsAreInvalid: boolean =
      !Number.isInteger(red) ||
      !Number.isInteger(green) ||
      !Number.isInteger(blue) ||
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255;
    if (argumentsAreInvalid) {
      throw new Error(
        `Invalid RGB color values. Expected integers between 0 and 255, but received: red=${red}, green=${green}, blue=${blue}`
      );
    }

    const normalizedRed: number = red / 255;
    const normalizedGreen: number = green / 255;
    const normalizedBlue: number = blue / 255;

    const { hue } = this.fromRgbToHsl(color);

    const whiteness: number = Math.min(
      normalizedRed,
      normalizedGreen,
      normalizedBlue
    );
    const blackness: number =
      1 - Math.max(normalizedRed, normalizedGreen, normalizedBlue);

    return {
      hue: hue % 360,
      whiteness: Math.round(whiteness * 100),
      blackness: Math.round(blackness * 100),
    };
  }

  /**
   * Converts HWB (Hue, Whiteness, Blackness) color to RGB.
   * @param {HueWhitenessBlackness} color - The HWB color object.
   * @returns {RedGreenBlue} The RGB color object.
   */
  fromHwbToRgb(color: HueWhitenessBlackness): RedGreenBlue {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("hue") ||
      !color.hasOwnProperty("whiteness") ||
      !color.hasOwnProperty("blackness");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: hue, whiteness or blackness"
      );
    }

    const { hue, whiteness, blackness } = color;

    const normalizedWhiteness: number = whiteness / 100;
    const normalizedBlackness: number = blackness / 100;

    const isGrey: boolean = normalizedWhiteness + normalizedBlackness >= 1;
    if (isGrey) {
      const greyColor: number =
        normalizedWhiteness / (normalizedWhiteness + normalizedBlackness);

      return {
        red: Math.round(greyColor * 100),
        green: Math.round(greyColor * 100),
        blue: Math.round(greyColor * 100),
      };
    }
    const { red, green, blue } = this.fromHslToRgb({
      hue,
      saturation: 100,
      lightness: 50,
    });

    const normalizedRed = red / 255;
    const normalizedGreen = green / 255;
    const normalizedBlue = blue / 255;

    const calculatedRed: number =
      normalizedRed * (1 - normalizedWhiteness - normalizedBlackness) +
      normalizedWhiteness;
    const calculatedGreen: number =
      normalizedGreen * (1 - normalizedWhiteness - normalizedBlackness) +
      normalizedWhiteness;
    const calculatedBlue: number =
      normalizedBlue * (1 - normalizedWhiteness - normalizedBlackness) +
      normalizedWhiteness;

    return {
      red: Math.round(calculatedRed * 255),
      green: Math.round(calculatedGreen * 255),
      blue: Math.round(calculatedBlue * 255),
    };
  }

  /**
   * Converts RGB color to HSV (Hue, Saturation, Value).
   * @param {RedGreenBlue} color - The RGB color object.
   * @returns {HueSaturationValue} The HSV color object.
   */
  fromRgbToHsv(color: RedGreenBlue): HueSaturationValue {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("red") ||
      !color.hasOwnProperty("green") ||
      !color.hasOwnProperty("blue");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: red, green or blue"
      );
    }

    const { red, green, blue } = color;

    const argumentsAreInvalid: boolean =
      !Number.isInteger(red) ||
      !Number.isInteger(green) ||
      !Number.isInteger(blue) ||
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255;
    if (argumentsAreInvalid) {
      throw new Error(
        `Invalid RGB color values. Expected integers between 0 and 255, but received: red=${red}, green=${green}, blue=${blue}`
      );
    }

    const min: number = Math.min(red, green, blue);
    const max: number = Math.max(red, green, blue);

    const { hue } = this.fromRgbToHsl(color);

    const normalizedSaturation: number = max !== 0 ? 1 - min / max : 0;
    const normalizedValue: number = max / 255;

    return {
      hue: hue % 360,
      saturation: Math.round(normalizedSaturation * 100),
      value: Math.round(normalizedValue * 100),
    };
  }

  /**
   * Converts HSV (Hue, Saturation, Value) color to RGB.
   * @param {HueSaturationValue} color - The HSV color object.
   * @returns {RedGreenBlue} The RGB color object.
   */
  fromHsvToRgb(color: HueSaturationValue): RedGreenBlue {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("hue") ||
      !color.hasOwnProperty("saturation") ||
      !color.hasOwnProperty("value");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: hue, saturation or value"
      );
    }

    const { hue, saturation, value } = color;

    // Normalize saturation and value to the range of 0-1
    const normalizedSaturation = saturation / 100;
    const normalizedValue = value / 100;

    // Calculate intermediate values
    const chroma: number = normalizedValue * normalizedSaturation;
    const hueSegment: number = hue / 60;
    const intermediate: number = chroma * (1 - Math.abs((hueSegment % 2) - 1));
    const lightnessAdjustment: number = normalizedValue - chroma;

    let normalizedRed: number;
    let normalizedGreen: number;
    let normalizedBlue: number;

    // Determine the RGB values based on the hue segment
    if (hueSegment >= 0 && hueSegment < 1) {
      normalizedRed = chroma;
      normalizedGreen = intermediate;
      normalizedBlue = 0;
    } else if (hueSegment >= 1 && hueSegment < 2) {
      normalizedRed = intermediate;
      normalizedGreen = chroma;
      normalizedBlue = 0;
    } else if (hueSegment >= 2 && hueSegment < 3) {
      normalizedRed = 0;
      normalizedGreen = chroma;
      normalizedBlue = intermediate;
    } else if (hueSegment >= 3 && hueSegment < 4) {
      normalizedRed = 0;
      normalizedGreen = intermediate;
      normalizedBlue = chroma;
    } else if (hueSegment >= 4 && hueSegment < 5) {
      normalizedRed = intermediate;
      normalizedGreen = 0;
      normalizedBlue = chroma;
    } else {
      normalizedRed = chroma;
      normalizedGreen = 0;
      normalizedBlue = intermediate;
    }

    // Adjust the RGB values by adding the calculated intermediate values
    normalizedRed += lightnessAdjustment;
    normalizedGreen += lightnessAdjustment;
    normalizedBlue += lightnessAdjustment;

    // Return the resulting RGB values in the range of 0-255
    return {
      red: Math.round(normalizedRed * 255),
      green: Math.round(normalizedGreen * 255),
      blue: Math.round(normalizedBlue * 255),
    };
  }

  /**
   * Converts an RGB color value to CMYK color representation.
   * @param {RedGreenBlue} color - The RGB color object.
   * @returns {CyanMagentaYellowKey} The CMYK color object.
   */
  fromRgbToCmyk(color: RedGreenBlue): CyanMagentaYellowKey {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("red") ||
      !color.hasOwnProperty("green") ||
      !color.hasOwnProperty("blue");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: red, green or blue"
      );
    }

    const { red, green, blue } = color;

    const argumentsAreInvalid: boolean =
      !Number.isInteger(red) ||
      !Number.isInteger(green) ||
      !Number.isInteger(blue) ||
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255;
    if (argumentsAreInvalid) {
      throw new Error(
        `Invalid RGB color values. Expected integers between 0 and 255, but received: red=${red}, green=${green}, blue=${blue}`
      );
    }

    const normalizedRed: number = red / 255;
    const normalizedGreen: number = green / 255;
    const normalizedBlue: number = blue / 255;

    const maxRgbValue: number = Math.max(
      normalizedRed,
      normalizedGreen,
      normalizedBlue
    );

    const cyan: number =
      maxRgbValue !== 0
        ? Math.round((1 - normalizedRed / maxRgbValue) * 100)
        : 0;
    const magenta: number =
      maxRgbValue !== 0
        ? Math.round((1 - normalizedGreen / maxRgbValue) * 100)
        : 0;
    const yellow: number =
      maxRgbValue !== 0
        ? Math.round((1 - normalizedBlue / maxRgbValue) * 100)
        : 0;

    const key: number = Math.round((1 - maxRgbValue) * 100);

    return { cyan, magenta, yellow, key };
  }

  /**
   * Converts a CMYK color value to RGB color representation.
   * @param {CyanMagentaYellowKey} color - The CMYK color object.
   * @returns {RedGreenBlue} The RGB color object.
   */
  fromCmykToRgb(color: CyanMagentaYellowKey): RedGreenBlue {
    const hasNotNecessaryProperties: boolean =
      !color.hasOwnProperty("cyan") ||
      !color.hasOwnProperty("magenta") ||
      !color.hasOwnProperty("yellow") ||
      !color.hasOwnProperty("key");
    // Verify color object properties
    if (hasNotNecessaryProperties) {
      throw new Error(
        "Invalid color object. Missing required properties: cyan, magenta, yellow or key "
      );
    }

    const { cyan, magenta, yellow, key } = color;

    const normalizedCyan: number = cyan / 100;
    const normalizedMagenta: number = magenta / 100;
    const normalizedYellow: number = yellow / 100;
    const normalizedKey: number = key / 100;

    const maxCmykValue: number = 1 - normalizedKey;

    const red: number = Math.round((1 - normalizedCyan) * maxCmykValue * 255);
    const green: number = Math.round(
      (1 - normalizedMagenta) * maxCmykValue * 255
    );
    const blue: number = Math.round(
      (1 - normalizedYellow) * maxCmykValue * 255
    );

    return { red, green, blue };
  }

  /**
   * Converts a hexadecimal color value to the corresponding color name.
   * @param {string} color - The hexadecimal color value.
   * @returns {string | null} The corresponding color name, or null if not found.
   */
  fromHexToName(color: string): string | null {
    const argumentIsInvalid: boolean =
      typeof color !== "string" || color.length < 6 || color.length > 7;
    if (argumentIsInvalid) {
      throw new Error(
        `Argument passed is invalid: ${
          typeof color !== "string"
            ? "not a string"
            : `has wrong hex length: ${color.length}`
        }`
      );
    }

    let normalizedColor: string =
      color.charAt(0) === "#" ? color.slice(1) : color;

    normalizedColor = normalizedColor.toLowerCase();

    const nameColorObject: NameColor = colorArray.find(
      (currentNameColorObject: NameColor) => {
        const { hexValue } = currentNameColorObject;

        const normalizedHexValue: string = hexValue.toLowerCase();
        return normalizedColor === normalizedHexValue;
      }
    );

    return nameColorObject?.name || null;
  }

  /**
   * Converts a color name to the corresponding hexadecimal color value.
   * @param {string} color - The color name.
   * @returns {string | null} The corresponding hexadecimal color value, or null if not found.
   */
  fromNameToHex(color: string): string | null {
    const argumentIsInvalid: boolean = typeof color !== "string";
    if (argumentIsInvalid) {
      throw new Error(`Argument passed is invalid: not a color name string`);
    }

    let normalizedColor: string = color.toLowerCase();

    const nameColorObject: NameColor = colorArray.find(
      (currentNameColorObject: NameColor) => {
        const { name } = currentNameColorObject;
        const normalizedName: string = name.toLowerCase();
        return normalizedColor === normalizedName;
      }
    );

    return nameColorObject?.hexValue || null;
  }
}

/**
 * ColorConverter class that extends AbstractConversionMethods.
 */
export class ColorConverter extends AbstractConversionMethods {
  color: ColorRepresentation;

  private normalizedColor: RedGreenBlue;

  currentModel: string;

  /**
   * Constructs a ColorConverter object.
   * @param {string} currentModel - The current color model.
   * @param {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} color - The color value.
   */
  constructor(currentModel: string, color: ColorRepresentation) {
    super();

    this.setNewColor(color, currentModel);

    this.normalizedColor = { red: 0, blue: 0, green: 0 };

    this.normalizeToRgb();
  }

  /**
   * Normalizes the color to RGB format to be later convert back into another one
   * @returns {RedGreenBlue} The normalized RGB color value.
   */
  private normalizeToRgb(): RedGreenBlue | void {
    switch (this.currentModel) {
      case "hex": {
        this.normalizedColor = this.fromHexToRgb(this.color as string);
        break;
      }

      case "rgb": {
        this.normalizedColor = this.color as RedGreenBlue;
        break;
      }

      case "hsl": {
        this.normalizedColor = this.fromHslToRgb(
          this.color as HueSaturationLightness
        );
        break;
      }
      case "hwb": {
        this.normalizedColor = this.fromHwbToRgb(
          this.color as HueWhitenessBlackness
        );
        break;
      }
      case "hsv": {
        this.normalizedColor = this.fromHsvToRgb(
          this.color as HueSaturationValue
        );
        break;
      }

      case "cmyk": {
        this.normalizedColor = this.fromCmykToRgb(
          this.color as CyanMagentaYellowKey
        );
        break;
      }

      case "name": {
        const hexColor: string = this.fromNameToHex(this.color as string);
        this.normalizedColor = this.fromHexToRgb(hexColor);
        break;
      }

      default: {
        throw new Error(`Invalid color model for "${this.currentModel}"`);
      }
    }
  }

  /**
   * Sets a new color + target model to the instance class
   * @returns {void}
   */
  setNewColor(newColor: ColorRepresentation, newTargetModel: string): void {
    this.color = newColor;

    this.currentModel = newTargetModel.toLowerCase();

    this.normalizeToRgb();
  }

  /**
   * Converts the color to the specified color model.
   * @param {string} targetModel - The target color model.
   * @returns {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} The converted color value.
   */
  convertTo(targetModel: string): ColorRepresentation {
    targetModel = targetModel.toLowerCase();

    switch (targetModel) {
      case "hex": {
        return this.fromRgbToHex(this.normalizedColor);
      }
      case "rgb": {
        return this.normalizedColor;
      }
      case "hsl": {
        return this.fromRgbToHsl(this.normalizedColor);
      }
      case "hwb": {
        return this.fromRgbToHwb(this.normalizedColor);
      }
      case "hsv": {
        return this.fromRgbToHsv(this.normalizedColor);
      }
      case "cmyk": {
        return this.fromRgbToCmyk(this.normalizedColor);
      }
      case "name": {
        const hexColor: string = this.fromRgbToHex(
          this.normalizedColor as RedGreenBlue
        );

        return this.fromHexToName(hexColor);
      }

      default: {
        throw new Error(`Invalid color model for "${this.currentModel}"`);
      }
    }
  }

  /**
   * Retrieves all color models for the current color.
   * @returns {Array} An array containing the color values in different color models.
   */
  getAllColorModels(): ColorRepresentation[] {
    const hexColor: string = this.fromRgbToHex(
      this.normalizedColor as RedGreenBlue
    );

    const rgbColor: RedGreenBlue = this.normalizedColor;

    const hslColor: HueSaturationLightness = this.fromRgbToHsl(
      this.normalizedColor
    );

    const hwbColor: HueWhitenessBlackness = this.fromRgbToHwb(
      this.normalizedColor
    );

    const hsvColor: HueSaturationValue = this.fromRgbToHsv(
      this.normalizedColor
    );

    const cmykColor: CyanMagentaYellowKey = this.fromRgbToCmyk(
      this.normalizedColor
    );

    const nameColor: string | null = this.fromHexToName(hexColor);

    return [
      nameColor,
      hexColor,
      rgbColor,
      hslColor,
      hwbColor,
      hsvColor,
      cmykColor,
    ];
  }
}
