module game{
    export var root:Main
    export var moduleManager:ModuleManager
    export var modelManager:ModelManager
    export var timerManager:TimerManager
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
        gameConfig=new GameConfig()
        cbgModel=new CBGModel()
    }

    function registModules(){
        game.moduleManager.registModule(Const.MODULE_EVALUATE,new EvaluateModule())
    }
}