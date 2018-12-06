enum GameLayer {
    FIXED_UI,
    FLOAT_UI,
    TOP_UI,
}

class LayerManager {
    private _layers: egret.DisplayObjectContainer[];
    private _layerViews: IView[][];

    private _mask: eui.Rect

    public init(stage: egret.DisplayObjectContainer) {
        this._layerViews = []
        this._layers = []
        var container: egret.DisplayObjectContainer
        for (var i = 0; i <= GameLayer.TOP_UI; i++) {
            container = new egret.DisplayObjectContainer()
            this._layers[i] = container;
            stage.addChild(container)
        }
    }

    public getViewCount() {
        let counts = []
        for (let layer of this._layers) {
            counts.push(layer.numChildren)
        }
        return counts
    }

    private getViewIndex(view: IView) {
        let layer = view.getLayer()
        let views = this._layerViews[layer]
        if (views) {
            for (let k = views.length - 1; k >= 0; k--) {
                if (views[k] == view) {
                    return k
                }
            }
        }
        return -1
    }

    public addView(view: IView) {
        // console.log("layer manader add view",view)
        let layer = view.getLayer()
        let views = this._layerViews[layer]
        if (!views) {
            views = [view]
            this._layerViews[layer] = views
        } else {
            let idx = this.getViewIndex(view)
            if (idx >= 0) {
                if (idx == views.length - 1) {
                    return //新视图就在顶层，不予处理
                }
                views.splice(idx, 1)
                // if(view.getContainer().parent){
                // view.getContainer().parent.removeChild(view.getContainer())
                // }      
            }
            let alone = (layer == GameLayer.FIXED_UI) || (layer == GameLayer.FLOAT_UI && view.getAlone())
            if (alone) {
                //挤掉同层其他视图
                for (let k = views.length - 1; k >= 0; k--) {
                    let view = views[k]
                    if (!view.isCache()) {
                        view.dispatchEvent(new GameEvent(GameEvent.ON_CLOSE_VIEW))
                        this.removeViewAtLayerAndIndex(view)
                    }
                }
            }
            //添加到顶层
            views.push(view)
        }
        let index = view.getIndex()
        let parent = view.getContainer().parent
        if (parent) {
            parent.setChildIndex(view.getContainer(), index >= 0 ? index : parent.numChildren - 1)
        } else {
            if (index >= 0) {
                this._layers[layer].addChildAt(view.getContainer(), index)
            } else {
                this._layers[layer].addChild(view.getContainer());
            }
        }
        if (layer <= GameLayer.FLOAT_UI) {
            this.onAddCheckDisplay(view)
        }
        if (layer > GameLayer.FIXED_UI) {
            this.checkMask(view, true)
        }
    }

    //检查是否需要显示遮罩
    private checkMask(view: IView, isAdd: boolean) {
        if (this._mask && this._mask.parent) {
            this._mask.parent.removeChild(this._mask)
        }
        let showMask: boolean = false
        let layer: egret.DisplayObjectContainer
        let tmpView: egret.DisplayObject
        let maskIndex: number = -1
        let maskLayer: GameLayer
        for (let k = GameLayer.FLOAT_UI; k <= GameLayer.TOP_UI; k++) {
            maskLayer = k
            layer = this._layers[k]
            for (let i = 0, count = layer.numChildren; i < count; i++) {
                tmpView = layer.getChildAt(i)
                if (tmpView && tmpView["needMask"] && tmpView["needMask"]()) {
                    maskIndex = i
                    break
                }
            }
            if (maskIndex >= 0) {
                break
            }
        }
        if (maskIndex >= 0) {
            this.showMask(maskLayer, maskIndex)
        } else {
            this.hideMask()
        }
    }

    private showMask(layer: GameLayer, index: number) {
        let parent = this._layers[layer]
        if (!this._mask) {
            // this._mask=new eui.Image()
            this._mask = new eui.Rect(game.root.relativeWidth, game.root.relativeHeight);
            this._mask.addEventListener(eui.UIEvent.COMPLETE, this.onInitMaskComplete, this)
            game.addEventListener(egret.Event.RESIZE, this.onInitMaskComplete, this)
            this._mask.fillColor = 0x000000
            this._mask.alpha = 0.75
            // this._mask.scale9Grid=new egret.Rectangle(3,3,3,3)
            // this._mask.source="black_png"

        } else {
            this._mask.visible = true
            if (this._mask.parent) {
                this._mask.parent.removeChild(this._mask)
            }
        }
        parent.addChildAt(this._mask, index)
    }

    private onInitMaskComplete() {
        if (this._mask) {
            this._mask.width = game.root.relativeWidth
            this._mask.height = game.root.relativeHeight
        }
    }

    private hideMask() {
        if (this._mask) {
            this._mask.visible = false
        }
    }

    //检查view是否被遮盖，它下面的view是否需要隐藏
    private onAddCheckDisplay(view: IView) {
        let layer = view.getLayer()
        let views = this._layerViews[layer]
        let isDisplayed: boolean = view.isDisplayed()
        for (let l = layer + 1; l < GameLayer.TOP_UI; l++) {
            views = this._layerViews[l]
            if (views) {
                for (let i = views.length - 1; i >= 0; i--) {
                    if (views[i].isOpaque()) {//仍然被上层遮盖
                        if (isDisplayed) {
                            view.undisplay()
                        }
                        return//后面都不处理
                    }
                }
            }
        }
        if (!isDisplayed) {//没有被遮盖
            view.display()
        }
        if (view.isOpaque()) {//遮盖其他view
            let max: number
            let view: IView
            for (let l = layer; l >= 0; l--) {
                if (this._layerViews[l]) {
                    max = this._layerViews[l].length - 1
                    if (l == layer) {
                        --max;
                    }
                    for (let k = max; k >= 0; k--) {
                        view = this._layerViews[l][k]
                        view.undisplay()//后面的view都被新view遮盖
                        if (view.isOpaque()) {//后面的view已被当前界面遮盖
                            return
                        }
                    }
                }
            }
        }
    }

    private removeViewAtLayerAndIndex(view: IView): boolean {
        let layer = view.getLayer()
        let has = false
        if (this._layerViews[layer]) {
            for (let idx = this._layerViews[layer].length - 1; idx >= 0; idx--) {
                if (this._layerViews[layer][idx] == view) {
                    this._layerViews[layer].splice(idx, 1)
                    has = true
                }
            }
        }
        let container = view.getContainer()
        if (container.parent) {
            container.parent.removeChild(container)
        }
        return has
    }

    //检查view下面的其他view是否需要显示
    private onRemoveCheckDisplay(view: IView) {
        let layer = view.getLayer()
        if (view.isOpaque()) {//被遮盖view重新计算
            let views: IView[]
            for (let k = layer; k < GameLayer.TOP_UI; k++) {
                views = this._layerViews[k]
                if (views && views.length > 1) {
                    for (let j = views.length - 1; j >= 0; j--) {
                        if (views[j].isOpaque()) {
                            return //仍然被上层遮盖，那么无变化
                        }
                    }
                }
            }
            let otherView: IView
            for (let l = Math.min(GameLayer.FLOAT_UI, layer); l >= 0; l--) {
                views = this._layerViews[l]
                if (views) {
                    for (let k = views.length - 1; k >= 0; k--) {
                        otherView = views[k]
                        otherView.display()//之前被此view遮盖的view显示
                        if (otherView.isOpaque()) {
                            return
                        }
                    }
                }
            }
        }
    }

    public isViewShowing(name: string) {
        for (let l = GameLayer.FLOAT_UI; l >= GameLayer.FIXED_UI; l--) {
            let views = this._layerViews[l];
            if (views) {
                for (let view of views) {
                    // if(view.getnam)
                    if (view.getName() == name) {
                        return true
                    }
                }
            }
        }
        return false
    }


    public removeView(view: IView) {
        // console.log("layer manager removeView view",view)
        if (this.removeViewAtLayerAndIndex(view)) {
            let layer = view.getLayer()
            if (layer <= GameLayer.FLOAT_UI) {
                this.onRemoveCheckDisplay(view)
            }
            if (layer > GameLayer.FIXED_UI) {
                this.checkMask(view, false)
            }
        }
    }

}