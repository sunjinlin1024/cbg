class BaseItemModel extends BaseModel{
    
    protected getEvaluator():BaseEvaluator{
        return null
    }


    public get evaluateValue():number{
        return this.getEvaluator().evaluate(this)
    }
}