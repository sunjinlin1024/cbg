class CBGModel extends BaseModel{
    private _shopList:{[key:number]:BaseItemModel}={}
	

	public append(list){
		let item:BaseItemModel
		for(let data of list){
			item=modelFactory.createModelByKindid(data[Const.KEY_KINDID])
			item.initByData(data)
			this._shopList[item.equipid]=item
			let evaVal=config.CoinToRMB(item.evaluateValue,item.serverid)
			let price=Math.floor(item.price_int*0.01)
			console.log(item.equip_name+(new Array(12-item.equip_name.length).join(" "))
				,"\t评估值:"+evaVal+"\t- 售价:"+price+"\t= 利润:"+(evaVal-price)+"\t 利润比:"+Math.floor((evaVal-price)/price*100)+"%)")
		}
	}
}