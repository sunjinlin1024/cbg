module config{

    var kindTree=init()

    export function init(){
        let kindTree={}
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

        kindTree[Const.Kind.EQUIP_WQ]=Const.Kind.ITEM//武器
        kindTree[Const.Kind.EQUIP_FJ]=Const.Kind.ITEM//防具
        kindTree[Const.Kind.EQUIP_LS]=Const.Kind.ITEM//灵饰
        kindTree[Const.Kind.EQUIP_QT]=Const.Kind.ITEM//其他

        // kindTree[Const.Kind.EQUIP_WQ]=Const.Kind.EQUIP//武器
        // kindTree[Const.Kind.EQUIP_FJ]=Const.Kind.EQUIP//防具
        // kindTree[Const.Kind.EQUIP_LS]=Const.Kind.EQUIP//灵饰
        // kindTree[Const.Kind.EQUIP_QT]=Const.Kind.EQUIP//其他
        kindTree[Const.Kind.EQUIP_JIAN]=Const.Kind.EQUIP_WQ//剑
        kindTree[Const.Kind.EQUIP_QIANG]=Const.Kind.EQUIP_WQ//枪矛
        kindTree[Const.Kind.EQUIP_SHANZI]=Const.Kind.EQUIP_WQ//扇
        kindTree[Const.Kind.EQUIP_DAO]=Const.Kind.EQUIP_WQ//刀
        kindTree[Const.Kind.EQUIP_FUYUE]=Const.Kind.EQUIP_WQ//斧钺
        kindTree[Const.Kind.EQUIP_BANGZI]=Const.Kind.EQUIP_WQ//魔棒
        kindTree[Const.Kind.EQUIP_PIAODAI]=Const.Kind.EQUIP_WQ//飘带
        kindTree[Const.Kind.EQUIP_ZHUACI]=Const.Kind.EQUIP_WQ//爪刺
        kindTree[Const.Kind.EQUIP_JUJIAN]=Const.Kind.EQUIP_WQ//巨剑
        kindTree[Const.Kind.EQUIP_SHAN]=Const.Kind.EQUIP_WQ//伞
        kindTree[Const.Kind.EQUIP_CHUI]=Const.Kind.EQUIP_WQ//锤
        kindTree[Const.Kind.EQUIP_SHUANGJIAN]=Const.Kind.EQUIP_WQ//双短剑
        kindTree[Const.Kind.EQUIP_DENGLONG]=Const.Kind.EQUIP_WQ//灯笼
        kindTree[Const.Kind.EQUIP_HUANQUAN]=Const.Kind.EQUIP_WQ//环圈
        kindTree[Const.Kind.EQUIP_GONG]=Const.Kind.EQUIP_WQ//弓箭
        kindTree[Const.Kind.EQUIP_BIAN]=Const.Kind.EQUIP_WQ//鞭
        kindTree[Const.Kind.EQUIP_ZHANG]=Const.Kind.EQUIP_WQ//法杖
        kindTree[Const.Kind.EQUIP_BAOZHU]=Const.Kind.EQUIP_WQ//宝珠
        kindTree[Const.Kind.EQUIP_YAODAI]=Const.Kind.EQUIP_FJ//腰带
        kindTree[Const.Kind.EQUIP_XIEZI]=Const.Kind.EQUIP_FJ//鞋子
        kindTree[Const.Kind.EQUIP_TOUKUI]=Const.Kind.EQUIP_FJ//头盔
        kindTree[Const.Kind.EQUIP_SHIWU]=Const.Kind.EQUIP_FJ//饰物
        kindTree[Const.Kind.EQUIP_KAIJIA]=Const.Kind.EQUIP_FJ//铠甲
        kindTree[Const.Kind.EQUIP_NVYI]=Const.Kind.EQUIP_FJ//女衣
        kindTree[Const.Kind.EQUIP_FACHAI]=Const.Kind.EQUIP_FJ//发钗
        kindTree[Const.Kind.EQUIP_JIEZHI]=Const.Kind.EQUIP_LS//戒指
        kindTree[Const.Kind.EQUIP_SHOUZHUO]=Const.Kind.EQUIP_LS//手镯
        kindTree[Const.Kind.EQUIP_ERSHI]=Const.Kind.EQUIP_LS//耳饰
        kindTree[Const.Kind.EQUIP_PEISHI]=Const.Kind.EQUIP_LS//佩饰
        kindTree[Const.Kind.EQUIP_PET]=Const.Kind.EQUIP_QT//佩饰

        kindTree[Const.Kind.ITEM_CAILIAO]=Const.Kind.ITEM//材料
        kindTree[Const.Kind.ITEM_SHOUJUE]=Const.Kind.ITEM//魔兽要诀
        kindTree[Const.Kind.ITEM_NEIDAN]=Const.Kind.ITEM//召唤兽内丹

        return kindTree
    }

    export function containInKind(type:number,kind:Const.Kind){
        let curType=type
        while(curType!=kind){
            curType=kindTree[curType]
            if(!curType)return false
        }
        return curType==kind
    }
}