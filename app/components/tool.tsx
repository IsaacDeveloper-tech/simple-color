import { ChangeEvent, useRef, useContext, CSSProperties } from "react";
import { useColors } from "~/hooks/useColors";
import { useGetStyle } from "~/hooks/useGetStyle";
import { Colors } from "~/types/color-types";
import { ColorsContext } from "~/contexts/Colors";

type HeaderStyle = {
    header              : CSSProperties,
    headerInput         : CSSProperties,
    headerButton        : CSSProperties
};

export function Header(){
    const colorRef = useRef<HTMLInputElement>(null);
    const colorContext = useContext(ColorsContext);

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
    
    const chooseColor = () : void => {
        const color : HTMLInputElement | null = colorRef.current;

        if(!color)
            return;

        if(!isValidInput(color.value))
            return;

        if(!colorContext || !colorContext.setColors)
            return;

        const colors:Colors = useColors(color.value);
        const setColors = colorContext.setColors;
        
        setColors(colors);
    }
    // Styles
    if(!colorContext || !colorContext.colors)
        return <div>Fatal error with colors</div>

    const gradientStyle : HeaderStyle = {
        
        header: {
            background: `linear-gradient(72deg, ${colorContext.colors.primary} 0%, ${colorContext.colors.secondary} 100%)`,
            color: colorContext.colors.primaryText
        },

        headerInput: {
            backgroundColor: colorContext.colors.background,
            color: colorContext.colors.text,
            boxShadow: `0 3px 8px -1px ${colorContext.colors.tertiary}`
        },

        headerButton: {
            background: `linear-gradient(200deg, ${colorContext.colors.primary} 0%, ${colorContext.colors.tertiary} 50%, ${colorContext.colors.secondary} 100%)`,
            color: colorContext.colors.tertiaryText,
            boxShadow: `0 3px 8px -1px ${colorContext.colors.tertiary}`
        }
    };

    return (
        <header 
            className="flex flex-col items-center justify-center w-full h-[75vh]"
            style={gradientStyle.header}
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
                    style={gradientStyle.headerInput}
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
                    style={gradientStyle.headerButton}
                >Set Color</button>
                <button 
                    className="w-[10em] h-[4em] mt-[2em] border-none rounded-[5px]" 
                    onClick={() => copyStyle(colorContext.colors)}
                    style={gradientStyle.headerButton}
                >Copy Colors</button>
            </div>

        </header>
    );
}