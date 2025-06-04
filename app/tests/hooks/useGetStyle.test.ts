import { describe, it, expect, vi } from 'vitest';
import { useGetStyle } from '~/hooks/useGetStyle';
import { Colors } from '~/types/types';

describe('useGetStyle', () => {
    it('should write the CSS style to the clipboard', () => {
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

        const style = useGetStyle(mockColors);

        expect(style).toContain(`
    :root {
        --primary: ${mockColors.primary};
        --secondary: ${mockColors.secondary};
        --tertiary: ${mockColors.tertiary};
        --primary-text: ${mockColors.primaryText};
        --secondary-text: ${mockColors.secondaryText};
        --tertiary-text: ${mockColors.tertiaryText};
        --background: ${mockColors.background};
        --text: ${mockColors.text};        
    }`);
    });
});
