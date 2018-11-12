class EvaluateController extends BaseController{

    private _curPageIndex:number=1
    private _maxPage:number=0

    public show(param?:any):boolean{
        let result=super.show()
        // this.reqInfo()
        this.reqInfo(this._curPageIndex)
        return result
    }

    public reqInfo(pageIndex:number){
        let thisObj=this
        
        let url="https://recommd.xyq.cbg.163.com/cgi-bin/recommend.py"
        let param=HttpUtil.getServerRoleParam(Const.Server.SU_DI_CHUN_XIAO,pageIndex)
        HttpUtil.http(url,param,"GET",null,data=>{
            let info=JSON.parse(data)
            thisObj._maxPage=Math.min(10,info.pager.total_pages)
            if(info.equips&&info.equips.length>0){
                game.cbgModel.append(info.equips)
            }
            // if(pageIndex<thisObj._maxPage){
            //     ++thisObj._curPageIndex
            //     game.timerManager.registTimer(()=>{
            //         thisObj.reqInfo(thisObj._curPageIndex)
            //     },10,1)
            // }else{                                                                                                                                                                                                                                                                                                                                                          
            //     game.timerManager.registTimer(()=>{
            //         thisObj.reqInfo(1)
            //     },10,1)
            // }
        },msg=>{
            
        })
    }
}