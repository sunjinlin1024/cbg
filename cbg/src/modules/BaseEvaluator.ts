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

            if((target.desc0.i3FlyLv&&target.desc0.i3FlyLv>0)||target.desc0.iZhuanZhi>0){//飞升未降修要扣除降修价值
                let bigMax=Math.max(target.desc0.iMaxExpt1,target.desc0.iMaxExpt3)//只计算主修
                let subCoin=0
                for(let i=25;i>20;i--){//提上限25需当前上限24当前修炼23
                    if(bigMax==i){
                        break
                    }
                    num-=config.xiulian_role[i-2].coin3
                }
            }

            //宠物修炼,按修炼果价值，经验:金币=150:700000
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
            if(target.desc0.TA_iAllNewPoint>0)num+=config.jingmai[target.desc0.TA_iAllNewPoint].coin_all
            //储备
            if(target.desc0.iLearnCash>0)num+=target.desc0.iLearnCash
            num=num*config.common[Const.COMMON_KEY_CHUBEI_RATE].val//以上折算为储备价值
            //仙玉
            if(target.desc0.xianyu!=0)num=num+target.desc0.xianyu*config.common[Const.COMMON_KEY_XIANYU_TO_DOT].val*config.server[target.serverid].coin_rate*0.1
            //金币
            num+=target.desc0.iCash+target.desc0.iSaving//金币和存银

            return num
        }
    }

    export const _roleEvaluator:RoleEvaluator=new RoleEvaluator()
}