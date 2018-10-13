declare interface IModule{
    onRegisted();
    setName(name:string);
    getName():string;
    show(param:any):boolean;
    hide();
}