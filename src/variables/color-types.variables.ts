/**
 * Represents the red, green, and blue components of a color.
 */
export type RedGreenBlue = {
  red: number;
  green: number;
  blue: number;
};

/**
 * Represents the hue, saturation, and lightness components of a color.
 */
export type HueSaturationLightness = {
  hue: number;
  saturation: number;
  lightness: number;
};

/**
 * Represents the hue, saturation, and value components of a color.
 */
export type HueSaturationValue = {
  hue: number;
  saturation: number;
  value: number;
};

/**
 * Represents the hue, whiteness, and blackness components of a color.
 */
export type HueWhitenessBlackness = {
  hue: number;
  whiteness: number;
  blackness: number;
};

/**
 * Represents a color in the Cyan-Magenta-Yellow-Key (CMYK) color model with value in %
 */
export type CyanMagentaYellowKey = {
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
};

/**
 * Represents a color with a name of the color
 */
export type NameColor = {
  name: string | null;
  value: string | null;
};

export type ColorRepresentation =
  | string
  | RedGreenBlue
  | HueSaturationLightness
  | HueWhitenessBlackness
  | HueSaturationValue
  | CyanMagentaYellowKey;
