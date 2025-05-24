import { ChangeEvent, useRef, useContext } from "react";
import { useColors } from "~/hooks/useColors";
import { useGetStyle } from "~/hooks/useGetStyle";
import { Colors, Status } from "~/types/types";
import { GeneralContext } from "~/contexts/General";
import { useStyle, Style } from "~/hooks/useStyle";

export function Header(){
    const colorRef = useRef<HTMLInputElement>(null);
    const styleRef = useRef<HTMLSelectElement>(null);
    const generalContext = useContext(GeneralContext);

    const putColor = (event:ChangeEvent<HTMLInputElement>) : void => {
        if(!colorRef.current)
            return;

        colorRef.current.value = event.target.value;
    };

    const isValidInput = (input:string) : boolean => {
        const regex:RegExp = /^#([0-9a-fA-F]{6})$/;
        return regex.test(input);
    };

    const copyStyle = (colors:Colors) : void => {
        useGetStyle(colors);
    };

    // Styles
    if(!generalContext || !generalContext.state.colorState)
        return <div>Fatal error with colors</div>

    const putStyle = (event:ChangeEvent<HTMLSelectElement>) : void => {
        const typeStyle : string = event.target.value;
        let styleSelected : Style;

        switch(typeStyle)
        {
            case "gap":
                styleSelected = Style.GAP;
                break;
            case "solid":
                styleSelected = Style.SOLID;
                break;
            case "gradient":
                styleSelected = Style.GRADIENT;
                break;
        }

        generalContext.setState(
            state => {
                const newState:Status = {...state};
                newState.styleState = useStyle(state.colorState, styleSelected);
                return newState;
            }
        );
    };

    const chooseColor = () : void => {
        const color : HTMLInputElement | null = colorRef.current;

        if(!color)
            return;

        if(!isValidInput(color.value))
            return;

        if(!generalContext)
            return;

        if(!styleRef.current)
            return;

        let styleSelected : Style;

        switch(styleRef.current.value)
        {
            case "gap":
                styleSelected = Style.GAP;
                break;
            case "solid":
                styleSelected = Style.SOLID;
                break;
            case "gradient":
                styleSelected = Style.GRADIENT;
                break;
        }

        generalContext.setState(
            state => {
                const newState:Status = {...state};

                newState.colorState = useColors(color.value);
                newState.styleState = useStyle(newState.colorState, styleSelected);
                return newState;
            }
        );
    }

    return (
        <header 
            className="flex flex-col items-center justify-center w-full h-[75vh]"
            style={generalContext.state.styleState.header}
        >
            
            <h1 
                className="text-[4vw] font-thin"
            >Simple Color</h1>

            <p 
                className="text-[1.5vw] font-thin"
            >A tool for lazy developers</p>

            <div 
                className="flex items-center justify-center w-full h-[3em] gap-[5px]"
            >
                <input 
                    className="h-[3em] w-[50%] rounded-[5px] border-none pl-[10px]" 
                    style={generalContext.state.styleState.headerInput}
                    ref={colorRef} 
                    type="text" 
                    placeholder="Set your color"
                />
                
                <input 
                    className="h-[3em] border-none bg-transparent" 
                    onChange={(e) => putColor(e)} 
                    type="color" 
                />
            </div>
            <div
                className="flex items-center justify-center w-full h-[3em] gap-[1.5em]"
            >
                <button 
                    className="w-[10em] h-[4em] mt-[2em] border-none rounded-[5px]" 
                    onClick={chooseColor}
                    style={generalContext.state.styleState.headerButton}
                >Set Color</button>
                <button 
                    className="w-[10em] h-[4em] mt-[2em] border-none rounded-[5px]" 
                    onClick={() => copyStyle(generalContext.state.colorState)}
                    style={generalContext.state.styleState.headerButton}
                >Copy Colors</button>
                <select 
                    name="cars" 
                    id="cars" 
                    className="w-[5em] h-[4em] mt-[2em] border-none rounded-[5px] text-center"
                    style={generalContext.state.styleState.headerInput}
                    onChange={putStyle}
                    ref={styleRef}
                >
                    <option value="gradient">Gradient</option>
                    <option value="gap">Gap</option>
                    <option value="solid">Solid</option>
                </select>
            </div>

        </header>
    );
}