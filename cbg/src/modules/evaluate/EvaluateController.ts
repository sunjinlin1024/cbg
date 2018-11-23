class EvaluateController extends BaseController{

    private _curPageIndex:number=1
    private _maxPage:number=0
    private _flushComplete:boolean=false

    public show(param?:any):boolean{
        let result=super.show()
        this.reqInfo(this._curPageIndex)
        return result
    }

    public reqInfo(pageIndex:number){
        let thisObj=this
        // console.log("start req",pageIndex)
        let url="https://recommd.xyq.cbg.163.com/cgi-bin/recommend.py"
        // let param=HttpUtil.getServerRoleParam(Const.Server.SU_DI_CHUN_XIAO,pageIndex)
        let param=HttpUtil.getAllServerRoleParam(pageIndex)
        HttpUtil.http(url,param,"GET",null,function(data:string){
            let info=JSON.parse(data)
            thisObj._maxPage=info.pager.total_pages
            if(info.equips&&info.equips.length>0){
                game.cbgModel.append(info.equips)
                
            }
            if(pageIndex>=thisObj._maxPage){
                this._flushComplete=true
                console.log("-------------------history flush complete-------------------")
            }
            if(!this._flushComplete){
                ++thisObj._curPageIndex
                game.timerManager.registTimer(()=>{
                    thisObj.reqInfo(thisObj._curPageIndex)
                },3.5,1)
            }else{                                               
                game.timerManager.registTimer(()=>{
                    thisObj.reqInfo(1)
                },5,1)
            }
        },msg=>{
            
        })
    }
}