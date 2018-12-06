module game{
    export var root:Main
    export var moduleManager:ModuleManager
    export var modelManager:ModelManager
    export var timerManager:TimerManager
    export var layerManager:LayerManager
    export var gameConfig:GameConfig
    export var cbgModel:CBGModel
    export function init(main:Main){
        root=main
        
        initSingleTons()
        registModules()

        game.moduleManager.showModule(Const.MODULE_EVALUATE)
    }

    function initSingleTons(){
        
        timerManager=new TimerManager()
        modelManager=new ModelManager()
        moduleManager=new ModuleManager()
        layerManager = new LayerManager()
        layerManager.init(game.root)

        gameConfig=new GameConfig()
        cbgModel=new CBGModel()
    }

    function registModules(){
        game.moduleManager.registModule(Const.MODULE_EVALUATE,new EvaluateModule())
    }

    //-------------event handler-------------
    var dispatcher: egret.EventDispatcher = new egret.EventDispatcher();
    export function dispatchEvent(event: egret.Event) {
        dispatcher.dispatchEvent(event)
    }

    export function addEventListener(event: string, handler: Function, thisObj?: any, useCapture?: boolean, priority?: number) {
        dispatcher.addEventListener(event, handler, thisObj, useCapture, priority)
    }

    export function removeEventListener(event: string, handler: Function, thisObj?: any, useCapture?: boolean) {
        dispatcher.removeEventListener(event, handler, thisObj, useCapture)
    }

    //--------------loading interface------------------
    export function hideLoading() {
        game.moduleManager.hideModule(Const.MODULE_LOADING)
    }

    export function showLoading(text: string | egret.DisplayObject, displayDelay: number = 0, progress: number = -1) {
        game.moduleManager.showModule(Const.MODULE_LOADING, { displayDelay: displayDelay, progress: progress, descText: text })
    }
    //--------------loading interface------------------

    //--------------dialog interface------------------
    export function showDialog(content: string | egret.DisplayObject, sureHandle?: Function, cancelHandle?: Function, hideClose: boolean = false) {
        // console.log("[dialog]",content)
        game.moduleManager.showModule(Const.MODULE_DIALOG, { content: content, sureHandle: sureHandle, cancelHandle: cancelHandle, hideClose: hideClose })
    }
    //--------------dialog interface------------------

    //------------------tip----------------------
    export function tipMsg(msg: string) {
        moduleManager.showModule(Const.MODULE_TIP, msg)
    }
}