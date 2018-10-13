enum GameLayer{
    BACK_GROUND,
    FIXED_UI,
    FLOAT_UI,
    TOP_UI,
}

class LayerManager{
    public static instance:LayerManager=new LayerManager();

    private _layers:egret.DisplayObjectContainer[];

    public init(stage:egret.Stage){
        var container:egret.DisplayObjectContainer
        for(var i=0;i<=GameLayer.TOP_UI;i++){
            container=new egret.DisplayObjectContainer()
            this._layers[i]=container;
            stage.addChild(container)
        }
    }


    public addView(view:IView){
        this._layers[view.getLayer()].addChild(view.getContainer());
    }


    public removeView(view:IView){
        this._layers[view.getLayer()].removeChild(view.getContainer());
    }

}