import { describe, it, expect } from 'vitest';
import { 
    useColors,
    hexTohsl,
    hslTohex,
    getSecondaryColor,
    getTertiaryColor,
    getBestTextColor,
    isValidHexColor,
    ColorHSL
} from '~/hooks/useColors';

describe('useColors', () => {

    it("should return a correct colors with primary color", () => {
        const primaryColor : ColorHSL = hexTohsl("#ff2929");
        const secondaryColor : ColorHSL = getSecondaryColor(primaryColor);
        const tertiaryColor : ColorHSL = getTertiaryColor(primaryColor);

        expect(hslTohex(secondaryColor)).toBe("#f77c64");
        expect(hslTohex(tertiaryColor)).toBe("#29ff94");
    });

    it("should return a correct text color for selected background", () => {
        expect(getBestTextColor("#994d00")).toEqual("#ffffff");
        expect(getBestTextColor("#ffcc99")).toEqual("#000000");
    });

    it("should return a valid hex color and the color is #ff9933", () => {
        const colorHsl: ColorHSL = {h:30, s:100, l:60};
        const color: string = hslTohex(colorHsl);;

        expect(isValidHexColor(color)).toBe(true);
        expect(color).toBe("#ff9933");
    });

    it("should return a 0 values with incorrect hex colors", () => {
        const color: string = "";
        const colorHsl: ColorHSL = hexTohsl(color);

        expect(!colorHsl.h).toBeTruthy();
        expect(!colorHsl.s).toBeTruthy();
        expect(!colorHsl.l).toBeTruthy();
    });

    it('should return a valid Colors object with valid hex colors', () => {
        const colors = useColors('#FF0000');

        expect(colors).toBeDefined();

        expect(isValidHexColor(colors.primary)).toBe(true);
        expect(isValidHexColor(colors.secondary)).toBe(true);
        expect(isValidHexColor(colors.tertiary)).toBe(true);

        expect(colors.primaryText).toBeDefined();
        expect(colors.secondaryText).toBeDefined();
        expect(colors.tertiaryText).toBeDefined();

        expect(colors.background).toBe('#f2f2f2');
        expect(colors.text).toBe('#16161d');
    });

    it('should return black or white for text colors', () => {
        const colors = useColors('#808080'); // Gray color

        expect(colors.primaryText === '#000000' || colors.primaryText === '#ffffff').toBe(true);
        expect(colors.secondaryText === '#000000' || colors.secondaryText === '#ffffff').toBe(true);
        expect(colors.tertiaryText === '#000000' || colors.tertiaryText === '#ffffff').toBe(true);
    });
});
