import { createContext, useState } from "react";
import { Colors } from "../hooks/useColors";

export type ColorsContextValue = {
    colors: Colors,
    setColors: React.Dispatch<React.SetStateAction<Colors>>
};

export const ColorsContext = createContext<ColorsContextValue | null>(null);

export function ColorsContextProvider({children}: React.PropsWithChildren){

    const [colors, setColors] = useState<Colors>({
        primary:    "",
        secondary:  "",
        tertiary:   "",

        primaryText: "",
        secondaryText: "",
        tertiaryText: "",

        background: "",
        text: ""
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