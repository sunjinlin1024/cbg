class CommonButton extends eui.Button {
    public bgImgName: string = "";
    public bgGrayStr: string = "";
    public customData: string = "";
    public soundName: string = ""
    public downDark: boolean = true
    
    public iconY:number=0;
    public iconX:number=0;
    private mask0: eui.Image;
    private down_mask: eui.Component
    private _bg: eui.Image;

    public textSize: number = 30;
    public textColor: number = 0xffffff;
    public constructor() {
        super();
    }

    public set bg(val: string | egret.Texture) {
        if (!this._bg) {
            this._bg = new eui.Image()
            this.addChildAt(this._bg, 0)
        }
        this._bg.source = val
    }

    protected childrenCreated() {
        super.childrenCreated()
        if (this.numChildren > 0) {
            this._bg = this.getChildAt(0) as eui.Image
        }
        if (this.down_mask) {
            this.down_mask.visible = false
            if (this.mask0) {
                this.mask0.visible = true;
                this.down_mask.mask = this.mask0;
            }
        }
        let label = this.labelDisplay as eui.Label;
        if (label) {
            label.size = this.textSize;
            label.textColor = this.textColor;
        }

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this)
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this._onTouchCancel, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this)
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onUp, this)
    }

    public setGray(bEnabled: boolean) {
        if (this.downDark) {
            if (bEnabled) {
                FilterUtil.addFilter(this, FilterUtil.DARK);
            } else {
                FilterUtil.clearFilter(this);
            }
        } else {
            if (this.down_mask) {
                this.down_mask.visible = bEnabled
            }
        }
    }

    protected _onTouchBegin() {
        // console.log("touchBegin")
        // this._bg.scaleX=this._bg.scaleY=0.9
        // this._bg.y=1
        // this._bg.filters=[new egret.ColorMatrixFilter(
        // 		[0.75,0,0,0,0,   
        //          0,0.75,0,0,0,   
        //          0,0,0.75,0,0,  
        //          0,0,0,1,0] 
        // )]
        this.setGray(true);
        // Game.audioManager.playSound(this.soundName == "" ? "all>click" : this.soundName)
    }


    protected _onTouchCancel() {
        // console.log("touchCancel")
        // this._bg.scaleX=this._bg.scaleY=1
        // this._bg.y=0
        // this._bg.filters=null

        this.setGray(false);
    }

    protected _onClick() {
        // console.log("button click")
        // this._bg.scaleX=this._bg.scaleY=1
        // this._bg.y=0
        // this._bg.filters=null        
        this.setGray(false);
    }

    protected _onUp() {
        // this._bg.scaleX=this._bg.scaleY=1
        // this._bg.y=0
        // this._bg.filters=null
        this.setGray(false);
    }
}