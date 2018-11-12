declare interface IController{
    getView():IView;
    show(param?:any):boolean;
    hide();
}