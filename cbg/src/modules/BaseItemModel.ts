///<reference path="../config/Const.ts" />
interface IOtherInfo{
	usernum:number,
	add_melt_attrs:Object,
	xianyu:number,
	xiulian:number,
	cName:string,
	iGrade:number,
	pet_xiulian:number,
	iUpExp:number,
	iOrgOffer:number,
	iGoodness:number,
	iBadness:number,
	iMaxExpt3:number,
	iMaxExpt2:number,
	iMaxExpt1:number,
	ExpJwBase:number,
	iMaxExpt4:number,
	iIcon:number,
	iSaving:number,
	AchPointTotal:number,
	iBeastSki4:number,
	iSchool:number,
	iBeastSki1:number,
	iMaxExpt5:Object,
	iBeastSki3:number,
	iBeastSki2:number,
	iZhuanZhi:number,
	iCash:number,
	iExptSki2:number,
	iExptSki3:number,
	iExptSki1:number,
	iSchOffer:number,
	iExptSki4:number,
	iExptSki5:number,
	all_skills:Object,
	i3FlyLv:number,
	ExpJw:number,
	summary:string,
	highlight:string,
}

interface IDescInfo{
	iMarry:number,
	icolor_ex:number,
	iRes_All:number,
	iErrantry:number,
	TA_iAllNewPoint:number,
	iTotalMagDam_all:number,
	iMaxExpt4:number,
	rent:number,
	iMagDef_All:number,
	iBeastSki4:number,
	ExpJw:number,
	iLearnCash:number,
	changesch:Object,
	iExptSki2:number,
	iDex_All:number,
	iSumAmount:number,
	iBeastSki2:number,
	shenqi:Object,
	iSkiPoint:number,
	normal_horse:number,
	iCGBodyAmount:number,
	iMp_Max:number,
	iSmithski:number,
	farm_level:number,
	iDod_All:number,
	iMag_All:number,
	iGoodness:number,
	HugeHorse:Object,
	iPride:number,
	iAtt_All:number,
	ExAvt:Object,
	iDamage_All:number,
	iPcktPage:number,
	iRace:number,
	sum_exp:number,
	iHp_Eff:number,
	iExptSki4:number,
	HeroScore:number,
	iMaxExpt3:number,
	commu_gid:number,
	idbid_desc:Object,
	pet:Object,
	cName:string,
	igoodness_sav:number,
	rent_level:number,
	datang_feat:number,
	sword_score:number,
	iHp:number,
	shenqi_pos:Object,
	cOrg:string,
	iMaxExpt1:number,
	energy:number,
	AllRider:Object,
	iSpe_All:number,
	iCash:number,
	fabao:Object,
	i3FlyLv:number,
	iIcon:number,
	iMaxExpt2:number,
	iDesc:number,
	iSchool:number,
	iExptSki5:number,
	ExpJwBase:number,
	iExptSki1:number,
	iExptSki3:number,
	iMarry2:number,
	iBeastSki3:number,
	all_skills:{[key:string]:number},
	usernum:number,
	iUpExp:number,
	iSewski:number,
	iCGBoxAmount:number,
	iDef_All:number,
	AllSummon:Object,
	iStr_All:number,
	bid:number,
	jiyuan:number,
	total_avatar:number,
	iPoint:number,
	iCGTotalAmount:number,
	AllEquip:Object,
	iCor_All:number,
	more_attr:Object,
	iOrgOffer:number,
	AchPointTotal:number,
	total_horse:number,
	iBeastSki1:number,
	iBadness:number,
	iSaving:number,
	ori_desc:number,
	commu_name:number,
	xianyu:number,
	iZhuanZhi:number,
	iMp:number,
	iGrade:number,
	addPoint:number,
	iTotalMagDef_all:number,
	outdoor_level:number,
	ori_race:number,
	propKept:Object,
	iSumAmountEx:number,
	TA_iAllPoint:number,
	iSchOffer:number,
	shenqi_yellow:string,
	iNutsNum:number,
	iHp_Max:number,
}

class BaseItemModel extends BaseModel{
    public addon_effect_chance:number
	public addon_fali:number
	public addon_liliang:number
	public addon_lingli:number
	public addon_minjie:number
	public addon_naili:number
	public addon_skill_chance:number
	public addon_status:number
	public addon_tizhi:number
	public addon_total:number
	public anti_fengyin:number
	public appointed_roleid:string
	public area_name:string
	public bb_expt_fangyu:number
	public bb_expt_fashu:number
	public bb_expt_gongji:number
	public bb_expt_kangfa:number
	public collect_num:number
	public create_time:string
	public damage:number
	public defense:number
	public desc:string
	public desc0:IDescInfo
	public eid:string
	public equip_count:number
	public equip_face_img:string
	public equip_level:number
	public equip_level_desc:string
	public equip_name:string
	public equip_type:string
	public equip_type_desc:string
	public equipid:number
	public expire_time:string
	public expt_fangyu:number
	public expt_fashu:number
	public expt_gongji:number
	public expt_kangfa:number
	public fair_show_end_time_left:string
	public fangyu:number
	public fengyin:number
	public game_ordersn:string
	public gem_level:number
	public gem_value:number
    public highlights:any[][]
	public hp:number
	public icon:string
	public is_collect:number
	public jinglian_level:number
	public kindid:number
	public level:number
	public lingli:number
	public magic_damage:number
	public magic_defense:number
	public max_expt_fangyu:number
	public max_expt_fashu:number
	public max_expt_gongji:number
	public max_expt_kangfa:number
	public min_buyer_level:number
	public mingzhong:number
	public minjie:number
	public mofa:number
	public other_info:string
	public other_info0:IOtherInfo
	public price:string
	public price_int:number
	public qixue:number
	public school:number
	public score:number
	public seller_nickname:string
	public seller_roleid:string
	public selling_time:string
	public server_id:number
	public server_name:string
	public server_sn:string
	public serverid:number
	public shanghai:number
	public special_effect:number
	public special_skill:number
	public speed:number
	public status:number
	public storage_type:number
	public suit_effect:number
	public suit_skill:number
	public tag:string
	public time_left:string
	public unit_price_desc:string
	public xiang_qian_level:number
	public zongshang:number

	public get name():string{
		return this.equip_name
	}

	public get typeName():string{
		return ""
	}

	public initByData(data:any){
		super.initByData(data)
		if(this.other_info&&this.other_info!=""){
			this.other_info0=JSON.parse(this.other_info)
		}else{
			this.other_info0=null
		}
	}

    protected getEvaluator():evaluator.BaseEvaluator{
        return null
    }


    public get evaluateValue():number{
		let evaluator=this.getEvaluator()
		if(evaluator){
			return evaluator.evaluate(this)
		}
        return 0
    }

	public toString():string{
		return ""
	}
}
