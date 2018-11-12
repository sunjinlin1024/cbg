
class RoleModel extends BaseItemModel{
    private _otherInfo:IOtherInfo

    public getEvaluator():evaluator.BaseEvaluator{
        return evaluator._roleEvaluator
    }

    public initByData(data:any){
        super.initByData(data)
        if(data.desc&&data.desc!=""&&data.desc!="null"){
            let desc=data.desc.replace(/\(\[/g,"{").replace(/\(\{/g,"[").replace(/\,\]\)/g,"}").replace(/\,\}\)/g,"]").replace(/\]\)/g,"}").replace(/\}\)/g,"]")
            this.desc0=NJson.decode(desc)[0]
        }
    }

    public get name():string{
		return this.desc0.cName
	}
}