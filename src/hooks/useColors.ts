import { Colors } from "../types/color-types";

type ColorHSL = {
    h : number, // Hue
    s : number, // Saturation
    l : number  // Lightness
};

function hexTohsl(colorHex:string):ColorHSL{
    colorHex = colorHex.replace('#', '');
    if (colorHex.length === 3) {
        colorHex = colorHex.split('').map(c => c + c).join('');
    }
    const r:number = parseInt(colorHex.substring(0, 2), 16) / 255;
    const g:number = parseInt(colorHex.substring(2, 4), 16) / 255;
    const b:number = parseInt(colorHex.substring(4, 6), 16) / 255;

    const max:number = Math.max(r, g, b);
    const min:number = Math.min(r, g, b);

    let h:number = (max + min) / 2;
    let s:number = (max + min) / 2;
    let l:number = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d:number = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h = h * 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslTohex(colorHsl:ColorHSL):string{
    colorHsl.s /= 100;
    colorHsl.l /= 100;

    const k = (n:number) => (n + colorHsl.h / 30) % 12;
    const a = colorHsl.s * Math.min(colorHsl.l, 1 - colorHsl.l);
    const f = (n:number) => {
        const color = colorHsl.l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}

function getSecondaryColor(color:ColorHSL):ColorHSL{
    const secondaryColor:ColorHSL = {
        h: (color.h + 10) % 360,
        s: Math.max(0, color.s - 10),
        l: Math.min(100, color.l + 10)
    };
    return secondaryColor;
}

function getTertiaryColor(color:ColorHSL):ColorHSL{
    const secondaryColor:ColorHSL = {
        h: (color.h + 150) % 360,
        s: color.s,
        l: color.l
    };
    return secondaryColor;
}

function getBestTextColor(hexColor:string):string {
    hexColor = hexColor.replace('#', '');
    if (hexColor.length === 3) {
        hexColor = hexColor.split('').map(c => c + c).join('');
    }

    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 128 ? '#000000' : '#ffffff';
}

export function useColors(selectedColor:string): Colors{
    const colorHsl : ColorHSL = hexTohsl(selectedColor);
    const secondaryColor : string = hslTohex(getSecondaryColor(colorHsl));
    const tertiaryColor : string = hslTohex(getTertiaryColor(colorHsl));

    const colors:Colors = {
        primary:selectedColor,
        secondary:secondaryColor,
        tertiary:tertiaryColor,

        primaryText: getBestTextColor(selectedColor),
        secondaryText: getBestTextColor(secondaryColor),
        tertiaryText: getBestTextColor(tertiaryColor),

        background: "#f2f2f2",
        text: "#16161d"
    }

    return colors;
}