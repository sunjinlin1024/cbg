class GameEvent extends egret.Event{



    public static ON_PLAYER_PROPERTY_CHANGE:string="ON_PLAYER_PROPERTY_CHANGE"


    public constructor(event:string,data:any){
        super(event,false,false,data);
    }
}