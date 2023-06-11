"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorConverter = exports.AbstractConversionMethods = void 0;
var color_names_variables_1 = require("../variables/color-names.variables");
/**
 * Abstract class containing conversion methods for various color models.
 */
var AbstractConversionMethods = /** @class */ (function () {
    function AbstractConversionMethods() {
    }
    /**
     * Converts RGB color to hexadecimal format.
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {string} The color in hexadecimal format.
     */
    AbstractConversionMethods.prototype.fromRgbToHex = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("red") ||
            !color.hasOwnProperty("green") ||
            !color.hasOwnProperty("blue");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: red, green or blue");
        }
        var red = color.red, green = color.green, blue = color.blue;
        var argumentsAreInvalid = !Number.isInteger(red) ||
            !Number.isInteger(green) ||
            !Number.isInteger(blue) ||
            red < 0 ||
            red > 255 ||
            green < 0 ||
            green > 255 ||
            blue < 0 ||
            blue > 255;
        if (argumentsAreInvalid) {
            throw new Error("Invalid RGB color values. Expected integers between 0 and 255, but received: red=".concat(red, ", green=").concat(green, ", blue=").concat(blue));
        }
        var hexadecimalRed = toBase16(red).length < 2 ? "0".concat(toBase16(red)) : toBase16(red);
        var hexadecimalGreen = toBase16(green).length < 2 ? "0".concat(toBase16(green)) : toBase16(green);
        var hexadecimalBlue = toBase16(blue).length < 2 ? "0".concat(toBase16(blue)) : toBase16(blue);
        function toBase16(number) {
            return number.toString(16);
        }
        return "#".concat(hexadecimalRed).concat(hexadecimalGreen).concat(hexadecimalBlue);
    };
    /**
     * Converts a color in hexadecimal format to RGB.
     * @param {string} color - The color in hexadecimal format.
     * @returns {RedGreenBlue} The RGB color object.
     */
    AbstractConversionMethods.prototype.fromHexToRgb = function (color) {
        var colorArgumentIsInvalid = typeof color !== "string" || (color === null || color === void 0 ? void 0 : color.length) < 6 || (color === null || color === void 0 ? void 0 : color.length) > 7;
        if (colorArgumentIsInvalid) {
            throw new Error("Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ".concat(color.length));
        }
        var hexColor = color.charAt(0) === "#" ? color.slice(1) : color;
        var redBase16 = hexColor.substring(0, 2);
        var greeBase16 = hexColor.substring(2, 4);
        var blueBase16 = hexColor.substring(4, 6);
        var base16NumbersArray = [redBase16, greeBase16, blueBase16];
        var base10NumbersArrays = [];
        for (var i = 0; i < base16NumbersArray.length; i++) {
            var colorBase16 = base16NumbersArray[i];
            var colorBase10 = Number("0x".concat(colorBase16));
            base10NumbersArrays.push(colorBase10);
        }
        var redBase10 = base10NumbersArrays[0], greenBase10 = base10NumbersArrays[1], blueBase10 = base10NumbersArrays[2];
        return { red: redBase10, green: greenBase10, blue: blueBase10 };
    };
    /**
     * Converts RGB color to HSL (Hue, Saturation, Lightness).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueSaturationLightness} The HSL color object.
     */
    AbstractConversionMethods.prototype.fromRgbToHsl = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("red") ||
            !color.hasOwnProperty("green") ||
            !color.hasOwnProperty("blue");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: red, green or blue");
        }
        var red = color.red, green = color.green, blue = color.blue;
        var argumentsAreInvalid = !Number.isInteger(red) ||
            !Number.isInteger(green) ||
            !Number.isInteger(blue) ||
            red < 0 ||
            red > 255 ||
            green < 0 ||
            green > 255 ||
            blue < 0 ||
            blue > 255;
        if (argumentsAreInvalid) {
            throw new Error("Invalid RGB color values. Expected integers between 0 and 255, but received: red=".concat(red, ", green=").concat(green, ", blue=").concat(blue));
        }
        // Normalize RGB values
        var normalizedRed = red / 255;
        var normalizedGreen = green / 255;
        var normalizedBlue = blue / 255;
        // Find the maximum and minimum values of RGB
        var max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
        var min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
        var delta = max - min;
        // Calculate the lightness
        var lightness = (max + min) / 2;
        // Calculate the saturation
        var saturation = NaN;
        // Calculate the hue
        var hue = NaN;
        var isAchromatic = max === min;
        if (isAchromatic) {
            hue = 0; // achromatic (gray)
            saturation = 0;
        }
        else {
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
        var roundedHue = Math.round(hue * 360) % 360;
        var roundedSaturation = Math.round(saturation * 100);
        var roundedLightness = Math.round(lightness * 100);
        // Return the HSL color value as a string
        return {
            hue: roundedHue,
            saturation: roundedSaturation,
            lightness: roundedLightness,
        };
    };
    /**
     * Converts HSL (Hue, Saturation, Lightness) color to RGB.
     * @param {HueSaturationLightness} color - The HSL color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    AbstractConversionMethods.prototype.fromHslToRgb = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("hue") ||
            !color.hasOwnProperty("saturation") ||
            !color.hasOwnProperty("lightness");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: hue, saturation or lightness");
        }
        var hue = color.hue, saturation = color.saturation, lightness = color.lightness;
        var normalizedSaturation = saturation / 100;
        var normalizedLightness = lightness / 100;
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
        function calculateComponent(colorValue) {
            var colorComponent = (colorValue + hue / 30) % 12;
            var chroma = normalizedSaturation *
                Math.min(normalizedLightness, 1 - normalizedLightness);
            return (normalizedLightness -
                chroma *
                    Math.max(-1, Math.min(colorComponent - 3, 9 - colorComponent, 1)));
        }
        return {
            red: Math.round(calculateComponent(0) * 255),
            green: Math.round(calculateComponent(8) * 255),
            blue: Math.round(calculateComponent(4) * 255),
        };
    };
    /**
     * Converts RGB color to HWB (Hue, Whiteness, Blackness).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueWhitenessBlackness} The HWB color object.
     */
    AbstractConversionMethods.prototype.fromRgbToHwb = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("red") ||
            !color.hasOwnProperty("green") ||
            !color.hasOwnProperty("blue");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: red, green or blue");
        }
        var red = color.red, green = color.green, blue = color.blue;
        var argumentsAreInvalid = !Number.isInteger(red) ||
            !Number.isInteger(green) ||
            !Number.isInteger(blue) ||
            red < 0 ||
            red > 255 ||
            green < 0 ||
            green > 255 ||
            blue < 0 ||
            blue > 255;
        if (argumentsAreInvalid) {
            throw new Error("Invalid RGB color values. Expected integers between 0 and 255, but received: red=".concat(red, ", green=").concat(green, ", blue=").concat(blue));
        }
        var normalizedRed = red / 255;
        var normalizedGreen = green / 255;
        var normalizedBlue = blue / 255;
        var hue = this.fromRgbToHsl(color).hue;
        var whiteness = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
        var blackness = 1 - Math.max(normalizedRed, normalizedGreen, normalizedBlue);
        return {
            hue: hue % 360,
            whiteness: Math.round(whiteness * 100),
            blackness: Math.round(blackness * 100),
        };
    };
    /**
     * Converts HWB (Hue, Whiteness, Blackness) color to RGB.
     * @param {HueWhitenessBlackness} color - The HWB color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    AbstractConversionMethods.prototype.fromHwbToRgb = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("hue") ||
            !color.hasOwnProperty("whiteness") ||
            !color.hasOwnProperty("blackness");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: hue, whiteness or blackness");
        }
        var hue = color.hue, whiteness = color.whiteness, blackness = color.blackness;
        var normalizedWhiteness = whiteness / 100;
        var normalizedBlackness = blackness / 100;
        var isGrey = normalizedWhiteness + normalizedBlackness >= 1;
        if (isGrey) {
            var greyColor = normalizedWhiteness / (normalizedWhiteness + normalizedBlackness);
            return {
                red: Math.round(greyColor * 100),
                green: Math.round(greyColor * 100),
                blue: Math.round(greyColor * 100),
            };
        }
        var _a = this.fromHslToRgb({
            hue: hue,
            saturation: 100,
            lightness: 50,
        }), red = _a.red, green = _a.green, blue = _a.blue;
        var normalizedRed = red / 255;
        var normalizedGreen = green / 255;
        var normalizedBlue = blue / 255;
        var calculatedRed = normalizedRed * (1 - normalizedWhiteness - normalizedBlackness) +
            normalizedWhiteness;
        var calculatedGreen = normalizedGreen * (1 - normalizedWhiteness - normalizedBlackness) +
            normalizedWhiteness;
        var calculatedBlue = normalizedBlue * (1 - normalizedWhiteness - normalizedBlackness) +
            normalizedWhiteness;
        return {
            red: Math.round(calculatedRed * 255),
            green: Math.round(calculatedGreen * 255),
            blue: Math.round(calculatedBlue * 255),
        };
    };
    /**
     * Converts RGB color to HSV (Hue, Saturation, Value).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueSaturationValue} The HSV color object.
     */
    AbstractConversionMethods.prototype.fromRgbToHsv = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("red") ||
            !color.hasOwnProperty("green") ||
            !color.hasOwnProperty("blue");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: red, green or blue");
        }
        var red = color.red, green = color.green, blue = color.blue;
        var argumentsAreInvalid = !Number.isInteger(red) ||
            !Number.isInteger(green) ||
            !Number.isInteger(blue) ||
            red < 0 ||
            red > 255 ||
            green < 0 ||
            green > 255 ||
            blue < 0 ||
            blue > 255;
        if (argumentsAreInvalid) {
            throw new Error("Invalid RGB color values. Expected integers between 0 and 255, but received: red=".concat(red, ", green=").concat(green, ", blue=").concat(blue));
        }
        var min = Math.min(red, green, blue);
        var max = Math.max(red, green, blue);
        var hue = this.fromRgbToHsl(color).hue;
        var normalizedSaturation = max !== 0 ? 1 - min / max : 0;
        var normalizedValue = max / 255;
        return {
            hue: hue % 360,
            saturation: Math.round(normalizedSaturation * 100),
            value: Math.round(normalizedValue * 100),
        };
    };
    /**
     * Converts HSV (Hue, Saturation, Value) color to RGB.
     * @param {HueSaturationValue} color - The HSV color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    AbstractConversionMethods.prototype.fromHsvToRgb = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("hue") ||
            !color.hasOwnProperty("saturation") ||
            !color.hasOwnProperty("value");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: hue, saturation or value");
        }
        var hue = color.hue, saturation = color.saturation, value = color.value;
        // Normalize saturation and value to the range of 0-1
        var normalizedSaturation = saturation / 100;
        var normalizedValue = value / 100;
        // Calculate intermediate values
        var chroma = normalizedValue * normalizedSaturation;
        var hueSegment = hue / 60;
        var intermediate = chroma * (1 - Math.abs((hueSegment % 2) - 1));
        var lightnessAdjustment = normalizedValue - chroma;
        var normalizedRed;
        var normalizedGreen;
        var normalizedBlue;
        // Determine the RGB values based on the hue segment
        if (hueSegment >= 0 && hueSegment < 1) {
            normalizedRed = chroma;
            normalizedGreen = intermediate;
            normalizedBlue = 0;
        }
        else if (hueSegment >= 1 && hueSegment < 2) {
            normalizedRed = intermediate;
            normalizedGreen = chroma;
            normalizedBlue = 0;
        }
        else if (hueSegment >= 2 && hueSegment < 3) {
            normalizedRed = 0;
            normalizedGreen = chroma;
            normalizedBlue = intermediate;
        }
        else if (hueSegment >= 3 && hueSegment < 4) {
            normalizedRed = 0;
            normalizedGreen = intermediate;
            normalizedBlue = chroma;
        }
        else if (hueSegment >= 4 && hueSegment < 5) {
            normalizedRed = intermediate;
            normalizedGreen = 0;
            normalizedBlue = chroma;
        }
        else {
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
    };
    /**
     * Converts an RGB color value to CMYK color representation.
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {CyanMagentaYellowKey} The CMYK color object.
     */
    AbstractConversionMethods.prototype.fromRgbToCmyk = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("red") ||
            !color.hasOwnProperty("green") ||
            !color.hasOwnProperty("blue");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: red, green or blue");
        }
        var red = color.red, green = color.green, blue = color.blue;
        var argumentsAreInvalid = !Number.isInteger(red) ||
            !Number.isInteger(green) ||
            !Number.isInteger(blue) ||
            red < 0 ||
            red > 255 ||
            green < 0 ||
            green > 255 ||
            blue < 0 ||
            blue > 255;
        if (argumentsAreInvalid) {
            throw new Error("Invalid RGB color values. Expected integers between 0 and 255, but received: red=".concat(red, ", green=").concat(green, ", blue=").concat(blue));
        }
        var normalizedRed = red / 255;
        var normalizedGreen = green / 255;
        var normalizedBlue = blue / 255;
        var maxRgbValue = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
        var cyan = maxRgbValue !== 0
            ? Math.round((1 - normalizedRed / maxRgbValue) * 100)
            : 0;
        var magenta = maxRgbValue !== 0
            ? Math.round((1 - normalizedGreen / maxRgbValue) * 100)
            : 0;
        var yellow = maxRgbValue !== 0
            ? Math.round((1 - normalizedBlue / maxRgbValue) * 100)
            : 0;
        var key = Math.round((1 - maxRgbValue) * 100);
        return { cyan: cyan, magenta: magenta, yellow: yellow, key: key };
    };
    /**
     * Converts a CMYK color value to RGB color representation.
     * @param {CyanMagentaYellowKey} color - The CMYK color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    AbstractConversionMethods.prototype.fromCmykToRgb = function (color) {
        var hasNotNecessaryProperties = !color.hasOwnProperty("cyan") ||
            !color.hasOwnProperty("magenta") ||
            !color.hasOwnProperty("yellow") ||
            !color.hasOwnProperty("key");
        // Verify color object properties
        if (hasNotNecessaryProperties) {
            throw new Error("Invalid color object. Missing required properties: cyan, magenta, yellow or key ");
        }
        var cyan = color.cyan, magenta = color.magenta, yellow = color.yellow, key = color.key;
        var normalizedCyan = cyan / 100;
        var normalizedMagenta = magenta / 100;
        var normalizedYellow = yellow / 100;
        var normalizedKey = key / 100;
        var maxCmykValue = 1 - normalizedKey;
        var red = Math.round((1 - normalizedCyan) * maxCmykValue * 255);
        var green = Math.round((1 - normalizedMagenta) * maxCmykValue * 255);
        var blue = Math.round((1 - normalizedYellow) * maxCmykValue * 255);
        return { red: red, green: green, blue: blue };
    };
    /**
     * Converts a hexadecimal color value to the corresponding color name.
     * @param {string} color - The hexadecimal color value.
     * @returns {string | null} The corresponding color name, or null if not found.
     */
    AbstractConversionMethods.prototype.fromHexToName = function (color) {
        var argumentIsInvalid = typeof color !== "string" || color.length < 6 || color.length > 7;
        if (argumentIsInvalid) {
            throw new Error("Argument passed is invalid: ".concat(typeof color !== "string"
                ? "not a string"
                : "has wrong hex length: ".concat(color.length)));
        }
        var normalizedColor = color.charAt(0) === "#" ? color.slice(1) : color;
        normalizedColor = normalizedColor.toLowerCase();
        var nameColorObject = color_names_variables_1.colorArray.find(function (currentNameColorObject) {
            var hexValue = currentNameColorObject.hexValue;
            var normalizedHexValue = hexValue.toLowerCase();
            return normalizedColor === normalizedHexValue;
        });
        return (nameColorObject === null || nameColorObject === void 0 ? void 0 : nameColorObject.name) || null;
    };
    /**
     * Converts a color name to the corresponding hexadecimal color value.
     * @param {string} color - The color name.
     * @returns {string | null} The corresponding hexadecimal color value, or null if not found.
     */
    AbstractConversionMethods.prototype.fromNameToHex = function (color) {
        var argumentIsInvalid = typeof color !== "string";
        if (argumentIsInvalid) {
            throw new Error("Argument passed is invalid: not a color name string");
        }
        var normalizedColor = color.toLowerCase();
        var nameColorObject = color_names_variables_1.colorArray.find(function (currentNameColorObject) {
            var name = currentNameColorObject.name;
            var normalizedName = name.toLowerCase();
            return normalizedColor === normalizedName;
        });
        return (nameColorObject === null || nameColorObject === void 0 ? void 0 : nameColorObject.hexValue) || null;
    };
    return AbstractConversionMethods;
}());
exports.AbstractConversionMethods = AbstractConversionMethods;
/**
 * ColorConverter class that extends AbstractConversionMethods.
 */
var ColorConverter = /** @class */ (function (_super) {
    __extends(ColorConverter, _super);
    /**
     * Constructs a ColorConverter object.
     * @param {string} currentModel - The current color model.
     * @param {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} color - The color value.
     */
    function ColorConverter(currentModel, color) {
        var _this = _super.call(this) || this;
        _this.setNewColor(color, currentModel);
        _this.normalizedColor = { red: 0, blue: 0, green: 0 };
        _this.normalizeToRgb();
        return _this;
    }
    /**
     * Normalizes the color to RGB format to be later convert back into another one
     * @returns {RedGreenBlue} The normalized RGB color value.
     */
    ColorConverter.prototype.normalizeToRgb = function () {
        switch (this.currentModel) {
            case "hex": {
                this.normalizedColor = this.fromHexToRgb(this.color);
                break;
            }
            case "rgb": {
                this.normalizedColor = this.color;
                break;
            }
            case "hsl": {
                this.normalizedColor = this.fromHslToRgb(this.color);
                break;
            }
            case "hwb": {
                this.normalizedColor = this.fromHwbToRgb(this.color);
                break;
            }
            case "hsv": {
                this.normalizedColor = this.fromHsvToRgb(this.color);
                break;
            }
            case "cmyk": {
                this.normalizedColor = this.fromCmykToRgb(this.color);
                break;
            }
            case "name": {
                var hexColor = this.fromNameToHex(this.color);
                this.normalizedColor = this.fromHexToRgb(hexColor);
                break;
            }
            default: {
                throw new Error("Invalid color model for \"".concat(this.currentModel, "\""));
            }
        }
    };
    /**
     * Sets a new color + target model to the instance class
     * @returns {void}
     */
    ColorConverter.prototype.setNewColor = function (newColor, newTargetModel) {
        this.color = newColor;
        this.currentModel = newTargetModel.toLowerCase();
        this.normalizeToRgb();
    };
    /**
     * Converts the color to the specified color model.
     * @param {string} targetModel - The target color model.
     * @returns {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} The converted color value.
     */
    ColorConverter.prototype.convertTo = function (targetModel) {
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
                var hexColor = this.fromRgbToHex(this.normalizedColor);
                return this.fromHexToName(hexColor);
            }
            default: {
                throw new Error("Invalid color model for \"".concat(this.currentModel, "\""));
            }
        }
    };
    /**
     * Retrieves all color models for the current color.
     * @returns {Array} An array containing the color values in different color models.
     */
    ColorConverter.prototype.getAllColorModels = function () {
        var hexColor = this.fromRgbToHex(this.normalizedColor);
        var rgbColor = this.normalizedColor;
        var hslColor = this.fromRgbToHsl(this.normalizedColor);
        var hwbColor = this.fromRgbToHwb(this.normalizedColor);
        var hsvColor = this.fromRgbToHsv(this.normalizedColor);
        var cmykColor = this.fromRgbToCmyk(this.normalizedColor);
        var nameColor = this.fromHexToName(hexColor);
        return [
            nameColor,
            hexColor,
            rgbColor,
            hslColor,
            hwbColor,
            hsvColor,
            cmykColor,
        ];
    };
    return ColorConverter;
}(AbstractConversionMethods));
exports.ColorConverter = ColorConverter;
