
interface timerObj{
    call:Function,
    callObj:any,
    time:number,
    interval:number,
    repeatCount:number,
    id:number
}

class TimerManager {
    private _id:number=0;
    private _timers:timerObj[];

    // private _onPauseTime: number;
    // private _bgPassTime: number;
    private _lastTime:number
    public constructor(){
        this._timers=[];
        
        // game.addEventListener(GameEvent.ON_GAME_PAUSE, this.onPause, this);
        // game.addEventListener(GameEvent.ON_GAME_RESUME,this.onResume,this);
    }

    // private onPause(){
    //     this._onPauseTime = egret.getTimer();
    // }

    // private onResume(){
    //     this._bgPassTime = egret.getTimer() - this._onPauseTime;
    // }

    public regist(callback:Function,thisObj:any,interval:number,repeatCount:number=0):number{
        this._timers.push({call:callback,callObj:thisObj,time:0,interval:interval,repeatCount:repeatCount,id:++this._id});
        if(this._timers.length==1){
            this._lastTime=egret.getTimer()
            egret.Ticker.getInstance().register(this.onTimerCount,this)
        }
        return this._id;
    }

    public unregist(id:number){
        for(let i=this._timers.length-1;i>=0;i--){
            if(this._timers[i].id==id){
                this._timers.splice(i,1)
                return true
            }
        }
        return false
    }

    public getTimerCount(){
        if(!this._timers)return 0
        return this._timers.length
    }

    public getTimers(){
        return this._timers
    }

    private onTimerCount(){
        let time=egret.getTimer()
        let dt=(time-this._lastTime)*0.001
        this._lastTime=time

        let count=this._timers.length
        let obj:timerObj
        let removeIds=[]
        for(let i=0;i<count;i++){
            obj=this._timers[i];
            if(!obj)continue
            obj.time+=dt;
            if(obj.time>=obj.interval){
                obj.time-=obj.interval
                obj.call.apply(obj.callObj,[dt])
                if(obj.repeatCount>0){
                    obj.repeatCount--
                    if(obj.repeatCount==0){
                        removeIds.push(obj.id)
                    }
                }
            }
        }
        for(let id of removeIds){
            this.unregist(Number(id))
        }

        if(this._timers.length==0){
            egret.Ticker.getInstance().unregister(this.onTimerCount,this)
        }
    }

}