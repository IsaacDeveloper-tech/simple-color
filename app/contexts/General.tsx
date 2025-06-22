import { createContext, useState } from "react";
import { Colors } from "../types/types";
import { GeneralContextValue, Status } from "../types/types";
import { Style, useStyle } from "~/hooks/useStyle";
import { NotificationSystem } from "~/classes/NotificationSystem";

export const GeneralContext = createContext<GeneralContextValue | null>(null);

export function GeneralContextProvider({children}: React.PropsWithChildren){

    const initialColorState:Colors =  {
        primary:    "#430094",
        secondary:  "#780abd",
        tertiary:   "#948d00",

        primaryText: "#ffffff",
        secondaryText: "#ffffff",
        tertiaryText: "#ffffff",

        background: "#f2f2f2",
        text: "#16161d"
    };

    const [state, setState] = useState<Status>({
        colorState: initialColorState,
        styleState: useStyle(initialColorState, Style.GRADIENT),
        notificationSystem: new NotificationSystem()
    });

    return(
        <GeneralContext.Provider value={{
            state,
            setState
        }}>
            { children }
        </GeneralContext.Provider>
    );
}