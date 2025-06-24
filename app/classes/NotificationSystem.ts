export class NotificationSystem{
    private notifications : Array<string>

    public constructor(){
        this.notifications = new Array<string>();
    }

    public getNotifications(): Array<string>{
        return this.notifications;
    }

    public setNotification(text: string): void{
        if(!text.length)
            return;

        this.notifications.push(text);
    }

    public deleteNotification(): void {
        if(this.notifications.length === 0)
            return;

        this.notifications.slice(1);
    }
}