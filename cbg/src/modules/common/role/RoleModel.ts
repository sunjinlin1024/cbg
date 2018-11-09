class RoleModel extends BaseItemModel{
    public getEvaluator():evaluator.BaseEvaluator{
        return evaluator._roleEvaluator
    }
}