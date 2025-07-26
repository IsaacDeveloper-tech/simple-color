import { useRef, useContext } from "react";
import { GeneralContext } from "~/contexts/General";
import { 
    putColor,
    putStyle,
    chooseColor,
    copyStyle 
} from "./toolFunctions";
import { Style } from "~/hooks/useStyle";

// Component
export function Header(){
    const colorRef = useRef<HTMLInputElement>(null);
    const styleRef = useRef<HTMLSelectElement>(null);
    const generalContext = useContext(GeneralContext);

    // Styles
    if(!generalContext || !generalContext.state.colorState)
        return <div>Fatal error with colors</div>

    return (
        <header 
            className="flex flex-col items-center justify-center w-full h-[75vh]"
            style={generalContext.state.styleState.header}
        >
            <h1 className="text-[4vw]" style={generalContext.state.styleState.headerTitle}>Simple Color</h1>
            <p className="text-[1.5vw]" style={generalContext.state.styleState.headerSubtitle}>A tool for lazy developers</p>

            <div 
                className="flex items-center justify-center w-full h-[3em] gap-[5px]"
            >
                <input 
                    aria-label="Color in Hexadecimal"
                    className="h-[3em] w-[50%] rounded-[5px] border-none pl-[10px]" 
                    style={generalContext.state.styleState.headerInput}
                    ref={colorRef} 
                    type="text" 
                    placeholder="Set your color"
                />
                
                <input 
                    aria-label="Palette of colors"
                    className="h-[3em] border-none bg-transparent" 
                    onChange={(e) => putColor(e, colorRef)} 
                    type="color" 
                />
            </div>
            <div
                className="flex items-center justify-center w-full h-[3em] gap-[1.5em]"
            >
                <button 
                    className="w-[10em] h-[4em] mt-[2em] border-none rounded-[5px]" 
                    onClick={() => chooseColor(generalContext, colorRef, styleRef)}
                    style={generalContext.state.styleState.headerButton}
                >Set Color</button>

                <button 
                    className="w-[10em] h-[4em] mt-[2em] border-none rounded-[5px]" 
                    onClick={() => copyStyle(generalContext)}
                    style={generalContext.state.styleState.headerButton}
                >Copy Colors</button>

                <select 
                    aria-label="Styles of webpage"
                    name="cars" 
                    id="cars" 
                    className="w-[5em] h-[4em] mt-[2em] border-none rounded-[5px] text-center"
                    style={generalContext.state.styleState.headerInput}
                    onChange={(e) => putStyle(e, generalContext)}
                    ref={styleRef}
                >
                    <option value={Style.GRADIENT}>Gradient</option>
                    <option value={Style.GAP}>Gap</option>
                    <option value={Style.SOLID}>Solid</option>
                </select>
            </div>

        </header>
    );
}