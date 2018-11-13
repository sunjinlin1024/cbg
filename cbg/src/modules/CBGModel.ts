class CBGModel extends BaseModel{
    private _shopList:{[key:number]:BaseItemModel}={}
	

	public append(list){
		let item:BaseItemModel
		for(let data of list){
			item=game.modelManager.createModelByKindid(data)
			this._shopList[item.equipid]=item
			let evaVal=game.gameConfig.CoinToRMB(item.evaluateValue,item.serverid)
			let price=Math.floor(item.price_int*0.01)
			let income=evaVal-price
			let incomeRate=(evaVal-price)/price
			if(income>=500||(income>100&&incomeRate>=0.2)){
				console.log("\n"+stringUtil.expandStr(item.name,17)+" Lv:"+item.level+"\t"+config.school[item.desc0.iSchool].name+"\t"+item.other_info0.summary)
				console.log("\t评估值:"+stringUtil.expandStr(evaVal+"",7)+"- 售价:"+stringUtil.expandStr(price+"",7)
					+"= 利润:"+stringUtil.expandStr(String(income),8)+"("+Math.floor(incomeRate*100)+"%)")
			}
			
		}
	}
}