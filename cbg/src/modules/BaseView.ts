class BaseView extends egret.DisplayObjectContainer implements IView{

    public constructor(){
        super()
    }

    
    public show(){
        LayerManager.instance.addView(this);
    }

    public hide(){
        LayerManager.instance.removeView(this);
    }

    public getLayer(){
        return GameLayer.FLOAT_UI;
    }

    public getContainer():egret.DisplayObjectContainer{
        return this;
    }
}