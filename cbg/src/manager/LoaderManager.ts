class ILoader extends egret.EventDispatcher{
    public constructor(){
        super()
    }
    public getUrl():string{
        return "";
    }
    stop(){}
    pause(){}
    resume(){}
    unload(){}
    load():boolean{
        return;
    }
    onLoadComplete(content:any){}
    onStopLoad(){}
}


enum LoaderPRI{
    IMMEDIATELY,
    NORMAL,
    BACK_UP,
}

class LoaderManager extends egret.EventDispatcher {
    public static instance:LoaderManager=new LoaderManager();

    private _loaders:ILoader[][];
    private _curLoader:ILoader;
    
    public constructor(){
        super()
        this._loaders=[[],[],[]];
        this._curLoader=null;
    }

    public startLoad(loader:ILoader,priority:LoaderPRI=LoaderPRI.NORMAL){

    }


    public stopLoad(){
        if(!this._curLoader)return;
        this._curLoader.stop();
        this._curLoader.removeEventListener(egret.ProgressEvent.COMPLETE,this.onLoadComplete,this)
        this._curLoader.onStopLoad()
        this._curLoader=null
    }

    private checkLoad(){
        if(this._curLoader){
            return;
        }
        for(var i=0;i<this._loaders.length;i++){
            if((i!=LoaderPRI.BACK_UP || true)&&this._loaders[i].length>0){
                this._curLoader=this._loaders[i].shift();
                this._curLoader.addEventListener(egret.ProgressEvent.COMPLETE,this.onLoadComplete,this)
                this._curLoader.load();
                break
            }
        }
    }

    private onLoadComplete(event:egret.ProgressEvent)
    {
        var loader:ILoader=event.currentTarget as ILoader;
        loader.removeEventListener(egret.ProgressEvent.COMPLETE,this.onLoadComplete,this);
        this._curLoader=null
        
        loader.onLoadComplete(event.data);
        
        this.checkLoad();
    }

}
