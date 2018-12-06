

class ModuleManager extends egret.EventDispatcher {
    public static instance:ModuleManager=new ModuleManager();

    private _modules: { [key: string]: IModule; }
    public constructor(){
        super()
        this._modules={};
    }

    public registModule(name:string,module:IModule){
        module.setName(name);
        this._modules[name]=module;
        module.onRegisted();
    }

    public unregistModule(name:string):IModule{
        var module=this._modules[name];
        delete this._modules[name];
        return module;
    }

    public showModule(name:string,param?:any){
        let gameModule=this._modules[name]
        if(gameModule){
            gameModule.show(param)
        }
    }

    public hideModule(name:string){
        let gameModule=this._modules[name]
        if(gameModule){
            gameModule.hide();
        }
    }

    public getModule(name:string):IModule{
        return this._modules[name];
    }
}
