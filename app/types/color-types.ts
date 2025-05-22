import { HeaderStyle } from "~/hooks/useStyle";

export type Colors = {
    primary         : string,
    secondary       : string,
    tertiary        : string,

    primaryText     : string,
    secondaryText   : string,
    tertiaryText    : string,

    background      : string,
    text            : string
};

export type GeneralContextValue = {
    colors: Colors,
    setColors: React.Dispatch<React.SetStateAction<Colors>>,
    styleType: HeaderStyle,
    setStyleType: React.Dispatch<React.SetStateAction<HeaderStyle>>
};