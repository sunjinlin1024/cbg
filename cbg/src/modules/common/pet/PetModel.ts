interface IPetEquip{
    cDesc:string,
    iType:number
}

interface IPetDesc extends IDesc{
    jj_extra_add:number,//0
    lastchecksubzz:number,//2018
    left_qlxl:number,//0
    MP_MAX:number,//3050
    MS_MAX:number,//1800
    sjg:number,//0
    SPD_MAX:number,//1550
    strengthen:number,//1
    summon_color:number,//1
    summon_core:{[key:number]:any[]},//Object {902: Array(3), 903: Array(3), 913: Array(3), …}
    summon_equip1:IPetEquip,//Object {cDesc: "#r等级 105  #r命中率 +11% 伤害 +35 魔法 +83#r耐久度 61#Y#r#c4D…", iType: 9311}
    summon_equip2:IPetEquip,//Object {cDesc: "#r等级 85  #r速度 +23 伤害 +29#r耐久度 213#r#G#G耐力 -5#Y#Y#r…", iType: 9209}
    summon_equip3:IPetEquip,//Object {cDesc: "#r等级 95  #r伤害 +32 防御 +62#r耐久度 302#r#G#G耐力 +8#Y#Y#r…", iType: 9110}
    summon_equip4_desc:string,//""
    summon_equip4_type:string,//0
    tmp_lingxing:number,//97
    weaken:number,//5
}

interface IPetAttr{
    pet_name: string,//attrs[0],
    pet_grade:number,// attrs[2],
    blood:number,// attrs[3],
    magic:number,// attrs[4],
    attack:number,// attrs[5],
    defence:number,// attrs[6],
    speed:number,// attrs[7],
    soma:number,// attrs[9],
    magic_powner:number,// attrs[10],
    strength:number,// attrs[11],
    endurance:number,// attrs[12],
    smartness:number,// attrs[13],
    potential:number,// attrs[14],
    wakan:number,// attrs[15],
    max_blood:number,// attrs[16],
    max_magic:number,// attrs[17],
    lifetime:number,// parseInt(attrs[18], 10) >= 65432 ? "永生": attrs[18],
    five_aptitude:number,// attrs[19],
    attack_aptitude:number,// attrs[20],
    defence_aptitude:number,// attrs[21],
    physical_aptitude:number,// attrs[22],
    magic_aptitude:number,// attrs[23],
    speed_aptitude:number,// attrs[24],
    avoid_aptitude:number,// attrs[25],
    growth:number,// parseInt(attrs[26], 10) / 1000,
    all_skill:number[],// attrs[27],
    sp_skill:number,// attrs[28],
    is_baobao:number,// get_baobao_info(attrs[29]),
    used_qianjinlu:number,// check_undefined(attrs[32]),
    other:string,// attrs[34],
}
class PetModel extends BaseItemModel{
    public attr:IPetAttr

    public initByData(data:any){
        super.initByData(data)
        if(data.desc&&data.desc!=""&&data.desc!="null"){
            let infos=data.desc.split(";")
            if(infos.length>0){
                let desc:string=infos.pop().replace(/\(\[/g,"{").replace(/\(\{/g,"[").replace(/\,\]\)/g,"}").replace(/\,\}\)/g,"]").replace(/\]\)/g,"}").replace(/\}\)/g,"]")
                this.desc0=NJson.decode(desc)[0]   
            }
            this.attr={
                pet_name: infos[0],
                pet_grade: infos[2],
                blood: infos[3],
                magic: infos[4],
                attack: infos[5],
                defence: infos[6],
                speed: infos[7],
                soma: infos[9],
                magic_powner: infos[10],
                strength: infos[11],
                endurance: infos[12],
                smartness: infos[13],
                potential: infos[14],
                wakan: infos[15],
                max_blood: infos[16],
                max_magic: infos[17],
                lifetime: parseInt(infos[18], 10) >= 65432 ? -1: infos[18],
                five_aptitude: infos[19],
                attack_aptitude: infos[20],
                defence_aptitude: infos[21],
                physical_aptitude: infos[22],
                magic_aptitude: infos[23],
                speed_aptitude: infos[24],
                avoid_aptitude: infos[25],
                growth: parseInt(infos[26], 10) / 1000,
                all_skill: infos[27].split("|"),
                sp_skill: infos[28],
                is_baobao: (infos[29]==undefined||infos[29]==null)?-1:Number(infos[29]),
                used_qianjinlu:(infos[32]==undefined||infos[32]==null)?-1:Number(infos[32]),
                other: infos[34],
            }
        }
    }

    public isHighValue(income:number,incomeRate:number){
		return income>40&&incomeRate>0.1
	}

    public get descInfo():IPetDesc{
        return this.desc0 as IPetDesc
    }

    public getEvaluator():evaluator.BaseEvaluator{
        return evaluator._petEvaluator
    }

    public get typeName():string{
        return this.equip_name
    }

    public get name():string{
        return this.equip_name
    }

    public toString():string{
        return "["+this.area_name+"-"+this.server_name+"]["+this.typeName+"(Lv."+this.level+")]["+this.other_info0.summary+"]"
    }
    
}