import { GeneralContext } from "~/contexts/General";
import { useContext, useEffect, useState } from "react";

export function NotificationList(){

    const generalContext = useContext(GeneralContext);

    if(!generalContext)
        return;

    const notificationSystem = generalContext.state.notificationSystem;
    const notifications = notificationSystem.getNotifications();

    useEffect(() => {
        const numOfNotifications: number = notifications.length;
        
        if(numOfNotifications === 0)
            return;
        
        const timer = setTimeout(() => {
            generalContext.setState(state => {
                const newState = {...state};

                newState.notificationSystem.deleteNotification();

                return newState;
            });
        }, 5000);

        return () => clearTimeout(timer);

    }, [
        generalContext.state, 
        generalContext.setState
    ]);

    return (
        <div className="fixed pt-2 top-0 w-[100vw] h-auto flex items-center justify-center gap-2 flex-col">
            { notifications.map((notification, index) => <Notification key={index}  text={ notification } />) }
        </div>
    );
}

function Notification({ text }:{ text:string }){

    let [animation, setAnimation] = useState<string>("notification-appears");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimation(() => "notification-disappears");
        }, 4500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`${animation} relative w-[50vw] flex items-center justify-center h-10 bg-green-200 text-white z-50 rounded-md shadow-md`}>
            <span>{ text }</span>
        </div>
    );
}