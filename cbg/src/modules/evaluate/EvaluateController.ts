module evaluator{
    export function getCBGData(data:Object){
        let controller=(game.moduleManager.getModule(Const.MODULE_EVALUATE) as EvaluateModule).getController() as EvaluateController
        controller.onGetData(data)
    }
}

class EvaluateController extends BaseController{

    public static ON_UPDATE_SHOP_LIST:string="ON_UPDATE_SHOP_LIST"

    private _curPageIndex:number=1
    private _maxPage:number=0
    private _flushComplete:boolean=false
    private _model:EvaluateModel=new EvaluateModel()

    protected createView():BaseView{
        return new EvaluateView();
    }

    public get model():EvaluateModel{
        return this._model
    }

    public show(param?:any):boolean{
        let result=super.show()
        this.reqInfo(this._curPageIndex)
        return result
    }

    private onNoticeQQ(msg:string,index:number=0){
        
        console.log(msg)
        if(index>=0)return
        if(index>1){
            console.error("[ERROR]fail notice")
            return
        }
        let thisObj=this
        let param={
            RobotQQ:"1990184749",
            Key:"l1024",
            QQ:272295408,
            Message:encodeURI(msg)
        }
        HttpUtil.http("http://localhost:12222/SendIM.do",param,"GET",null,function(data:string){
            try{
                let result=JSON.parse(data)
                if(result.nFlag&&result.nFlag==1){

                }else{
                    thisObj.onNoticeQQ(msg,index+1)
                }
            }catch(e){
                thisObj.onNoticeQQ(msg,index+1)
            }
        })
    }

    

    public reqInfo(pageIndex:number){
        let thisObj=this
        // console.log("start req",pageIndex)
        
        let url="https://recommd.xyq.cbg.163.com/cgi-bin/recommend.py"
        // let param=HttpUtil.getServerRoleParam(Const.Server.SU_DI_CHUN_XIAO,pageIndex)
        let param=HttpUtil.getAllServerRoleParam(pageIndex)
        // let param=HttpUtil.getPetParam(Const.Server.SU_DI_CHUN_XIAO,pageIndex)

        this._curPageIndex=pageIndex
        HttpUtil.onCORSHttp(url,"evaluator.getCBGData",param,"GET",null,msg=>{
            thisObj.onNoticeQQ("获取信息失败")
        })
    }



    public onGetData(info){
        if(!info.status||info.status!=1){
            this.onNoticeQQ("[ERROR]请求失败:"+info.status)
            return
        }
        this._maxPage=info.pager.total_pages
        let has=false
        if(info.equips&&info.equips.length>0){
            let itemList=game.cbgModel.append(info.equips)
            for(let item of itemList){
                let evaVal=game.gameConfig.CoinToRMB(item.evaluateValue,item.serverid)
                let price=Math.floor(item.price_int*0.01)
                let income=evaVal-price
                let incomeRate=(evaVal-price)/price
                if(item.isHighValue(income,incomeRate)){
                    has=true
                    let incomeVal=income*incomeRate
                    let noticeStr="[利润:"+String(income)+"("+Math.floor(incomeRate*100)+"%)][价格:"+price+"]"+item.toString()+"["+HttpUtil.initRoleDetailUrl(item.server_id,item.eid)+"]"
                    console.log(noticeStr)
                    this._model.appendNotice(item,incomeRate,income)
                    if(item.isNoticeValue(income,incomeRate)){
                        // this.onNoticeQQ(noticeStr)
                    }
                }
            }
        }
        if(has){
            this.dispatchViewEvent(new GameEvent(EvaluateController.ON_UPDATE_SHOP_LIST))
        }  
        if(this._curPageIndex>=this._maxPage){
            this._flushComplete=true
            console.log("-------------------history flush complete-------------------")
        }else if(!has){
            // console.log(".")
        }
        if(!this._flushComplete){
            ++this._curPageIndex
            game.timerManager.regist(()=>{
                this.reqInfo(this._curPageIndex)
            },this,3.5,1)
        }else{                                               
            game.timerManager.regist(()=>{
                this.reqInfo(1)
            },this,5,1)
        }
    }
}