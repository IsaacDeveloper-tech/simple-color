import { GeneralContext } from "~/contexts/General";
import { useContext, useEffect } from "react";

export function NotificationList(){

    const generalContext = useContext(GeneralContext);

    if(!generalContext)
        return;

    const notificationSystem = generalContext.state.notificationSystem;

    const notifications = notificationSystem.getNotifications();

    return (
        <div>
            { notifications.map((notification, index) => <Notification key={index}  text={ notification } />) }
        </div>
    );
}

function Notification({ text }:{ text:string }){
    return (
        <div className="notification">
            <span>{ text }</span>
        </div>
    );
}