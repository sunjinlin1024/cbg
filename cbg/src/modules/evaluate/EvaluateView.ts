class EvaluateView extends BaseView{

    private scl_list:eui.Scroller
    private grp_title:eui.Group


    private _itemList:EvaluateItem[]=[]
    public get uiPath():string{
        return "resource/ui/evaluate/EvaluateUI.exml"
    }

    public getLayer(){
        return GameLayer.FIXED_UI;
    }

    public getIndex():number{
        return 1;
    }

    public needMask():boolean{
        return false;
    }

    public isOpaque(): boolean {
        return true
    }

    protected get controller():EvaluateController{
        return this._controller as EvaluateController
    }

    protected onInitComplete(){   
        super.onInitComplete()  
        this.addEventListener(EvaluateController.ON_UPDATE_SHOP_LIST,this.updateList,this)
    }

    

    public onShow(){
        super.onShow()
    }

    private updateList(){
        let list=this.controller.model.list
        let container=this.scl_list.viewport as eui.Group
        container.invalidateDisplayList()
        let count=container.numChildren

        let showMax=Math.min(50,list.length)
        for(let i=count-1;i>=showMax;i--){
            container.removeChildAt(i)
        }
        let item:EvaluateItem
        for(let i=0;i<showMax;i++){
            if(i<count){
                item=container.getChildAt(i) as EvaluateItem
            }else{
                item=new EvaluateItem()
                container.addChild(item)
            }
            item.updateByData(list[i])
        }
        container.validateDisplayList()

    }
}