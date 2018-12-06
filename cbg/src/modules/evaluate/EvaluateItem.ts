class EvaluateItem extends eui.Component{
    private lbl_rate:eui.Label
    private lbl_gain:eui.Label
    private lbl_price:eui.Label
    private lbl_area:eui.Label
    private lbl_lv:eui.Label
    private lbl_type:eui.Label
    private lbl_extra:eui.Label
    private img_bg:eui.Image

    private _complete:boolean=false

    private _data:EvaluateItemData
    constructor(){
        super()
        this.touchChildren=false
        this.once(egret.Event.COMPLETE,()=>{
            this._complete=true
            if(this._data)this.updateByData(this._data)
        },this)
        this.skinName="resource/ui/evaluate/EvaluateItemSkin.exml"
    }

    protected childrenCreated(){
        super.childrenCreated()
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            window.open(HttpUtil.initRoleDetailUrl(this._data.model.server_id,this._data.model.eid))
        },this)
    }

    public updateByData(data:EvaluateItemData){
        this._data=data
        if(!this._complete)return
        
        this.lbl_rate.text=Math.floor(this._data.incomeRate*100).toString()
        this.lbl_rate.textColor=this._data.incomeRate>=1.5?Const.COLOR.RED:this._data.incomeRate>=0.8?Const.COLOR.ORANGE:Const.COLOR.WHITE
        this.lbl_gain.text=Math.floor(this._data.income).toString()
        this.lbl_price.text=Math.floor(this._data.model.price_int*0.01).toString()
        this.lbl_price.textColor=this._data.model.appointed_roleid?Const.COLOR.GRAY:Const.COLOR.WHITE
        this.lbl_area.text=this._data.model.serverInfo
        this.lbl_area.textColor=this._data.model.server_id==Const.Server.SU_DI_CHUN_XIAO?Const.COLOR.RED:
            config.server[this._data.model.server_id].sate==1?Const.COLOR.GRAY:Const.COLOR.WHITE
        this.lbl_lv.text=this._data.model.level.toString()
        this.lbl_lv.textColor=this._data.model.getLevelColor()
        this.lbl_type.text=this._data.model.typeDesc
        this.lbl_type.textColor=this._data.model.getTypeColor()
        this.lbl_extra.text=this._data.model.other_info0.summary

        egret.Tween.removeTweens(this.img_bg)
        if(!this._data.first){
            let tween=egret.Tween.get(this.img_bg)
            for(let i=0;i<3;i++){
                tween.to({"alpha":0.34},400)
                tween.to({"alpha":1},400)
            }
        }
        this._data.first=true
    }


}