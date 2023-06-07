import { RedGreenBlue, HueSaturationLightness, HueWhitenessBlackness, HueSaturationValue } from "../variables/color-types.variables";
/**
 * Abstract class containing conversion methods for various color models.
 */
export declare class AbstractConversionMethods {
    /**
     * Converts RGB color to hexadecimal format.
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {string} The color in hexadecimal format.
     */
    fromRgbToHex(color: RedGreenBlue): string;
    /**
     * Converts a color in hexadecimal format to RGB.
     * @param {string} color - The color in hexadecimal format.
     * @returns {RedGreenBlue} The RGB color object.
     */
    fromHexToRgb(color: string): RedGreenBlue;
    /**
     * Converts RGB color to HSL (Hue, Saturation, Lightness).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueSaturationLightness} The HSL color object.
     */
    fromRgbToHsl(color: RedGreenBlue): HueSaturationLightness;
    /**
     * Converts HSL (Hue, Saturation, Lightness) color to RGB.
     * @param {HueSaturationLightness} color - The HSL color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    fromHslToRgb(color: HueSaturationLightness): RedGreenBlue;
    /**
     * Converts RGB color to HWB (Hue, Whiteness, Blackness).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueWhitenessBlackness} The HWB color object.
     */
    fromRgbToHwb(color: RedGreenBlue): HueWhitenessBlackness;
    /**
     * Converts HWB (Hue, Whiteness, Blackness) color to RGB.
     * @param {HueWhitenessBlackness} color - The HWB color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    fromHwbToRgb(color: HueWhitenessBlackness): RedGreenBlue;
    /**
     * Converts RGB color to HSV (Hue, Saturation, Value).
     * @param {RedGreenBlue} color - The RGB color object.
     * @returns {HueSaturationValue} The HSV color object.
     */
    fromRgbToHsv(color: RedGreenBlue): HueSaturationValue;
    /**
     * Converts HSV (Hue, Saturation, Value) color to RGB.
     * @param {HueSaturationValue} color - The HSV color object.
     * @returns {RedGreenBlue} The RGB color object.
     */
    fromHsvToRgb(color: HueSaturationValue): RedGreenBlue;
}
/**
 * ColorConverter class that extends AbstractConversionMethods.
 */
export declare class ColorConverter extends AbstractConversionMethods {
    color: string | RedGreenBlue | HueSaturationLightness | HueWhitenessBlackness | HueSaturationValue;
    currentModel: string;
    private normalizedColor;
    /**
     * Constructs a ColorConverter object.
     * @param {string} currentModel - The current color model.
     * @param {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} color - The color value.
     */
    constructor(currentModel: string, color: string | RedGreenBlue | HueSaturationLightness | HueWhitenessBlackness | HueSaturationValue);
    /**
     * Normalizes the color to RGB format to be later convert back into another one
     * @returns {RedGreenBlue} The normalized RGB color value.
     */
    normalizeToRgb(): RedGreenBlue | void;
    /**
     * Converts the color to the specified color model.
     * @param {string} targetModel - The target color model.
     * @returns {string|RedGreenBlue|HueSaturationLightness|HueWhitenessBlackness|HueSaturationValue} The converted color value.
     */
    convertTo(targetModel: string): string | RedGreenBlue | HueSaturationLightness | HueWhitenessBlackness | HueSaturationValue;
    /**
     * Retrieves all color models for the current color.
     * @returns {Array} An array containing the color values in different color models.
     */
    getAllColorModels(): (string | RedGreenBlue | HueSaturationLightness | HueWhitenessBlackness | HueSaturationValue)[];
}
