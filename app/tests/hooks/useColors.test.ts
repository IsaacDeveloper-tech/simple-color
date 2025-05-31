import { describe, it, expect } from 'vitest';
import { useColors } from '~/hooks/useColors';

function isValidHexColor(color: string): boolean {
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
}

describe('useColors', () => {
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
