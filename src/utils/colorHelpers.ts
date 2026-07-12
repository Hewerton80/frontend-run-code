import { getRandomInt } from "./getRandomInt";
import { REGEX } from "./regex";

// --- Helpers de gama compartilhados ---

const linearToSrgb = (value: number): number => {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped <= 0.0031308
    ? clamped * 12.92
    : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
};

const srgbToLinear = (value: number): number => {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
};

// --- Conversores ---

const convertHexToRgb = (hex: string) => {
  const result = REGEX.hexColor.exec(hex);
  if (!result) throw new Error("Invalid hex color");
  const hexValue = result[1];
  const r = parseInt(
    hexValue.length === 3 ? hexValue[0] + hexValue[0] : hexValue.slice(0, 2),
    16,
  );
  const g = parseInt(
    hexValue.length === 3 ? hexValue[1] + hexValue[1] : hexValue.slice(2, 4),
    16,
  );
  const b = parseInt(
    hexValue.length === 3 ? hexValue[2] + hexValue[2] : hexValue.slice(4, 6),
    16,
  );
  return `rgb(${r}, ${g}, ${b})`;
};

const convertOklchToRgb = (oklch: string): string => {
  // 1. Extrai L, C, H da string "oklch(L C H)"
  const parts = oklch
    .replace("oklch(", "")
    .replace(")", "")
    .trim()
    .split(/\s+/)
    .map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error("Invalid oklch color format.");
  }

  const [L, C, H] = parts;

  // 2. OKLCH → OKLab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // 3. OKLab → LMS (espaço de raiz cúbica)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  // 4. LMS (cubo)
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // 5. LMS → Linear sRGB (matriz inversa)
  const rLinear = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // 6. Linear sRGB → sRGB (correção de gama)
  const r = Math.round(linearToSrgb(rLinear) * 255);
  const g = Math.round(linearToSrgb(gLinear) * 255);
  const bVal = Math.round(linearToSrgb(bLinear) * 255);

  return `rgb(${r}, ${g}, ${bVal})`;
};

const convertRgbToOklch = (rgb: string): string => {
  // 1. Extrai R, G, B da string "rgb(R, G, B)"
  const parts = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((v) => Number(v.trim()));

  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error("Invalid rgb color format.");
  }

  const [R, G, B] = parts;

  // 2. sRGB → Linear sRGB (remoção de gama)
  const rLin = srgbToLinear(R);
  const gLin = srgbToLinear(G);
  const bLin = srgbToLinear(B);

  // 3. Linear sRGB → LMS
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  // 4. LMS → LMS (raiz cúbica)
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // 5. LMS → OKLab
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bLab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // 6. OKLab → OKLCH
  const C = Math.sqrt(a * a + bLab * bLab);
  const hRad = Math.atan2(bLab, a);
  const H = ((hRad * 180) / Math.PI + 360) % 360;

  return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(4)})`;
};

export const convertHexToOklch = (hex: string): string => {
  // Reutiliza convertHexToRgb e convertRgbToOklch
  const rgb = convertHexToRgb(hex);
  return convertRgbToOklch(rgb);
};

export const oklch = (color: string): string => {
  const isOklch = color?.match(REGEX.oklchColor);
  const isHex = color?.match(REGEX.hexColor);
  const isRgb = color?.match(REGEX.rgbColor);
  const isRgba = color?.match(REGEX.rgbaColor);

  if (!isOklch && !isHex && !isRgb && !isRgba) {
    throw new Error("Invalid color format. Expected hex, rgb, rgba or oklch.");
  }

  if (isOklch) return color;

  if (isHex) return convertHexToOklch(color);

  if (isRgb) return convertRgbToOklch(color);

  if (isRgba) {
    // Extrai apenas os 3 primeiros canais (R, G, B) e ignora o alpha
    const [r, g, b] = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((v) => v.trim());
    return convertRgbToOklch(`rgb(${r}, ${g}, ${b})`);
  }

  throw new Error("Unexpected error processing color.");
};

export const getHue = (color: string): number => {
  const oklchColor = oklch(color);
  const parts = oklchColor
    .replace("oklch(", "")
    .replace(")", "")
    .trim()
    .split(/\s+/)
    .map(Number);

  return parts[2];
};

export const rgba = (color: string, alpha: number) => {
  const isHex = color?.match(REGEX.hexColor);
  const isOklch = color?.match(REGEX.oklchColor);
  const isRgb = color?.match(REGEX.rgbColor);
  const isRgba = color?.match(REGEX.rgbaColor);

  if (!isHex && !isRgb && !isRgba && !isOklch) {
    throw new Error("Invalid color format. Expected hex, rgb, rgba or oklch.");
  }

  if (isOklch) {
    const rgbColor = convertOklchToRgb(color);
    return rgbColor.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  if (isHex) {
    const rgbColor = convertHexToRgb(color);
    return rgbColor.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  if (isRgb) {
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  if (isRgba) {
    const rgbaParts = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((part) => part.trim());
    if (rgbaParts.length !== 4) {
      throw new Error("Invalid rgba color format.");
    }
    rgbaParts[3] = alpha.toString();
    return `rgba(${rgbaParts.join(", ")})`;
  }

  throw new Error("Unexpected error processing color.");
};

export const getRandomHexColor = () => {
  const randomInt = getRandomInt(0, 0xffffff);
  return `#${randomInt.toString(16).padStart(6, "0")}`;
};

export const getRandomRGBColor = () => {
  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);
  return `rgb(${r},${g},${b})`;
};

export const getContrastColor = (color: string) => {
  const isHex = color?.match(REGEX.hexColor);
  const isOklch = color?.match(REGEX.oklchColor);
  const isRgba = color?.match(REGEX.rgbaColor);

  let rgbString = color;

  if (isOklch) rgbString = convertOklchToRgb(color);
  else if (isHex) rgbString = convertHexToRgb(color);
  else if (isRgba) {
    // Extrai apenas R, G, B ignorando o alpha
    const [r, g, b] = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((v) => v.trim());
    rgbString = `rgb(${r}, ${g}, ${b})`;
  }

  const [r, g, b] = rgbString
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map(Number);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 125 ? "#000000" : "#ffffff";
};
