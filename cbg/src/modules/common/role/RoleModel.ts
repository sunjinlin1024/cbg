
class RoleModel extends BaseItemModel{
    public static get_role_kind_name(icon) {
        var kindid = icon;
        if (icon > 200) {
            kindid = ((icon - 200 - 1) % 12 + 1) + 200;
        } else {
            kindid = ((icon - 1) % 12 + 1);
        }
        return config.role[kindid].name;
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

    private _otherInfo:IOtherInfo

    public getEvaluator():evaluator.BaseEvaluator{
        return evaluator._roleEvaluator
    }

    public initByData(data:any){
        super.initByData(data)
        if(data.desc&&data.desc!=""&&data.desc!="null"){
            let desc=data.desc.replace(/\(\[/g,"{").replace(/\(\{/g,"[").replace(/\,\]\)/g,"}").replace(/\,\}\)/g,"]").replace(/\]\)/g,"}").replace(/\}\)/g,"]")
            this.desc0=NJson.decode(desc)[0]
        }
    }

    public get typeName():string{
        return RoleModel.get_role_kind_name(RoleModel.get_role_iconid(this.desc0.iIcon))
    }

    public get name():string{
		return this.desc0.cName
	}

    public toString():string{
        return "["+this.area_name+"-"+this.server_name+"]["+this.name+"(Lv."+this.level+")]["+this.typeName+"]["+config.school[this.desc0.iSchool].name+"]["+this.other_info0.summary+"]"
    }
}