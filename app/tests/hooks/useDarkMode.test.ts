import { describe, it, expect } from 'vitest';
import { useDarkMode } from '~/hooks/useDarkMode';

describe('useDarkMode', () => {
    it('should return true for light colors', () => {
        expect(useDarkMode('ffffff')).toBe(true);
        expect(useDarkMode('f0f0f0')).toBe(true);
        expect(useDarkMode('ddeedd')).toBe(true); // Light green
    });

    it('should return false for dark colors', () => {
        expect(useDarkMode('000000')).toBe(false);
        expect(useDarkMode('121212')).toBe(false);
        expect(useDarkMode('333333')).toBe(false);
        expect(useDarkMode('003300')).toBe(false); // Dark green
    });

    it('should handle colors without a leading #', () => {
        expect(useDarkMode('ffffff')).toBe(true);
        expect(useDarkMode('000000')).toBe(false);
    });
});
