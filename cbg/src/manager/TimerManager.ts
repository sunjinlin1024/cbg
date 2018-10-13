
interface TimerObject {
    id: number;
    callback: Function;
    time:number;
    interval:number;
    repeatCount:number;
}

class TimerManager extends egret.EventDispatcher {
    public static instance:TimerManager=new TimerManager();
    private _id:number=0;

    private _timers:TimerObject[];
    private _interval:number;

    public constructor(){
        super()
        this._timers=[];
    }

    public registTimer(callback:Function,interval:number,repeatCount:number=0):number{
        this._timers.push({callback:callback,time:0,interval:interval,repeatCount:repeatCount,id:++this._id});
        if(this._timers.length==1){
            this._interval=egret.setInterval(this.onTimer,this,1/30)
        }
        return this._id;
    }

    public unregistTimer(id:number){
        for(var i=this._timers.length;i>=0;i--){
            if(this._timers[i].id==id)
            {
                this._timers.splice(i,1)
                break
            }
        }
    }

    private onTimer(dt:number){
        var count=this._timers.length
        var obj
        for(var i=count;i>=0;i--){
            obj=this._timers[i];
            obj.time+=dt;
            if(obj.time>=obj.interval)
            {
                obj.callback();
                obj.time-=obj.interval;
                if(obj.repeatCount>0)
                {
                    obj.repeatCount--;
                    if(obj.repeatCount==0)
                    {
                        this._timers.splice(i,1)
                    }
                }

            }
        }
        if(this._timers.length==0&&this._interval!=0)
        {
            egret.clearInterval(this._interval)
            this._interval=0
        }
    }

}