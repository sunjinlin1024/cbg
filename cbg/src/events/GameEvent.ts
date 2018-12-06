class GameEvent extends egret.Event{

    public static ON_GAME_RESUME: string = "ON_GAME_RESUME"
    public static ON_GAME_PAUSE: string = "ON_GAME_PAUSE"

    public static ON_CLOSE_VIEW: string = "ON_CLOSE_VIEW"


    
    public static MODULE_CHECK_SHOW_SUCCESS:string="MODULE_CHECK_SHOW_SUCCESS"
    public static ON_PLAYER_PROPERTY_CHANGE:string="ON_PLAYER_PROPERTY_CHANGE"


    public constructor(event:string,data?:any){
        super(event,false,false,data);
    }
}