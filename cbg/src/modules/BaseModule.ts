class BaseModule implements IModule{

    private _name:string;
    protected _controller:BaseController;
    public constructor(){
        this._controller=this.createController()
    }

    public onRegisted(){
        
    }

    public setName(name:string){
        this._name=name;
    }

    public getName():string{
        return this._name;
    }

    public show(param:any):boolean{
        return this._controller.show();
    }

    public hide(){
        this._controller.hide()
    }

    public getController():IController{
        return this._controller;
    }

    protected createController():BaseController{
        return  null
    }
}