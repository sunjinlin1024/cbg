class CBGModel extends BaseModel{
    private _shopList:{[key:number]:BaseItemModel}={}
	private _valuableList:{[key:number]:number}={}
	

	public append(list){
		let itemList:BaseItemModel[]=[]
		let item:BaseItemModel
		for(let data of list){
			item=game.modelManager.createModelByKindid(data)
			this._shopList[item.equipid]=item
			let evaVal=game.gameConfig.CoinToRMB(item.evaluateValue,item.serverid)
			let price=Math.floor(item.price_int*0.01)
			let income=evaVal-price
			let incomeRate=(evaVal-price)/price
			if(income*incomeRate>250&&income>400&&incomeRate>0.4){
				let incomeVal=income*incomeRate
				if(!this._valuableList[item.equipid]||this._valuableList[item.equipid]!=incomeVal){
					this._valuableList[item.equipid]=incomeVal
					console.log("[利润:"+String(income)+"("+Math.floor(incomeRate*100)+"%)][价格:"+price+"]"+item.toString())
				}
			}
			itemList.push(item)
		}
		return itemList
	}
}