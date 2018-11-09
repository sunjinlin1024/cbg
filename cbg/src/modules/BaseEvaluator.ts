module evaluator{
    export class BaseEvaluator{
        public evaluate(target:any):number{
            return 0
        }
    }

    export class RoleEvaluator extends BaseEvaluator{
        public evaluate(target:RoleModel):number{
            let num=0
            // config.
            // target.other_info
            return num
        }
    }

    export const _roleEvaluator:RoleEvaluator=new RoleEvaluator()
}