import { createContext, useState } from "react";
import { Colors } from "../hooks/useColors";

export type ColorsContextValue = {
    colors: Colors,
    setColors: React.Dispatch<React.SetStateAction<Colors>>
};

export const ColorsContext = createContext<ColorsContextValue | null>(null);

export function ColorsContextProvider({children}: React.PropsWithChildren){

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
    
    return(
        <ColorsContext.Provider value={{
            colors,
            setColors
        }}>
            { children }
        </ColorsContext.Provider>
    );
}