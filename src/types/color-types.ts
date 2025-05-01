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

export type ColorsContextValue = {
    colors: Colors,
    setColors: React.Dispatch<React.SetStateAction<Colors>>
};