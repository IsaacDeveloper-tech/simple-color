import { CSSProperties, useRef } from "react";
import { Colors } from "./useColors";

export type HeaderStyle = {
    header              : CSSProperties,
    headerInput         : CSSProperties,
    headerButton        : CSSProperties
};

enum Style{
    SOLID,
    GRADIENT,
    GAP
};

export function useStyle(colors:Colors) : HeaderStyle{
    const style = useRef<number>(0);
    const max_num_styles : number = 3; 

    const solidStyle : HeaderStyle = {
        
        header: {
            backgroundColor: colors.primary,
            color: colors.primaryText
        },

        headerInput: {
            backgroundColor: colors.background,
            color: colors.text,
            boxShadow: `0 3px 8px -1px ${colors.tertiary}`
        },

        headerButton: {
            backgroundColor: colors.secondary,
            color: colors.secondaryText,
            boxShadow: `0 3px 8px -1px ${colors.tertiary}`
        }
    };

    const gradientStyle : HeaderStyle = {
        
        header: {
            background: `linear-gradient(72deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.primaryText
        },

        headerInput: {
            backgroundColor: colors.background,
            color: colors.text,
            boxShadow: `0 3px 8px -1px ${colors.tertiary}`
        },

        headerButton: {
            background: `linear-gradient(200deg, ${colors.primary} 0%, ${colors.tertiary} 50%, ${colors.secondary} 100%)`,
            color: colors.tertiaryText,
            boxShadow: `0 3px 8px -1px ${colors.tertiary}`
        }
    };

    const gapStyle : HeaderStyle = {
        
        header: {
            backgroundColor: colors.primary,
            color: colors.primaryText
        },

        headerInput: {
            backgroundColor: colors.secondary,
            color: colors.secondaryText,
            borderStyle: "solid",
            borderWidth: "7px",
            borderColor: colors.tertiary,
            borderRadius: 0,
            boxShadow: `0 3px 8px -1px ${colors.secondary}`
        },

        headerButton: {
            backgroundColor: "transparent",
            color: colors.tertiary,
            borderStyle: "solid",
            borderWidth: "7px",
            borderColor: colors.tertiary,
            borderRadius: 0,
            boxShadow: `0 3px 8px -1px ${colors.secondary}`
        }
    };

    if(style.current === max_num_styles)
        style.current = 0;
    else
        style.current++;

    console.log(style.current);

    switch(style.current){
        case Style.SOLID:
            return solidStyle;
        case Style.GRADIENT:
            return gradientStyle;
        case Style.GAP:
            return gapStyle;
        default:
            return gradientStyle;
    }

}