class ModelManager {
     public createModelByKindid(data:any):BaseItemModel{
        let model:BaseItemModel
        let kindid=data[Const.KEY_KINDID]
        if(game.gameConfig.containInKind(kindid,Const.Kind.ROLE)){
			model=new RoleModel()
        }else if(game.gameConfig.containInKind(kindid,Const.Kind.PET)){
		    model=new PetModel()
        }else{
            model=new BaseItemModel()
        }
        model.initByData(data)
        return model
	}
}