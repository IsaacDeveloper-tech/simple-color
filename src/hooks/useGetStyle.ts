import { Colors } from "../types/color-types";

export function useGetStyle(colors:Colors): void{
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

    navigator.clipboard.writeText(style)
    .catch(e => console.log(e));
}