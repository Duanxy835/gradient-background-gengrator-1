// Color recommender service for gradient generator

// Convert hex color to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { h: 0, s: 0, l: 0 };
  }

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to hex color
function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Generate complementary color
function getComplementaryColor(color: string): string {
  const { h, s, l } = hexToHsl(color);
  const complementaryHue = (h + 180) % 360;
  return hslToHex(complementaryHue, s, l);
}

// Generate analogous colors
function getAnalogousColors(color: string): string[] {
  const { h, s, l } = hexToHsl(color);
  const analogous1 = (h + 30) % 360;
  const analogous2 = (h - 30) % 360;
  return [
    hslToHex(analogous1 < 0 ? analogous1 + 360 : analogous1, s, l),
    hslToHex(analogous2 < 0 ? analogous2 + 360 : analogous2, s, l)
  ];
}

// Generate triadic colors
function getTriadicColors(color: string): string[] {
  const { h, s, l } = hexToHsl(color);
  const triadic1 = (h + 120) % 360;
  const triadic2 = (h + 240) % 360;
  return [
    hslToHex(triadic1, s, l),
    hslToHex(triadic2, s, l)
  ];
}

// Generate split complementary colors
function getSplitComplementaryColors(color: string): string[] {
  const { h, s, l } = hexToHsl(color);
  const split1 = (h + 150) % 360;
  const split2 = (h + 210) % 360;
  return [
    hslToHex(split1, s, l),
    hslToHex(split2, s, l)
  ];
}

// Generate tetradic colors
function getTetradicColors(color: string): string[] {
  const { h, s, l } = hexToHsl(color);
  const tetradic1 = (h + 90) % 360;
  const tetradic2 = (h + 180) % 360;
  const tetradic3 = (h + 270) % 360;
  return [
    hslToHex(tetradic1, s, l),
    hslToHex(tetradic2, s, l),
    hslToHex(tetradic3, s, l)
  ];
}

// Generate monochromatic colors
function getMonochromaticColors(color: string): string[] {
  const { h, s, l } = hexToHsl(color);
  return [
    hslToHex(h, s, Math.max(0, l - 20)),
    hslToHex(h, s, Math.min(100, l + 20)),
    hslToHex(h, Math.max(0, s - 20), l),
    hslToHex(h, Math.min(100, s + 20), l)
  ];
}

// Get recommended color combinations based on the selected color
export function getRecommendedColorCombinations(color: string): {
  complementary: string;
  analogous: string[];
  triadic: string[];
  splitComplementary: string[];
  tetradic: string[];
  monochromatic: string[];
} {
  return {
    complementary: getComplementaryColor(color),
    analogous: getAnalogousColors(color),
    triadic: getTriadicColors(color),
    splitComplementary: getSplitComplementaryColors(color),
    tetradic: getTetradicColors(color),
    monochromatic: getMonochromaticColors(color)
  };
}

// Get best color combination for gradient
export function getBestGradientColors(baseColor: string, count: number = 2): string[] {
  const combinations = getRecommendedColorCombinations(baseColor);
  
  // For gradients, complementary and split complementary work well
  if (count === 2) {
    return [baseColor, combinations.complementary];
  }
  
  // For more than 2 colors, use triadic or analogous
  if (count === 3) {
    return [baseColor, ...combinations.triadic.slice(0, 2)];
  }
  
  // For 4+ colors, use tetradic
  return [baseColor, ...combinations.tetradic.slice(0, count - 1)];
}
