
import { GeneralContextValue, Status } from "~/types/types";
import { useSetDarkMode } from "~/hooks/useSetDarkMode";
import { useStyle } from "~/hooks/useStyle";

// Funcion Definitions
export let OnClickDarkMode: (generalContext:GeneralContextValue) => void;

// Function Declarations
OnClickDarkMode = (generalContext:GeneralContextValue) => {
    generalContext.setState(
        state => {
            const newState:Status = {...state};
            newState.colorState = useSetDarkMode(generalContext.state.colorState);
            newState.styleState = useStyle(newState.colorState);
            return newState;
        }
    );
};
