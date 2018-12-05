class CBGModel extends BaseModel{
    private _shopList:{[key:number]:BaseItemModel}={}
	private _valuableList:{[key:number]:number}={}
	

	public append(list){
		let itemList:BaseItemModel[]=[]
		let item:BaseItemModel
		for(let data of list){
			item=game.modelManager.createModelByKindid(data)
			this._shopList[item.equipid]=item
			if(!this._valuableList[item.equipid]||this._valuableList[item.equipid]!=item.price_int){
				this._valuableList[item.equipid]=item.price_int
				itemList.push(item)
			}
		}
		return itemList
	}

	
}