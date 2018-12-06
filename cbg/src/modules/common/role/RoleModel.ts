interface IRoleDesc extends IDesc{
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
class RoleModel extends BaseItemModel{

	public ava_id:number

    public static get_role_kind_name(icon) {
        var kindid = icon;
        if (icon > 200) {
            kindid = ((icon - 200 - 1) % 12 + 1) + 200;
        } else {
            kindid = ((icon - 1) % 12 + 1);
        }
		return kindid
        // return config.role[kindid].name;
    }

    public static get_role_iconid(type_id) {
        var need_fix_range = [[13, 24], [37, 48], [61, 72], [213, 224], [237, 248], [261, 272]];
        for (var i = 0; i < need_fix_range.length; i++) {
            var range = need_fix_range[i];
            if (type_id >= range[0] && type_id <= range[1]) {
                type_id = type_id - 12
                break;
            }
        }
        return type_id;
    }

	

    public get descInfo():IRoleDesc{
        return this.desc0 as IRoleDesc
    }

    public getEvaluator():evaluator.BaseEvaluator{
        return evaluator._roleEvaluator
    }

    public initByData(data:any){
        super.initByData(data)
        if(data.desc&&data.desc!=""&&data.desc!="null"){
            let desc=data.desc.replace(/\(\[/g,"{").replace(/\(\{/g,"[").replace(/\,\]\)/g,"}").replace(/\,\}\)/g,"]").replace(/\]\)/g,"}").replace(/\}\)/g,"]")
            this.desc0=NJson.decode(desc)[0]
        }
		this.ava_id=RoleModel.get_role_kind_name(RoleModel.get_role_iconid(this.descInfo.iIcon))
    }

	public isHighValue(income:number,incomeRate:number){
		return income*incomeRate>250&&income>400&&incomeRate>0.4
	}

	public isNoticeValue(income:number,incomeRate){
		return incomeRate>=0.8||(income>1200&&incomeRate>0.5)
	}

    public get typeName():string{
		return config.role[this.ava_id].name
        // return RoleModel.get_role_kind_name(RoleModel.get_role_iconid(this.descInfo.iIcon))
    }

    public get name():string{
		return this.descInfo.cName
	}

	public get typeDesc():string{
		return this.typeName+"-"+config.school[this.descInfo.iSchool].name
	}

	public getLevelColor():number{
		if(this.descInfo.i3FlyLv>0){
			return Const.QUALITY_COLOR[4+Math.min(3,Math.floor(this.descInfo.i3FlyLv/3))]
		}
		return Const.QUALITY_COLOR[this.descInfo.iZhuanZhi+1]
	}

	public getTypeColor():number{
		let colorQuality=6//新女
		switch(this.ava_id){
			case 3:
			case 4:
			case 7:
			case 8:
			case 11:
			case 12://女
				colorQuality=5
				break
			case 201:
			case 205:
			case 209:
				colorQuality=4
				break//新男
			case 6:
			case 5:
			case 9://便宜男
				colorQuality=3
				break
			case 1:
			case 2:
			case 10://贵男
				colorQuality=2
				break
			default:
				colorQuality=6
				break
		}

		

		let schoolId=config.school[this.descInfo.iSchool].id
		switch(schoolId){
			case 1:
			case 9:
			case 12:
				colorQuality-=2
				break
			case 2:
			case 4:
			case 14:
			case 17:
				colorQuality-=1
				break

		}
		return Const.QUALITY_COLOR[colorQuality]
	}

    public toString():string{
		return "["+this.serverInfo+"]["+this.name+"(Lv."+this.level+")]["+this.typeName+"]["+config.school[this.descInfo.iSchool].name+"]["+this.other_info0.summary+"]"
    }
}