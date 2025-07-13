import { NotificationSystem } from "~/classes/NotificationSystem";
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

export type Status = {
    colorState:Colors,
    styleState:HeaderStyle,
    notificationSystem:NotificationSystem
};

export type GeneralContextValue = {
    state: Status,
    setState: React.Dispatch<React.SetStateAction<Status>>,
};