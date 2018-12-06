// interface ControllerEventHandler{
//     event:string,
//     from:egret.EventDispatcher
//     handler:Function
// }

class BaseController extends egret.EventDispatcher implements IController {
    protected _view: IView;

    private messageHandler: { [key: string]: Function } = {}
    private _listend = false

    public constructor() {
        super();
        this.initListeners()
    }

    public getView(): IView {
        return this._view;
    }

    public checkShow(param:any){
        this.checkShowSuccess()
    }

    protected checkShowSuccess(){
        this.dispatchEvent(new GameEvent(GameEvent.MODULE_CHECK_SHOW_SUCCESS))
    }

    public show(param?: any): boolean {
        if (!this._view) {
            this._view = this.createView()
            if (this._view) {
                this._view.setController(this)
                this._view.addEventListener(GameEvent.ON_CLOSE_VIEW, this.onCloseView, this)
            }
        }
        if (this._view) {
            game.layerManager.addView(this._view);
            this._view.show(param);
        }
        return true;
    }

    public hide() {
        if (this._view) {
            this._view.hide()
            game.layerManager.removeView(this._view);
            this._view = null
        }
    }

    protected createView(): IView {
        return null;
    }

    protected initListeners() {
    }

    // public sendMsg(proto: string, data: any[], receiveProto?: string, callback?: Function, failBack?: Function, alone: boolean = true) {
    //     if (alone) {
    //         Game.showLoading("", 0.5)
    //     }
    //     if (receiveProto && callback) {
    //         Game.connectMananger.registOnceCall(proto, receiveProto, (data) => {
    //             if (alone) {
    //                 Game.hideLoading()
    //             }
    //             callback(data)
    //         }, () => {
    //             if (alone) {
    //                 Game.hideLoading()
    //             }
    //             if (failBack != null) {
    //                 let result = failBack()
    //                 if (result) {
    //                     Game.tipMsg(result)
    //                 }
    //             } else if (alone) {
    //                 Game.tipMsg("请求失败，请重试")
    //             }
    //         })
    //     }
    //     game.connectMananger.send(proto, data)
    // }

    protected listenMsg(proto: string, handler: Function) {
        this.messageHandler[proto] = handler
        if (!this._listend) {
            this._listend = true
            // game.connectMananger.addEventListener(GameEvent.CONNECTION_DATA, this.onGetMsg, this)
        }
    }

    protected unlistenMsg(proto: string) {
        delete this.messageHandler[proto]
    }

    protected clearListen() {
        this.messageHandler = {}
        this._listend = false
        // game.connectMananger.removeEventListener(GameEvent.CONNECTION_DATA, this.onGetMsg, this)
    }

    private onGetMsg(event: GameEvent) {
        if (this.messageHandler[event.data.proto]) {
            this.messageHandler[event.data.proto].apply(this, [event.data.data])
        }
    }

    protected onCloseView(event: GameEvent) {
        console.log("be removed by other view", this)
        event.currentTarget.removeEventListener(GameEvent.ON_CLOSE_VIEW, this.onCloseView, this)
        this._view = null
    }

    public dispatchViewEvent(event: egret.Event) {
        if (!this._view) return
        this._view.dispatchEvent(event)
    }

    public call(funcName: string, ...args): any {
        if (this[funcName]) {
            return this[funcName].apply(this, args)
        }
        return null
    }
}
