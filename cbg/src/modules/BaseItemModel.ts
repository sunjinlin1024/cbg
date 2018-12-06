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

interface IDesc{
	
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
	public desc0:IDesc
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

	public get typeDesc():string{
		return this.typeName
	}

	public getTypeColor():number{
		return Const.COLOR.WHITE
	}

	public getLevelColor():number{
		return Const.COLOR.WHITE
	}

	public get serverInfo():string{
		return this.area_name+"-"+this.server_name
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

	public isHighValue(income:number,incomeRate:number){
		return false
	}

	public isNoticeValue(income:number,incomeRate){
		return false
	}

	public toString():string{
		return ""
	}
}
