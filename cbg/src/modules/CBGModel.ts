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
			console.log(stringUtil.expandStr(item.equip_name,12)+"\t",
				"评估值:"+stringUtil.expandStr(evaVal+"",7)+"\t- 售价:"+stringUtil.expandStr(price+"",7)
				+"\t= 利润:"+stringUtil.expandStr(String(evaVal-price),8)+"\t 利润比:"+Math.floor((evaVal-price)/price*100)+"%)")
		}
	}
}