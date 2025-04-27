import { ChangeEvent, useRef } from "react";
import { useColors, Colors } from "../../hooks/useColors";

import style from "./Header.module.css"

export function Header(){
    const colorRef = useRef<HTMLInputElement>(null);

    const setColor = (event:ChangeEvent<HTMLInputElement>) : void => {
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

        const colors:Colors = useColors(color.value);

        console.log(colors);
    }

    return (
        <header className={style.header}>
            <h1 className={style.header_h1}>Simple Color</h1>
            <p className={style.header_p}>A tool for lazy developers</p>
            <div>
                <input className={style.header_input} ref={colorRef} type="text" placeholder=""/>
                <input onChange={(e) => setColor(e)} type="color" />
            </div>
            <button onClick={chooseColor}>Set Color</button>
        </header>
    );
}