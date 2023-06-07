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
        var red = color.red, green = color.green, blue = color.blue;
        var hexadecimalRed = red.toString(16);
        var hexadecimalGreen = green.toString(16);
        var hexadecimalBlue = blue.toString(16);
        return "#".concat(hexadecimalRed).concat(hexadecimalGreen).concat(hexadecimalBlue, ";");
    };
    /**
     * Converts a color in hexadecimal format to RGB.
     * @param {string} color - The color in hexadecimal format.
     * @returns {RedGreenBlue} The RGB color object.
     */
    AbstractConversionMethods.prototype.fromHexToRgb = function (color) {
        var colorArgumentIsInvalid = (color === null || color === void 0 ? void 0 : color.length) < 6 || (color === null || color === void 0 ? void 0 : color.length) > 7;
        if (colorArgumentIsInvalid) {
            throw new Error("Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ".concat(color.length));
        }
        var hexColor = color;
        var hasHashTag = color.charAt(0) === "#";
        if (hasHashTag) {
            hexColor = color.slice(1);
        }
        var redBase16 = hexColor.substring(0, 2);
        var greeBase16 = hexColor.substring(2, 4);
        var blueBase16 = hexColor.substring(4, 6);
        var base16NumbersArray = [redBase16, greeBase16, blueBase16];
        for (var i = 0; i < base16NumbersArray.length; i++) {
            var colorBase16 = base16NumbersArray[i];
            base16NumbersArray[i] = Number("0x".concat(colorBase16));
        }
        var redBase10 = Number(base16NumbersArray[0]);
        var greenBase10 = Number(base16NumbersArray[1]);
        var blueBase10 = Number(base16NumbersArray[2]);
        return { red: redBase10, green: greenBase10, blue: blueBase10 };
    };
    /**
     * Converts RGB color to HSL (Hue, Saturation, Lightness).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueSaturationLightness} The HSL color object.
     */
    AbstractConversionMethods.prototype.fromRgbToHsl = function (color) {
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
        var roundedHue = Math.round(hue * 360);
        var roundedSaturation = Math.round(saturation * 100);
        var roundedLightness = Math.round(lightness * 100);
        // Return the HSL color value as a string
        return {
            hue: roundedHue % 360,
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
        var hue = color.hue, saturation = color.saturation, lightness = color.lightness;
        var normalizedSaturation = saturation / 100;
        var normalizedLightness = lightness / 100;
        function calculateComponent(colorValue) {
            // log({ normalizedSaturation, normalizedLightness });
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
        var red = color.red, green = color.green, blue = color.blue;
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
        var red = color.red, green = color.green, blue = color.blue;
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
        _this.color = color;
        _this.normalizedColor;
        _this.currentModel = currentModel;
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
            default: {
                throw new Error("Invalid color model.");
            }
        }
    };
    /**
     * Converts the color to the specified color model.
     * @param {string} targetModel - The target color model.
     * @returns {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} The converted color value.
     */
    ColorConverter.prototype.convertTo = function (targetModel) {
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
            default: {
                throw new Error("Invalid color model.");
            }
        }
    };
    /**
     * Retrieves all color models for the current color.
     * @returns {Array} An array containing the color values in different color models.
     */
    ColorConverter.prototype.getAllColorModels = function () {
        return [
            this.fromRgbToHex(this.normalizedColor),
            this.normalizedColor,
            this.fromRgbToHsl(this.normalizedColor),
            this.fromRgbToHwb(this.normalizedColor),
            this.fromRgbToHsv(this.normalizedColor),
        ];
    };
    return ColorConverter;
}(AbstractConversionMethods));
exports.ColorConverter = ColorConverter;
