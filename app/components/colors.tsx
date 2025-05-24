import { useContext } from "react";
import { GeneralContext } from "~/contexts/General";
import { GeneralContextValue } from "~/types/types";

type ColorProps = {
    colorBackground:string,
    colorText:string
};

export function Colors(){

    const colorContext: GeneralContextValue | null = useContext(GeneralContext);

    if(!colorContext || !colorContext.state.colorState)
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
    } = colorContext.state.colorState;

    return(
        <div className="w-full h-[25vh] flex items-center justify-center">
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