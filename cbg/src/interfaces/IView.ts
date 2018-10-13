declare interface IView{
    show();
    hide();
    getLayer():GameLayer;
    getContainer():egret.DisplayObjectContainer;
}