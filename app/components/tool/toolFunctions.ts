import { ChangeEvent } from "react";
import { Colors, Status, GeneralContextValue } from "~/types/types";
import { useGetStyle } from "~/hooks/useGetStyle";
import { Style, useStyle } from "~/hooks/useStyle";
import { useColors } from "~/hooks/useColors";
import { NotificationSystem } from "~/classes/NotificationSystem";

// Functions defines
export let putColor: (
    event:ChangeEvent<HTMLInputElement>, 
    colorRef: React.RefObject<HTMLInputElement>
) => void;

export let isValidInput: (input:string) => boolean;

export let copyStyle: (colors:Colors) => void;

export let putStyle: (
    event:ChangeEvent<HTMLSelectElement>, 
    generalContext: GeneralContextValue | null
) => void;

export let chooseColor: (
    generalContext: GeneralContextValue | null, 
    colorRef: React.RefObject<HTMLInputElement>, 
    styleRef: React.RefObject<HTMLSelectElement>
) => void;

// Function Declarations
putColor = (event, colorRef) =>
{
    if(!colorRef.current) return;

    colorRef.current.value = event.target.value;
}

isValidInput = (input) =>
{
    const regex:RegExp = /^#([0-9a-fA-F]{6})$/;
    return regex.test(input);
}

copyStyle = (colors) =>
{
    const style = useGetStyle(colors);
    
    navigator.clipboard.writeText(style)
    .catch(e => console.log(e))
} 

putStyle = (event, generalContext) =>
{
    const styleSelected : Style = event.target.value as Style;

    if(!generalContext)
        return;

    generalContext.setState(
        state => {
            const newState:Status = {...state};
            newState.styleState = useStyle(state.colorState, styleSelected);
            return newState;
        }
    );
}

chooseColor = (generalContext, colorRef, styleRef) =>
{
    const color : HTMLInputElement | null = colorRef.current;

    if(!color) return;
    if(!isValidInput(color.value)) return;
    if(!generalContext) return;
    if(!styleRef.current) return;

    const styleSelected : Style = styleRef.current.value as Style;

    const notificationSystem = generalContext.state.notificationSystem;

    generalContext.setState(
        state => {
            const newState:Status = {...state};

            newState.notificationSystem.setNotification("Style copied in clipboard");
            newState.colorState = useColors(color.value);
            newState.styleState = useStyle(newState.colorState, styleSelected);
            return newState;
        }
    );
}