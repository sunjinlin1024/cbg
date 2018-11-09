class CBGModel extends BaseModel{
    private _shopList:{[key:number]:BaseItemModel}={}
	

	public append(list){
		let item:BaseItemModel
		for(let data of list){
			item=modelFactory.createModelByKindid(data[Const.KEY_KINDID])
			item.initByData(data)
			this._shopList[item.equipid]=item
			console.log(item.equip_name+(new Array(12-item.equip_name.length).join(" ")),"评估值："+config.CoinToRMB(item.evaluateValue,item.serverid)+"元","\t售价："+Math.floor(item.price_int*0.01)+"元")
		}
	}
}