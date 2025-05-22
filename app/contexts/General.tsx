import { createContext, useState } from "react";
import { Colors } from "../types/color-types";
import { GeneralContextValue } from "../types/color-types";
import { HeaderStyle, Style, useStyle } from "~/hooks/useStyle";

export const GeneralContext = createContext<GeneralContextValue | null>(null);

export function GeneralContextProvider({children}: React.PropsWithChildren){

    const [colors, setColors] = useState<Colors>({
        primary:    "#430094",
        secondary:  "#780abd",
        tertiary:   "#948d00",

        primaryText: "#ffffff",
        secondaryText: "#ffffff",
        tertiaryText: "#ffffff",

        background: "#f2f2f2",
        text: "#16161d"
    });
    
    const [styleType, setStyleType] = useState<HeaderStyle>(useStyle(colors, Style.GRADIENT));

    return(
        <GeneralContext.Provider value={{
            colors,
            setColors,
            styleType,
            setStyleType
        }}>
            { children }
        </GeneralContext.Provider>
    );
}