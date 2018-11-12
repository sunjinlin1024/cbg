module evaluator{
    export class BaseEvaluator{
        public evaluate(target:any):number{
            return 0
        }
    }

    export class RoleEvaluator extends BaseEvaluator{
        public evaluate(target:RoleModel):number{
            let num=0
            //人物修炼
            if(target.desc0.iExptSki1>0)num+=config.xiulian_role[target.desc0.iExptSki1].coin3All
            if(target.desc0.iExptSki3>0)num+=config.xiulian_role[target.desc0.iExptSki3].coin3All
            if(target.desc0.iExptSki5>0)num+=config.xiulian_role[target.desc0.iExptSki5].coin3All
            if(target.desc0.iExptSki2>0)num+=config.xiulian_role[target.desc0.iExptSki2].coin2All
            if(target.desc0.iExptSki4>0)num+=config.xiulian_role[target.desc0.iExptSki4].coin2All

            //宠物修炼,按经验*经验比，暂定150:700000
            // let bbxs=[Const.KEY_BB_EXPT_FANGYU,Const.KEY_BB_EXPT_KANGFA,Const.KEY_BB_EXPT_GONGJI,Const.KEY_BB_EXPT_FASHU]
            // for(let key of bbxs){
            //     if(target.getNum())
            // }
            let bbxExp2CoinRate=config.common[Const.COMMON_KEY_BB_XIU_EXP_TO_COIN].val
            if(target.desc0.iBeastSki1>0)num+=config.xiulian_pet[target.desc0.iBeastSki1].exp_all*bbxExp2CoinRate
            if(target.desc0.iBeastSki2>0)num+=config.xiulian_pet[target.desc0.iBeastSki2].exp_all*bbxExp2CoinRate
            if(target.desc0.iBeastSki3>0)num+=config.xiulian_pet[target.desc0.iBeastSki3].exp_all*bbxExp2CoinRate
            if(target.desc0.iBeastSki4>0)num+=config.xiulian_pet[target.desc0.iBeastSki4].exp_all*bbxExp2CoinRate
            //技能
            let skillId:number
            let level:number
            for(let id in target.desc0.all_skills){
                skillId=Number(id)
                level=target.desc0.all_skills[id]
                let skillInfo=config.skill[skillId]
                if(skillInfo){
                    switch(skillInfo.type){
                        case Const.SKILL_TYPE_SCHOOL://师门技能
                            level=Math.min(config.common[Const.COMMON_KEY_SKILL_SCHOOL_MAX].val,level-0)//todo减去符石组合等级
                            num+=config.skill_sm[level].coin_all
                            break
                        case Const.SKILL_TYPE_BANGPAI://帮派技能
                            if(skillInfo.type2==2){//强壮，神速
                                num+=config.skill_bp2[level].coin_all
                            }else if(skillInfo.type2==1){
                                num+=config.skill_bp[level].coin_all
                            }
                            break
                    }
                }
            }
            //经脉

            

            return num*config.common[Const.COMMON_KEY_CHUBEI_RATE].val
        }
    }

    export const _roleEvaluator:RoleEvaluator=new RoleEvaluator()
}