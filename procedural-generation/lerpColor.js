const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

const rgbToHex = (rgb) => {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

const rgbToHsl = (color) => {
    let r = color[0] / 255;
    let g = color[1] / 255;
    let b = color[2] / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

const hslToRgb = (color) => {
    let l = color[2];

    if (color[1] == 0) {
        l = Math.round(l * 255);
        return [l, l, l];
    } else {
        function hueToRgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let s = color[1];
        let q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
        let p = 2 * l - q;
        let r = hueToRgb(p, q, color[0] + 1 / 3);
        let g = hueToRgb(p, q, color[0]);
        let b = hueToRgb(p, q, color[0] - 1 / 3);
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}

const lerpHSL = (color1, color2, factor) => {
    let hsl1 = rgbToHsl(color1);
    let hsl2 = rgbToHsl(color2);
    for (let i = 0; i < 3; i++) {
        hsl1[i] += factor * (hsl2[i] - hsl1[i]);
    }
    return hslToRgb(hsl1);
}

const lerpRGB = (color1, color2, factor) => {
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

// totalNumberOfColors is colors with start, end and all inbetween (min 3)
// idx are the inbetween colors' index starting from 0
export const getLerpedColor = (fromColor, toColor, totalNumOfColors, idx, useRgb = false) => {
    let rgbColor1 = hexToRgb(fromColor);
    let rgbColor2 = hexToRgb(toColor);
    let factorStep = 1 / (totalNumOfColors - 1);
    return (useRgb) ?
        rgbToHex(lerpRGB(rgbColor1, rgbColor2, factorStep * idx)) :
        rgbToHex(lerpHSL(rgbColor1, rgbColor2, factorStep * idx));
}