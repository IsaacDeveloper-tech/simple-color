import { useContext } from "react";
import { ColorsContext } from "~/contexts/Colors";
import { ColorsContextValue } from "~/types/color-types";

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
        <div className="w-full h-[50vh] flex items-center justify-center">
            <Color colorBackground={primary} colorText={primaryText} />
            <Color colorBackground={secondary} colorText={secondaryText} />
            <Color colorBackground={tertiary} colorText={tertiaryText} />
            <Color colorBackground={background} colorText={text} />
        </div>
    );
}

function Color(data:ColorProps){
    return(
        <div className="w-[25vw] text-center">
            <div 
                className="h-[50vh]" 
                style={{
                    backgroundColor:data.colorBackground,
                    color:data.colorText
                }}
            >
                <span>{data.colorBackground}</span>
            </div>
        </div>
    );
}