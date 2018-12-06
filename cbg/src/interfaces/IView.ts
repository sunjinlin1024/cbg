declare interface IView{
    show(param?:any);
    hide();
    getLayer():GameLayer;
    getIndex():number
    getContainer():egret.DisplayObjectContainer;
    getAlone():any;
    dispatchEvent(event:egret.Event);
    addEventListener(type:string,handler:Function,thisObj?:any,useCapture?:boolean)
    setController(controller:IController);
    isCache():boolean;
    isOpaque():boolean;
    undisplay();
    display();
    isDisplayed():boolean;
    needMask():boolean
    getName():string
    // onDestroy()
}