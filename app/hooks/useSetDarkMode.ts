import { Colors } from "../types/color-types";
import { getBestTextColor } from "./useColors";

// Function to darken a hex color
function darkenColor(hexColor: string, factor: number): string{
    // Remove the "#" if it exists
    hexColor = hexColor.replace("#", "");

    // Parse the hex color into RGB components
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Darken each component
    const darken = (c: number) => Math.max(0, Math.floor(c * (1 - factor)));

    const dr = darken(r);
    const dg = darken(g);
    const db = darken(b);

    // Convert back to hex
    return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`;
};

export function useSetDarkMode(colors : Colors) : Colors{
    const darkModeFactor = 0.7; // Adjust this factor to control the darkness

    const primary = darkenColor(colors.tertiary, darkModeFactor); 
    const primaryText = getBestTextColor(primary);

    const secondary = darkenColor(colors.secondary, darkModeFactor);
    const secondaryText = getBestTextColor(secondary);

    const tertiary = colors.primary; 
    const tertiaryText = getBestTextColor(tertiary);



    const darkModeColors: Colors = {
      primary: primary,
      secondary: secondary,
      tertiary: tertiary,
      primaryText: primaryText,
      secondaryText: secondaryText,
      tertiaryText: tertiaryText,
      background: "#16161d",
      text: "#f2f2f2",
    };

    return darkModeColors;
};
