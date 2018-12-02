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
            if(target.descInfo.iExptSki1>0)num+=config.xiulian_role[target.descInfo.iExptSki1].coin3All
            if(target.descInfo.iExptSki3>0)num+=config.xiulian_role[target.descInfo.iExptSki3].coin3All
            if(target.descInfo.iExptSki5>0)num+=config.xiulian_role[target.descInfo.iExptSki5].coin3All
            if(target.descInfo.iExptSki2>0)num+=config.xiulian_role[target.descInfo.iExptSki2].coin2All
            if(target.descInfo.iExptSki4>0)num+=config.xiulian_role[target.descInfo.iExptSki4].coin2All

            if((target.descInfo.i3FlyLv&&target.descInfo.i3FlyLv>0)||target.descInfo.iZhuanZhi>0){//飞升未降修要扣除降修价值
                let bigMax=Math.max(target.descInfo.iMaxExpt1,target.descInfo.iMaxExpt3)//只计算主修
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
            if(target.descInfo.iBeastSki1>0)num+=config.xiulian_pet[target.descInfo.iBeastSki1].exp_all*bbxExp2CoinRate
            if(target.descInfo.iBeastSki2>0)num+=config.xiulian_pet[target.descInfo.iBeastSki2].exp_all*bbxExp2CoinRate
            if(target.descInfo.iBeastSki3>0)num+=config.xiulian_pet[target.descInfo.iBeastSki3].exp_all*bbxExp2CoinRate
            if(target.descInfo.iBeastSki4>0)num+=config.xiulian_pet[target.descInfo.iBeastSki4].exp_all*bbxExp2CoinRate

            //技能
            let skillId:number
            let level:number
            for(let id in target.descInfo.all_skills){
                skillId=Number(id)
                level=target.descInfo.all_skills[id]
                let skillInfo=config.skill[skillId]
                if(skillInfo){
                    switch(skillInfo.type){
                        case Const.SKILL_TYPE_SCHOOL://师门技能
                            level=Math.min(config.common[Const.COMMON_KEY_SKILL_SCHOOL_MAX].val,level-0)//todo减去符石组合等级
                            num+=config.skill_sm[level].coin_all*skillInfo.val
                            break
                        case Const.SKILL_TYPE_BANGPAI://帮派技能
                            if(skillInfo.type2==2){//强壮，神速
                                num+=config.skill_bp2[level].coin_all
                            }else if(skillInfo.type2==1){
                                num+=config.skill_bp[level].coin_all*skillInfo.val
                            }
                            break
                    }
                }
            }
            //熟练度
            if(target.descInfo.iSmithski>0)num+=target.descInfo.iSmithski*config.common[Const.COMMON_KEY_SHULIAN_TO_COIN].val
            if(target.descInfo.iSewski>0)num+=target.descInfo.iSewski*config.common[Const.COMMON_KEY_SHULIAN_TO_COIN].val
            //经脉
            if(target.descInfo.TA_iAllNewPoint>0)num+=config.jingmai[target.descInfo.TA_iAllNewPoint].coin_all
            //储备
            if(target.descInfo.iLearnCash>0)num+=target.descInfo.iLearnCash
            num=num*config.common[Const.COMMON_KEY_CHUBEI_RATE].val//以上折算为储备价值
            //仙玉
            if(target.descInfo.xianyu!=0)num=num+target.descInfo.xianyu*config.common[Const.COMMON_KEY_XIANYU_TO_DOT].val*config.server[target.serverid].coin_rate*0.1
            //金币
            num+=target.descInfo.iCash+target.descInfo.iSaving//金币和存银

            return num
        }
    }
    export const _roleEvaluator:RoleEvaluator=new RoleEvaluator()

    
    
    export class PetEvaluator extends BaseEvaluator{
        public evaluate(target:PetModel):number{
            let num=0
            let skillCount=target.attr.all_skill.length
            let growth=target.attr.growth
            // if(target.attr.lifetime<0){//神兽基础价值3亿
            //     num+=300000000
            // }
            //计算召唤兽技能价值
            let attackSkillVal=0
            let fashuSkillVal=0
            let fuzhuSkillVal=0
            for(let skill of target.attr.all_skill){
                let info=config.skill[skill]
                switch(info.type2){
                    case 0:
                        attackSkillVal+=info.val
                        fashuSkillVal+=info.val
                        fuzhuSkillVal+=info.val
                        break
                    case 1:
                        attackSkillVal+=info.val
                        break
                    case 2:
                        fashuSkillVal+=info.val
                        break
                }
            }
            let canBeAttack=target.attr.attack_aptitude>=1400&&target.attr.growth>=1.235
            let canBeFashu=skillCount>=4
            
            //计算召唤兽资质成长价值
            //通过基础属性判断是攻宠法宠血宠胚子

            //计算召唤兽技能数量价值
            num*=config.common[301001+skillCount].val
            
            num+=Math.max(attackSkillVal,fashuSkillVal,fuzhuSkillVal)*100000
            
            //计算召唤兽装备价值

            //计算召唤兽进阶价值
            num+=target.descInfo.weaken*1500000
            //计算召唤兽内丹价值

            //计算召唤兽觉醒技能价值
            return num
        }
    }
    export const _petEvaluator:PetEvaluator=new PetEvaluator()
}