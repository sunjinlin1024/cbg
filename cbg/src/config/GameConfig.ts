module config{

    var kindTree={}

    export function init(){
        kindTree[Const.Kind.COIN]=Const.Kind.ALL
        kindTree[Const.Kind.ROLE]=Const.Kind.ALL
        kindTree[Const.Kind.PET]=Const.Kind.ALL
        kindTree[Const.Kind.ITEM]=Const.Kind.ALL

        kindTree[Const.Kind.SCHOOL_DT]=Const.Kind.ROLE//大唐官府
        kindTree[Const.Kind.SCHOOL_LG]=Const.Kind.ROLE//龙宫
        kindTree[Const.Kind.SCHOOL_HS]=Const.Kind.ROLE//化生寺
        kindTree[Const.Kind.SCHOOL_PS]=Const.Kind.ROLE//盘丝洞
        kindTree[Const.Kind.SCHOOL_PT]=Const.Kind.ROLE//普陀山
        kindTree[Const.Kind.SCHOOL_TG]=Const.Kind.ROLE//天宫
        kindTree[Const.Kind.SCHOOL_NE]=Const.Kind.ROLE//女儿村
        kindTree[Const.Kind.SCHOOL_WD]=Const.Kind.ROLE//无底洞
        kindTree[Const.Kind.SCHOOL_WZ]=Const.Kind.ROLE//五庄观
        kindTree[Const.Kind.SCHOOL_FC]=Const.Kind.ROLE//方寸山
        kindTree[Const.Kind.SCHOOL_LBC]=Const.Kind.ROLE//凌波城
        kindTree[Const.Kind.SCHOOL_MW]=Const.Kind.ROLE//魔王寨
        kindTree[Const.Kind.SCHOOL_DF]=Const.Kind.ROLE//阴曹地府
        kindTree[Const.Kind.SCHOOL_ST]=Const.Kind.ROLE//狮驼岭
        kindTree[Const.Kind.SCHOOL_SML]=Const.Kind.ROLE//神木林
        kindTree[Const.Kind.SCHOOL_NBM]=Const.Kind.ROLE//女魃墓
        kindTree[Const.Kind.SCHOOL_TJC]=Const.Kind.ROLE//天机城
        kindTree[Const.Kind.SCHOOL_HGS]=Const.Kind.ROLE//花果山

        kindTree[Const.Kind.PET_SS]=Const.Kind.PET//神兽
        kindTree[Const.Kind.PET_45_65]=Const.Kind.PET//参战45-65
        kindTree[Const.Kind.PET_75_105]=Const.Kind.PET//参战75-105
        kindTree[Const.Kind.PET_125_145]=Const.Kind.PET//参战125-145
        kindTree[Const.Kind.PET_FS_120_155]=Const.Kind.PET//飞升120-155
        kindTree[Const.Kind.PET_DJ_155_175]=Const.Kind.PET//渡劫155-175
        kindTree[Const.Kind.PET_HS_175]=Const.Kind.PET//化圣175
        kindTree[Const.Kind.PET_GXC]=Const.Kind.PET//个性宠
        
        kindTree[]=Const.Kind.ALL
    }

    export function containInKind(type:number,kind:Const.Kind){

    }
}