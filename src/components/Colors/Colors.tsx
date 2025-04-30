import style from "./Colors.module.css";
import { useContext } from "react";
import { ColorsContext, ColorsContextValue } from "../../contexts/Colors";

type ColorProps = {
    colorBackground:string,
    colorText:string
};

export function Colors(){

    const colorContext: ColorsContextValue | null = useContext(ColorsContext);

    if(!colorContext || !colorContext.colors)
        return <div>Error getting colors</div>

    const {
        primary,
        primaryText,
        secondary,
        secondaryText,
        tertiary,
        tertiaryText,
        background,
        text
    } = colorContext.colors;

    return(
        <div className={style.colors}>
            <Color colorBackground={primary} colorText={primaryText} />
            <Color colorBackground={secondary} colorText={secondaryText} />
            <Color colorBackground={tertiary} colorText={tertiaryText} />
            <Color colorBackground={background} colorText={text} />
        </div>
    );
}

function Color(data:ColorProps){
    return(
        <div className={style.color}>
            <div 
                className={style.color_background} 
                style={{
                    backgroundColor:data.colorBackground,
                    color:data.colorText
                }}
            >
                <span>{data.colorBackground}</span>
            </div>
            <div className={style.color_text} style={{backgroundColor:data.colorText}}>
                <span>{data.colorText}</span>
            </div>
        </div>
    );
}