export const REGEX = {
  isoDate: /^\d{4}-\d{2}-\d{2}$/,
  rgbColor: /^rgb\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/,
  rgbaColor:
    /^rgba?\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/,
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  oklchColor: /^oklch\(\s*(\d+(\.\d+)?\s+){2}\d+(\.\d+)?\s*\)$/,
};
