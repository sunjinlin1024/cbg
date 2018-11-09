class RoleModel extends BaseItemModel{
    public getEvaluator():evaluator.BaseEvaluator{
        return evaluator._roleEvaluator
    }

    public initByData(data:any){
        super.initByData(data)
        if(data.desc&&data.desc!=""&&data.desc!="null"){
            let desc=data.desc.replace(/\(\[/g,"{").replace(/\(\{/g,"[").replace(/\,\]\)/g,"}").replace(/\,\}\)/g,"]").replace(/\]\)/g,"}").replace(/\}\)/g,"]")
            this.desc0=NJson.decode(desc)[0]
        }
                    
        // if(item.other_info&&item.other_info!=""&&item.other_info!="null")item.other_info=JSON.parse(item.other_info)
    }
}