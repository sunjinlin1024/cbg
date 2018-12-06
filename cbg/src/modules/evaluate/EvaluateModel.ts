interface EvaluateItemData{model:BaseItemModel,incomeVal:number,income:number,incomeRate:number,first?:boolean}
class EvaluateModel extends BaseModel{
    private noticeList:EvaluateItemData[]=[]
    

    public get list(){
        return this.noticeList
    }

    public appendNotice(item:BaseItemModel,incomeRate:number,income:number){
        let start=0
        // let end=this.noticeList.length-1
        // let middle=Math.ceil((start+end)/2)
        let incomeVal=incomeRate*income
        let index=this.noticeList.length
        for(let i=0;i<this.noticeList.length;i++){
            if(this.noticeList[i].incomeVal<=incomeVal){
                index=i
                break
            }
        }
        this.noticeList.splice(index,0,{model:item,incomeVal:incomeVal,income:income,incomeRate:incomeRate})
    }
}