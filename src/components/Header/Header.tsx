import { ChangeEvent, useRef, useContext, CSSProperties } from "react";
import { useColors, Colors } from "../../hooks/useColors";
import { ColorsContext } from "../../contexts/Colors";

import style from "./Header.module.css"

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

    const solidStyle : HeaderStyle = {
        
        header: {
            backgroundColor: colorContext.colors.primary,
            color: colorContext.colors.primaryText
        },

        headerInput: {
            backgroundColor: colorContext.colors.background,
            color: colorContext.colors.text,
            boxShadow: `0 3px 8px -1px ${colorContext.colors.tertiary}`
        },

        headerButton: {
            backgroundColor: colorContext.colors.secondary,
            color: colorContext.colors.secondaryText,
            boxShadow: `0 3px 8px -1px ${colorContext.colors.tertiary}`
        }
    };

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

    const gapStyle : HeaderStyle = {
        
        header: {
            backgroundColor: colorContext.colors.primary,
            color: colorContext.colors.primaryText
        },

        headerInput: {
            backgroundColor: colorContext.colors.secondary,
            color: colorContext.colors.secondaryText,
            borderStyle: "solid",
            borderWidth: "7px",
            borderColor: colorContext.colors.tertiary,
            borderRadius: 0,
            boxShadow: `0 3px 8px -1px ${colorContext.colors.secondary}`
        },

        headerButton: {
            backgroundColor: "transparent",
            color: colorContext.colors.tertiary,
            borderStyle: "solid",
            borderWidth: "7px",
            borderColor: colorContext.colors.tertiary,
            borderRadius: 0,
            boxShadow: `0 3px 8px -1px ${colorContext.colors.secondary}`
        }
    };

    return (
        <header 
            className={style.header}
            style={gradientStyle.header}
        >
            
            <h1 
                className={style.header_h1}
            >Simple Color</h1>

            <p 
                className={style.header_p}
            >A tool for lazy developers</p>

            <div 
                className={style.header_inputs}
            >
                <input 
                    className={style.header_input_text} 
                    style={gradientStyle.headerInput}
                    ref={colorRef} 
                    type="text" 
                    placeholder="Set your color"
                />
                
                <input 
                    className={style.header_input_color} 
                    onChange={(e) => putColor(e)} 
                    type="color" 
                />
            </div>
            <button 
                className={style.header_button} 
                onClick={chooseColor}
                style={gradientStyle.headerButton}
            >Set Color</button>

        </header>
    );
}