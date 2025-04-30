import { ChangeEvent, useRef, useContext, CSSProperties } from "react";
import { useColors, Colors } from "../../hooks/useColors";
import { ColorsContext } from "../../contexts/Colors";

import style from "./Header.module.css"

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



    return (
        <header 
            className={style.header}
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
            >Set Color</button>

        </header>
    );
}