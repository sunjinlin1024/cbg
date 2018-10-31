


class CBGModel extends BaseModel{
    private _shopList:{[key:number]:BaseItemModel}={}
	

	public append(list){
		let item:BaseItemModel
		for(let data of list){
			item=new BaseItemModel()
			item.initByData(data)
			this._shopList[item.equipid]=item
		}
	}
}