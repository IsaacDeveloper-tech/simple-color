import { describe, it, expect } from 'vitest';
import { useStyle, Style } from '~/hooks/useStyle';
import { Colors } from '~/types/types';

describe('useStyle', () => {
    const mockColors: Colors = {
        primary: '#FF0000',
        secondary: '#00FF00',
        tertiary: '#0000FF',
        primaryText: '#FFFFFF',
        secondaryText: '#000000',
        tertiaryText: '#FFFFFF',
        background: '#CCCCCC',
        text: '#333333',
    };

    it('should return solid style', () => {
        const style = useStyle(mockColors, Style.SOLID);
        expect(style.header.backgroundColor).toBe(mockColors.primary);
        expect(style.header.color).toBe(mockColors.primaryText);
        expect(style.headerInput.backgroundColor).toBe(mockColors.background);
        expect(style.headerInput.color).toBe(mockColors.text);
        expect(style.headerButton.backgroundColor).toBe(mockColors.secondary);
        expect(style.headerButton.color).toBe(mockColors.secondaryText);
    });

    it('should return gradient style', () => {
        const style = useStyle(mockColors, Style.GRADIENT);
        expect(style.header.background).toContain('linear-gradient');
        expect(style.header.color).toBe(mockColors.primaryText);
        expect(style.headerInput.backgroundColor).toBe(mockColors.background);
        expect(style.headerInput.color).toBe(mockColors.text);
        expect(style.headerButton.background).toContain('linear-gradient');
        expect(style.headerButton.color).toBe(mockColors.tertiaryText);
    });

    it('should return gap style', () => {
        const style = useStyle(mockColors, Style.GAP);
        expect(style.header.backgroundColor).toBe(mockColors.primary);
        expect(style.header.color).toBe(mockColors.primaryText);
        expect(style.headerInput.backgroundColor).toBe(mockColors.secondary);
        expect(style.headerInput.color).toBe(mockColors.secondaryText);
        expect(style.headerInput.borderColor).toBe(mockColors.tertiary);
        expect(style.headerButton.backgroundColor).toBe('transparent');
        expect(style.headerButton.color).toBe(mockColors.tertiary);
        expect(style.headerButton.borderColor).toBe(mockColors.tertiary);
    });

    it('should return gradient style as default', () => {
        const style = useStyle(mockColors);
        expect(style.header.background).toContain('linear-gradient');
        expect(style.header.color).toBe(mockColors.primaryText);
    });
});
