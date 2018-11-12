class BaseController extends egret.EventDispatcher implements IController{
    protected _view:BaseView;
    

    public constructor(){
        super();
        this.registHandlers()
    }

    // protected registTimer(callback:Function,interval:number,repeateCount:number=0){
    //     game.timerManager.registTimer(()=>{},interval,repeateCount)
    // }

    public getView():IView{
        return this._view;
    }

    public show(param?:any):boolean{
        if(!this._view){
            this._view=this.createView()
        }
        if(this._view)this._view.show()
        return true;
    }

    public hide(){
        if(this._view){
            this._view.hide()
            this._view=null
        }
    }

    protected createView():BaseView{
        return null;
    }

    protected getHandleEvents():string[]{
        return null;
    }

    protected dispathViewEvent(event:string,data:any){
        this._view.dispatchEvent(new GameEvent(event,data))
    }


    protected onHandleEvents(event:egret.Event){

    }

    private registHandlers(){
        var list=this.getHandleEvents()
        if(list){
            for(var i=0;i<list.length;i++){
                this.addEventListener(list[i],this.onHandleEvents,this)
            }
        }
    }
}