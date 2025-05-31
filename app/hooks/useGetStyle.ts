import { Colors } from "../types/types";

// Custom hooks
export function useGetStyle(colors:Colors): string{
    const style = `
    :root {
        --primary: ${colors.primary};
        --secondary: ${colors.secondary};
        --tertiary: ${colors.tertiary};
        --primary-text: ${colors.primaryText};
        --secondary-text: ${colors.secondaryText};
        --tertiary-text: ${colors.tertiaryText};
        --background: ${colors.background};
        --text: ${colors.text};        
    }
    `;

    return style;
}