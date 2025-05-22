export function useDarkMode(hexColor: string):boolean{
    // Remove the '#' if it exists
    hexColor = hexColor.replace("#", "");

    // Parse the hex color into RGB components
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Calculate luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Determine if dark mode is appropriate
    return luminance > 70;
};