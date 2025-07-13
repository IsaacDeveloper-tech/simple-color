import { CSSProperties } from "react";
import { Colors } from "../types/types";

export type HeaderStyle = {
    header              : CSSProperties,
    headerTitle         : CSSProperties,
    headerSubtitle      : CSSProperties,
    headerInput         : CSSProperties,
    headerButton        : CSSProperties,
    headerButtonHover   : CSSProperties,
    headerButtonActive  : CSSProperties,
};

export enum Style{
    SOLID       = "solid",
    GRADIENT    = "gradient",
    GAP         = "gap"
};

export function useStyle(colors:Colors, style:Style = Style.GRADIENT) : HeaderStyle{
    
    const solidStyle : HeaderStyle = {
        
        header: {
            backgroundColor: colors.primary,
            color: colors.primaryText
        },

        headerTitle: {
            fontSize: "8vw"
        },
        headerSubtitle: {
            fontSize: "2vw"
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
        },
        headerButtonHover: {},
        headerButtonActive: {}
    };

    const gradientStyle : HeaderStyle = {
        
        header: {
            background: `linear-gradient(72deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.primaryText
        },

        headerTitle: {
            fontWeight: "lighter",
            fontSize: "8vw"
        },
        headerSubtitle: {
            fontWeight: "lighter",
            fontSize: "2vw"
        },

        headerInput: {
            backgroundColor: colors.background,
            color: colors.text,
            boxShadow: `0 3px 8px -1px ${colors.tertiary}`
        },

        headerButton: {
            background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.secondaryText,
            boxShadow: `0 3px 8px -1px ${colors.tertiary}`
        },

        headerButtonHover: {
            background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.secondaryText,
            boxShadow: `0 3px 4px -1px ${colors.tertiary}`
        },

        headerButtonActive: {
            background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.secondaryText,
            boxShadow: `0 3px 4px -1px ${colors.tertiary}`
        }
    };

    const gapStyle : HeaderStyle = {
        
        header: {
            backgroundColor: colors.background,
            color: colors.text
        },

        headerTitle: {
            color: "transparent",
            backgroundClip: "text",
            backgroundImage: `linear-gradient(200deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.tertiary} 100%)`,
            fontSize: "5vw",
            fontWeight: "bolder"
        },
        headerSubtitle: {
            color: colors.text
        },

        headerInput: {
            backgroundColor: colors.background,
            color: colors.text,
            borderStyle: "solid",
            borderWidth: "5px",
            borderColor: colors.tertiary,
            borderRadius: 0,
            boxShadow: `0 3px 8px -1px ${colors.secondary}`
        },

        headerButton: {
            backgroundColor: "transparent",
            color: colors.tertiary,
            borderStyle: "solid",
            borderWidth: "5px",
            borderColor: colors.tertiary,
            borderRadius: 0,
            boxShadow: `0 3px 8px -1px ${colors.secondary}`,
            fontWeight: "bolder"
        },

        headerButtonHover: {},
        headerButtonActive: {}
    };

    switch(style)
    {
        case Style.SOLID:
            return solidStyle;
    
        case Style.GAP:
            return gapStyle;

        case Style.GRADIENT:
            return gradientStyle;
        
            default:
                return gradientStyle;
    }

}