import { describe, it, expect } from 'vitest';
import { useSetDarkMode, darkenColor } from '~/hooks/useSetDarkMode';
import { Colors } from '~/types/types';

describe('useSetDarkMode', () => {

    it('should darken a hex color by a given factor', () => {
        // Test darkenColor directly
        expect(darkenColor('#808080', 0.5)).toBe('#404040');
    });

    it('should darken the colors and set the text colors to white', () => {
        const initialColors: Colors = {
            primary: '#ffffff',
            secondary: '#cccccc',
            tertiary: '#999999',
            primaryText: '#000000',
            secondaryText: '#000000',
            tertiaryText: '#000000',
            background: '#ffffff',
            text: '#000000',
        };

        const darkModeColors = useSetDarkMode(initialColors);

        expect(darkModeColors.primaryText).toBe('#ffffff');
        expect(darkModeColors.secondaryText).toBe('#ffffff');
        expect(darkModeColors.tertiaryText).toBe('#ffffff');
        expect(darkModeColors.background).toBe("#16161d");
        expect(darkModeColors.text).toBe("#f2f2f2");
    });
});
