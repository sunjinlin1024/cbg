class BaseView extends eui.Component implements IView {
    

    // private tweens: egret.Tween[]
    private timerIds: number[];
    protected showParam: any;
    protected _controller: IController
    protected _loadState = 0
    public constructor() {
        super()
        game.addEventListener(egret.Event.RESIZE, this.onResize, this)
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    protected onExit() {
        this.clearTimer()
        this.showParam = null
        game.removeEventListener(GameEvent.ON_PLAYER_PROPERTY_CHANGE, this.onPlayerInfoChange, this)
        game.removeEventListener(egret.Event.RESIZE, this.onResize, this)
    }


    public getName():string{
        return this.name
    }

    // public onDestroy(){

    // }

    protected onPlayerInfoChange(evt: GameEvent) {

    }

    protected onAddToStage(evt: egret.Event) {
        this.onResize(null)
    }

    protected onResize(evt: egret.Event) {
        this.width = game.root.relativeWidth//stage.stageWidth/Game.root.scaleX
        this.height = game.root.relativeHeight//stage.stageHeight/Game.root.scaleY
    }


    public setController(controller: IController) {
        this._controller = controller
    }

    protected loadUI(uiPath: string) {
        if (this._loadState == 0) {
            // await EXML.load(uiPath,this.createCompleteEvent,this);
            // console.log("[ui]!!!!!!!!!!!!!!!!!!!!!!start load",uiPath,egret.getTimer())
            if (this.needShowLoading()) {
                game.showLoading("正在加载界面")
            }
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = uiPath;
        } else if (this._loadState == 1) {
            this.onShow()
        }
    }

    protected needShowLoading(): boolean {
        return true
    }

    protected onShow() {

    }

    public get uiPath(): string {
        return null
    }

    private createCompleteEvent() {//cls:any,path:string): void {
        this._loadState = 1
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        this.onInitComplete()
        // this.once(egret.Event.ENTER_FRAME, this.onEnterOnceCall, this)
        if (this.needShowLoading()) {
            game.hideLoading()
        }
        this.onShow()
    }

    protected onInitComplete() {
        //     console.log("[ui]exml load complete event handle")
    }


    public show(param?: any) {
        this.showParam = param;
        if (this.uiPath) {
            this.loadUI(this.uiPath)
            // console.log("[ui]!!!!!!!!!!!exml load started",this.skinName,egret.getTimer())
        } else {
            this.onInitComplete()
            this.onShow()
        }
        // console.log("[ui]!!!!!!!!!!!!!!!!show",this)
    }

    public hide() {
        // Game.removeEventListener(egret.)
        this.clearTimer()
    }

    public getLayer() {
        return GameLayer.FLOAT_UI;
    }

    public getIndex(): number {
        return -1
    }

    public getContainer(): egret.DisplayObjectContainer {
        return this;
    }

    public getAlone(): any {
        return false
    }


    public isCache(): boolean {
        return false
    }

    public isOpaque(): boolean {
        return true
    }

    public registTimer(callback: Function, interval: number = 0, repeatCount: number = 0, thisObj: any = null): number {
        let timerId = game.timerManager.regist(callback, thisObj, interval, repeatCount)
        if (!this.timerIds) {
            this.timerIds = []
        }
        this.timerIds.push(timerId)
        return timerId
    }

    public unregistTimer(id: number) {
        if (this.timerIds) {
            for (let index = this.timerIds.length - 1; index >= 0; index--) {
                if (this.timerIds[index] == id) {
                    this.timerIds.splice(index, 1)
                    break
                }
            }
        }
        game.timerManager.unregist(id)
    }

    public clearTimer() {
        if (this.timerIds) {
            for (let k of this.timerIds) {
                game.timerManager.unregist(k)
            }
            this.timerIds = null
        }
    }

    public undisplay() {
        // console.log("view undisplay",this)

        this.getContainer().visible = false
    }

    public display() {
        // console.log("view display",this)
        this.getContainer().visible = true
    }

    public isDisplayed(): boolean {
        return this.getContainer().visible
    }

    public needMask(): boolean {
        return false
    }
}